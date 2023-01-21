import './QuizQuestion.scss';
import React, { useState } from 'react';
import { QUIZ_QUESTION_TYPE } from 'src/configs/constants';

export const QuizQuestion: React.FC<IQuizQuestion> = ({
  questionContent, type, optionsList, correctAnswer
}) => {
  return (
    <div
      role="div"
      aria-label="quiz-question"
      className="quiz-question">
      <div className={`quiz-question__question 
      ${type !== QUIZ_QUESTION_TYPE["MULTIPLE_CHOICE"] ? "quiz-question__full" : ""}`}>
        {questionContent}
        {questionContent}
      </div>

      {type === QUIZ_QUESTION_TYPE["MULTIPLE_CHOICE"] &&
        <div className={"quiz-question__answers grid grid-cols-2"}>
          {optionsList.map(option =>
            <div className={"quiz-question__answer col-span-1 flex justify-center items-center"}>
              {option.answer}
            </div>)}
        </div>}
    </div>
  );
};
