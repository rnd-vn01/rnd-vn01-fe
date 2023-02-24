import './QuizManager.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QuizOptions } from './QuizOptions/QuizOptions';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { QuizButton } from './QuizButton/QuizButton';
import { useHistory } from 'react-router-dom';
import { QuizStatusBar } from './QuizStatusBar/QuizStatusBar';
import { QuizQuestion } from './QuizQuestion/QuizQuestion';
import { MERIDIAN_POINTS, QUIZ_QUESTION_TYPE } from 'src/configs/constants';
import { QuizTimer } from './QuizTimer/QuizTimer';

import DEMO_DATA_VI from 'src/assets/test_data/acupoints_vi.json';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import DEMO_DATA_MERIDIAN_VI from 'src/assets/test_data/meridians_vi.json';
import DEMO_DATA_MERIDIAN_EN from 'src/assets/test_data/meridians_en.json';

// Sounds
import mainSound from "src/assets/sounds/main.mp3"
import correctSound from "src/assets/sounds/right.mp3"
import wrongSound from "src/assets/sounds/wrong.mp3"
import { QuizSummary } from './QuizSummary/QuizSummary';
import { QuizTitleBar } from './QuizTitleBar/QuizTitleBar';

enum QUIZ_STATE {
  SELECT_OPTIONS = 0,
  IN_PROGRESS = 1,
  ENDED = 2
}

enum QUESTION_TYPE {
  DESCRIPTION = 0,
  FUNCTIONALITIES = 1,
  CHOOSE_FROM_LOCATION = 2,
  NAVIGATE = 3
}

