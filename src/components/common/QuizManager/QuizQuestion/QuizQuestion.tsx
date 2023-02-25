import './QuizQuestion.scss';
import React, { useEffect, useState } from 'react';
import { QUIZ_QUESTION_TYPE } from 'src/configs/constants';
import { useTranslation } from 'react-i18next';

export const QuizQuestion: React.FC<IQuizQuestion> = ({
  questionContent, type, optionsList, correctAnswer, onSubmitAnswer, isShowingAnswer,
  selectedAnswer, currentQuestion
}) => {
  const { t } = useTranslation();

  return (
    <div
      role="div"
      aria-label="quiz-question"
      id={`quiz-question-${currentQuestion}`}
      className="quiz-question">
      <div className={`quiz-question__question ${type === QUIZ_QUESTION_TYPE.NAVIGATE ? "quiz-question__question--navigate" : ""}`}>
        {questionContent}
      </div>

      {type !== QUIZ_QUESTION_TYPE.NAVIGATE ?
        <div className={"quiz-question__answers grid grid-cols-2"}>
          {optionsList.map((option, index) => <div
            className={`quiz-question__answer col-span-1 
              flex justify-center items-center
              ${isShowingAnswer ? option.index === correctAnswer ? "quiz-question__answer--true quiz-question__answer--ended" : "quiz-question__answer--ended" : "quiz-question__answer--not-ended"}
              ${option.index !== correctAnswer && option.index === selectedAnswer ? "quiz-question__answer--false" : ""}`}
            key={`option-${index}`}
            id={`option-${index}`}
            onClick={() => {
              if (!isShowingAnswer)
                onSubmitAnswer(option.index)
            }}>
            {type !== QUIZ_QUESTION_TYPE.CHOOSE_FROM_LOCATION ? `${option.answer}`
              : `${option.answer.substring(option.answer.indexOf("(") + 1, option.answer.indexOf(")"))}`}
          </div>
          )}
        </div> :
        <div>
          <div
            className={`quiz-question__answer 
              flex justify-center items-center
              ${isShowingAnswer ? "quiz-question__answer--ended" : "quiz-question__answer--not-ended"}`}
            onClick={() => {
              if (!isShowingAnswer)
                onSubmitAnswer(0)
            }}>
            {t('quiz_page.buttons.confirmation')}
          </div>
        </div>}
    </div>
  );
};
