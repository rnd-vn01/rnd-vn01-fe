import './QuizManager.scss';
import React, { useEffect, useRef, useState } from 'react';
import { AuthBar } from '../AuthBar/AuthBar';
import { QuizProgressBar } from './QuizProgressBar/QuizProgressBar';
import { useTranslation } from 'react-i18next';
import { QuizOptions } from './QuizOptions/QuizOptions';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { QuizButton } from './QuizButton/QuizButton';
import { useHistory } from 'react-router-dom';
import { QuizStatusBar } from './QuizStatusBar/QuizStatusBar';
import { QuizQuestion } from './QuizQuestion/QuizQuestion';
import { QUIZ_QUESTION_TYPE } from 'src/configs/constants';
import { QuizTimer } from './QuizTimer/QuizTimer';

enum QUIZ_STATE {
  SELECT_OPTIONS = 0,
  IN_PROGRESS = 1,
  ENDED = 2
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
  const [field, setField] = useState<number>(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const [isPlus, setIsPlus] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const currentTime = useRef<number>(60);
  const timer = useRef<any>(null);
  const [renderTime, setRenderTime] = useState<number>(0);
  const [numberOfCorrectQuestions, setNumberOfCorrectQuestions] = useState<number>(0);
  const [isShowingAnswer, setIsShowingAnswer] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(null);

  const MERIDIANS = ["LU", "LI", "ST", "SP", "HT", "SI", "BL", "KI", "PC", "TE", "GB", "LR", "DU", "Ren"]
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
  const DEMO_QUESTION_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30]

  const startQuiz = () => {
    setCurrentQuestion(1);
    setQuizState(QUIZ_STATE["IN_PROGRESS"]);
    startTimer();
  }

  const endQuiz = () => {

  }

  let TEST_QUESTION_CONTENT = "Bở dưới xương đòn gánh, ngang với cơ ngực to. Chỗ hõm giữa cơ Đenta. Từ đường dọc chính giữa xương ngực đo ngang ra mỗi bên 6 thốn. Bở dưới xương đòn gánh, ngang với cơ ngực to. Chỗ hõm giữa cơ Đenta. Từ đường dọc chính giữa xương ngực đo ngang ra mỗi bên 6 thốn. Bở dưới xương đòn gánh, ngang với cơ ngực to.  Chỗ hõm giữa cơ Đenta. Chỗ hõm giữa cơ Đenta."
  const TEST_ANSWERS_LIST = [{
    "index": 0,
    "answer": "LU-1"
  }, {
    "index": 1,
    "answer": "LU-2"
  }, {
    "index": 2,
    "answer": "LU-3"
  }, {
    "index": 3,
    "answer": "LU-4"
  }]

  const submitAnswer = (answer) => {
    endAnswerTime()
    setSelectedAnswer(answer)
    if (answer === correctAnswer)
      setNumberOfCorrectQuestions(numberOfCorrectQuestions + 1)
  }

  const endAnswerTime = () => {
    clearInterval(timer.current)
    setIsShowingAnswer(true);
    timer.current = null
  }

  const startTimer = () => {
    currentTime.current = 60;

    timer.current = setInterval(() => {
      if (currentTime.current - 1 === 0) {
        endAnswerTime();
      }

      currentTime.current -= 1
      setRenderTime(60 - currentTime.current + 1)
    }, 1000);
  }

  const reset = () => {
    setSelectedAnswer(null);
    setCorrectAnswer(0);
    setIsShowingAnswer(false);
    setCurrentQuestion(currentQuestion + 1);
    startTimer();
  }

  return (
    <div
      role="div"
      aria-label="quiz-manager"
      className="quiz-manager">
      <div className="quiz-manager__section quiz-manager__section--top">
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <AuthBar /> : <QuizStatusBar
            currentQuest={currentQuestion}
            totalQuest={numberOfQuestions}
            isPlus={selectedAnswer === correctAnswer}
            totalCorrect={numberOfCorrectQuestions}
          />}
      </div>

      <div className="quiz-manager__section quiz-manager__section--main">
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizOptions
            fieldOptionsList={DEMO_FIELD_OPTIONS}
            numberOfQuestionsOptionsList={DEMO_QUESTION_COUNT_OPTIONS}
            field={field}
            numberOfQuestions={numberOfQuestions}
            setField={setField}
            setNumberOfQuestion={setNumberOfQuestions}
          /> :
          <QuizQuestion
            questionContent={TEST_QUESTION_CONTENT}
            type={QUIZ_QUESTION_TYPE["MULTIPLE_CHOICE"]}
            optionsList={TEST_ANSWERS_LIST}
            correctAnswer={correctAnswer}
            isShowingAnswer={isShowingAnswer}
            selectedAnswer={selectedAnswer}
            onSubmitAnswer={submitAnswer}
            currentQuestion={currentQuestion}
          />}
      </div>

      <div className="quiz-manager__section quiz-manager__section--button">
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizButton
            fallbackCaption="Start"
            translateKey="quiz_page.buttons.start"
            onClick={() => startQuiz()}
          /> :
          currentQuestion !== numberOfQuestions ?
            <QuizButton
              fallbackCaption="Next"
              translateKey="quiz_page.buttons.next"
              onClick={() => {
                reset();
              }}
              isDisabled={!isShowingAnswer}
            />
            :
            <QuizButton
              fallbackCaption="Next"
              translateKey="quiz_page.buttons.end"
              onClick={() => {
                //HANDLE END QUIZ

              }}
              isDisabled={!isShowingAnswer}
            />}
      </div>

      <div className="quiz-manager__section quiz-manager__section--button quiz-manager__no-border">
        {quizState === QUIZ_STATE["SELECT_OPTIONS"] ?
          <QuizButton
            fallbackCaption="Close"
            translateKey="quiz_page.buttons.close"
            onClick={() => history.push("/")}
          /> :
          <QuizTimer
            data-render={renderTime}
            currentTime={currentTime.current}
            totalTime={60}
          />}
      </div>
    </div>
  );
};