export const QuizManager: React.FC<IQuizManager> = ({ }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );

  const [quizState, setQuizState] = useState<number>(QUIZ_STATE["SELECT_OPTIONS"]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [field, setField] = useState<any>(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const [correctAnswer, setCorrectAnswer] = useState<number>(-1);
  const currentTime = useRef<number>(60);
  const timer = useRef<any>(null);
  const [renderTime, setRenderTime] = useState<number>(0);
  const [numberOfCorrectQuestions, setNumberOfCorrectQuestions] = useState<number>(0);
  const [isShowingAnswer, setIsShowingAnswer] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-2);
  const [isPlus, setIsPlus] = useState<boolean>(false);
  const [questionContent, setQuestionContent] = useState<string>("");
  const [answersList, setAnswersList] = useState<Array<any>>([]);
  const DEMO_QUESTION_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
  const [numberOfQuestionsOptionsList, setNumberOfQuestionsOptionsList] = useState<Array<number>>(DEMO_QUESTION_COUNT_OPTIONS)


  const pointCurrentFieldIndexes = useRef<any>([]);
  const usedPointIndexes = useRef<any>([]);
  const quizHistory = useRef<any>({});
  const temporarilyStoredQuestionContent = useRef<any>({
    question: "",
    options: [],
    answer: null,
    correctAnswer: null,
    time: 60
  });
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Sounds
  const mainSoundPlayer = useRef<any>(new Audio(mainSound))
  const correctSoundPlayer = useRef<any>(new Audio(correctSound));
  const wrongSoundPlayer = useRef<any>(new Audio(wrongSound));

  const MERIDIANS = ["LU", "LI", "ST", "SP", "HT", "SI", "BL", "KI", "PC", "TE", "GB", "Liv", "Du", "Ren"]
  const DEMO_FIELD_OPTIONS = [
    {
      value: 0,
      caption: t('quiz_page.options.all_meridians')
    }
  ]
  MERIDIANS.forEach((meridian, index) => {
    DEMO_FIELD_OPTIONS.push({
      value: index + 1,
      caption: currentLanguage === "EN" ? `${meridian} ${t('quiz_page.options.meridian_only')}`
        : `${t('quiz_page.options.meridian_only')} ${meridian}`
    })
  })

  const startQuiz = () => {
    usedPointIndexes.current = []
    quizHistory.current = {
      questions: [],
      options: {
        field: DEMO_FIELD_OPTIONS.filter(item => item.value === field),
        numberOfQuestions: numberOfQuestions
      }
    }
    updatePointsCurrentField();
    generateQuestion();
    setCurrentQuestion(1);
    setQuizState(QUIZ_STATE["IN_PROGRESS"]);
    startTimer();
  }

  const endQuiz = () => {
    setQuizState(QUIZ_STATE["ENDED"])
  }

  useEffect(() => {
    if (selectedAnswer === correctAnswer) {
      setIsPlus(true);

      setTimeout(() => {
        setIsPlus(false);
      }, 2000)
    }
  }, [selectedAnswer, correctAnswer])

  const submitAnswer = (answer) => {
    quizHistory.current.questions.push({
      question: questionContent,
      options: answersList,
      answer: answer,
      correctAnswer: correctAnswer,
      time: Math.max(60 - currentTime.current, 0)
    })

    endAnswerTime()
    setSelectedAnswer(answer)
    mainSoundPlayer.current?.pause();
    if (answer === correctAnswer) {
      setNumberOfCorrectQuestions(numberOfCorrectQuestions + 1);
      (correctSoundPlayer.current as HTMLAudioElement).currentTime = 0;
      correctSoundPlayer.current.play();
    } else {
      (wrongSoundPlayer.current as HTMLAudioElement).currentTime = 0;
      wrongSoundPlayer.current.play();
    }
  }

  const endAnswerTime = () => {
    clearInterval(timer.current)
    setIsShowingAnswer(true);
    timer.current = null
    if (currentQuestion === numberOfQuestions) {
      setIsFinished(true);
    }
  }

  const startTimer = () => {
    currentTime.current = 60;
    (mainSoundPlayer.current as HTMLAudioElement).currentTime = 0;
    mainSoundPlayer.current?.play();

    timer.current = setInterval(() => {
      if (currentTime.current - 1 === 0) {
        temporarilyStoredQuestionContent.current = {
          ...temporarilyStoredQuestionContent.current,
          answer: null,
          time: -1
        }

        quizHistory.current.questions.push(temporarilyStoredQuestionContent.current)

        endAnswerTime();
      }

      currentTime.current -= 1
      setRenderTime(60 - currentTime.current + 1)
    }, 1000);
  }

  const reset = () => {
    setSelectedAnswer(-2);
    setCorrectAnswer(-1);
    setIsShowingAnswer(false);
    generateQuestion();
    setCurrentQuestion(currentQuestion + 1);
    startTimer();
  }

  const skip = () => {
    temporarilyStoredQuestionContent.current = {
      ...temporarilyStoredQuestionContent.current,
      answer: null,
      time: -1
    }

    quizHistory.current.questions.push(temporarilyStoredQuestionContent.current)

    endAnswerTime();
    mainSoundPlayer.current?.pause();
  }

  //Maintain quiz contents
  const generateQuestion = (option = null) => {
    const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_EN : DEMO_DATA_VI
    let used = []

    if (parseInt(field) === 0) {
      //Get the point for this question
      //Case all mode
      let random = -1;
      let usingPoint = {
        code: "",
        index: -1
      }

      while (true) {
        random = Math.floor(Math.random() * DEMO_DATA.length)

        if (!usedPointIndexes.current.includes(DEMO_DATA[random].code)) {
          usingPoint = {
            code: DEMO_DATA[random].code,
            index: random
          }

          used.push(random)
          usedPointIndexes.current.push(random)
          break;
        }
      }

      while (used.length < 4) {
        random = Math.floor(Math.random() * DEMO_DATA.length)
        if (!used.includes(random)) {
          used.push(random)
        }
      }
    } else {
      //Get the point for this question
      //Case 1 meridian
      let random = -1;
      let usingPoint = {
        code: "",
        index: -1
      }
      const thisMeridianIndexes = pointCurrentFieldIndexes.current

      while (true) {
        random = Math.floor(Math.random() * thisMeridianIndexes.length)

        if (!usedPointIndexes.current.includes(thisMeridianIndexes[random].code)) {
          usingPoint = {
            code: DEMO_DATA[thisMeridianIndexes[random]].code,
            index: thisMeridianIndexes[random]
          }

          used.push(thisMeridianIndexes[random])
          usedPointIndexes.current.push(thisMeridianIndexes[random])
          break;
        }
      }

      while (used.length < 4) {
        random = Math.floor(Math.random() * thisMeridianIndexes.length)
        if (!used.includes(thisMeridianIndexes[random])) {
          used.push(thisMeridianIndexes[random])
        }
      }
    }

    let shuffleIndexes = [0, 1, 2, 3].sort((a, b) => 0.5 - Math.random()).sort((a, b) => 0.5 - Math.random());
    const correct = shuffleIndexes[0]

    let newUsed = [0, 0, 0, 0]
    shuffleIndexes.forEach((newIndex, oldIndex) => {
      newUsed[newIndex] = used[oldIndex]
    })
    used = newUsed;

    const questionType = Math.floor(Math.random() * 2)
    let questionContent = "";
    switch (questionType) {
      case QUESTION_TYPE.DESCRIPTION:
        questionContent = `${t('quiz_page.questions.description')}${DEMO_DATA[used[correct]].description}?`
        break
      case QUESTION_TYPE.FUNCTIONALITIES:
        questionContent = `${t('quiz_page.questions.functionalities')}`
        DEMO_DATA[used[correct]].functionalities.forEach((functionality, index) => {
          questionContent += `${functionality}`

          if (!(index === DEMO_DATA[used[correct]].functionalities.length - 1)) {
            questionContent += `, `
          } else {
            questionContent += "?"
          }
        })
        break
    }

    let TEST_ANSWERS_LIST = [];
    used.forEach((point, index) => {
      TEST_ANSWERS_LIST.push({
        "index": index,
        "answer": `${DEMO_DATA[point].code} (${DEMO_DATA[point].name})`
      })
    })
    setAnswersList(TEST_ANSWERS_LIST)
    setQuestionContent(questionContent)
    setCorrectAnswer(correct)

    temporarilyStoredQuestionContent.current = {
      question: `${t('quiz_page.questions.description')}${DEMO_DATA[used[correct]].description}?`,
      options: TEST_ANSWERS_LIST,
      answer: null,
      correctAnswer: correct,
      time: 60
    }
  }

  useEffect(() => {
    if (parseInt(field) !== 0) {
      const numberOfPoints = MERIDIAN_POINTS[MERIDIANS[field - 1]].length;
      let options = []

      for (let i = 5; i < numberOfPoints; i += 5) {
        options.push(i)
      }
      if (options[options.length - 1] !== numberOfPoints) {
        options.push(numberOfPoints)
      }

      setNumberOfQuestionsOptionsList(options)
      updatePointsCurrentField();
    } else {
      setNumberOfQuestionsOptionsList(DEMO_QUESTION_COUNT_OPTIONS)
    }
  }, [field]);

  const updatePointsCurrentField = () => {
    if (parseInt(field) !== 0) {
      const points = MERIDIAN_POINTS[MERIDIANS[field - 1]];
      let indexes = []
      const DEMO_DATA = currentLanguage === "EN" ? DEMO_DATA_EN : DEMO_DATA_VI

      points.forEach(point => {
        DEMO_DATA.forEach((item, index) => {
          if (item.code === point) {
            indexes.push(index)
          }
        })
      })

      pointCurrentFieldIndexes.current = indexes;
    }
  }

  return (
    <div
      role="div"
      aria-label="quiz-manager"
      className="quiz-manager">
      <div className={`quiz-manager__section quiz-manager__section--top
        ${quizState === QUIZ_STATE["IN_PROGRESS"] ? "" : "quiz-manager__section--top--wide"}
      `}>
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizTitleBar
            title={t('quiz_page.title')}
          /> :
          quizState === QUIZ_STATE["IN_PROGRESS"] ?
            <QuizTimer
              data-render={renderTime}
              currentTime={currentTime.current}
              totalTime={60}
            /> : <QuizTitleBar
              title={t('quiz_page.end')}
            />}
      </div>

      <div className={`quiz-manager__section quiz-manager__section--main
        ${quizState === QUIZ_STATE["IN_PROGRESS"] ? "" : "quiz-manager__section--main--wide"}
      `}>
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizOptions
            fieldOptionsList={DEMO_FIELD_OPTIONS}
            numberOfQuestionsOptionsList={numberOfQuestionsOptionsList}
            field={field}
            numberOfQuestions={numberOfQuestions}
            setField={setField}
            setNumberOfQuestion={setNumberOfQuestions}
          /> : quizState === QUIZ_STATE["IN_PROGRESS"] ?
            <QuizQuestion
              questionContent={questionContent}
              type={QUIZ_QUESTION_TYPE["MULTIPLE_CHOICE"]}
              optionsList={answersList}
              correctAnswer={correctAnswer}
              isShowingAnswer={isShowingAnswer}
              selectedAnswer={selectedAnswer}
              onSubmitAnswer={submitAnswer}
              currentQuestion={currentQuestion}
            /> :
            <QuizSummary
              data={quizHistory.current}
            />}
      </div>

      <div className="quiz-manager__section quiz-manager__section--button">
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizButton
            fallbackCaption="Start"
            translateKey="quiz_page.buttons.start"
            onClick={() => startQuiz()}
          />
          :
          quizState === QUIZ_STATE["IN_PROGRESS"] ? <QuizStatusBar
            currentQuest={currentQuestion}
            totalQuest={numberOfQuestions}
            isPlus={isPlus}
            totalCorrect={numberOfCorrectQuestions}
          /> : <QuizButton
            fallbackCaption="New Quiz"
            translateKey="quiz_page.buttons.new_quiz"
            onClick={() => location.reload()}
          />}
      </div>

      <div className="quiz-manager__section quiz-manager__section--button quiz-manager__no-border">
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizButton
            fallbackCaption="Close"
            translateKey="quiz_page.buttons.close"
            onClick={() => history.push("/", { isRedirect: true })}
          /> : quizState === QUIZ_STATE["ENDED"] ?
            <QuizButton
              fallbackCaption="Close"
              translateKey="quiz_page.buttons.close"
              onClick={() => history.push("/", { isRedirect: true })}
            />
            :
            isFinished ?
              <QuizButton
                fallbackCaption="End"
                translateKey="quiz_page.buttons.end"
                onClick={() => {
                  //HANDLE END QUIZ
                  endQuiz()
                }}
                isDisabled={!isShowingAnswer}
              />
              :
              isShowingAnswer ? <QuizButton
                fallbackCaption="Next"
                translateKey="quiz_page.buttons.next"
                onClick={() => {
                  reset();
                }}
                isDisabled={!isShowingAnswer}
              /> : <QuizButton
                fallbackCaption="Skip"
                translateKey="quiz_page.buttons.skip"
                onClick={() => {
                  skip();
                }}
                isDisabled={isShowingAnswer}
              />
        }
      </div>
    </div>
  );
};
