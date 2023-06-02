import React, {useState} from 'react';
import '../global-fonts.scss';
import '../global-reset.scss';
import '../global-base.scss';
import s from '../styles/quiz.module.scss';
import {classNames} from '../utils';
import {Tutorial, TutorialQuestion} from './TutorialFlow';
import {Header} from './Header';

export const QuestionPage = ({
  tutorial,
  page,
  nextPage,
  stepNumber,
  totalSteps,
}: {
  tutorial: Tutorial;
  page: TutorialQuestion;
  nextPage: any;
  stepNumber: number;
  totalSteps: number;
}) => {
  const [wrong, setWrong] = useState(-1);
  const [right, setRight] = useState(-1);
  const isDone = right > -1;

  const handleAnswer = (idx: number) => {
    if (isDone) {
      return;
    }
    const choice = page.answers[idx];
    if (choice.correct) {
      setWrong(-1);
      setRight(idx);
    } else {
      setWrong(idx);
    }
  };

  return (
    <div>
      <Header tutorial={tutorial} stepNumber={stepNumber} totalSteps={totalSteps} />
      <div className={s.container}>
        <div>
          <div className={s.p_title}>
            <span className={s.quiz_title}>quiz</span>
            {page.question}
          </div>
          {page.answers.map((choice, i) => (
            <p
              className={classNames(
                s.quiz_question,
                s.p_body,
                isDone && right !== i ? s.other_answer : wrong === i && s.wrong,
                right === i && s.right
              )}
              key={i}
              onClick={() => handleAnswer(i)}
            >
              {choice.answer}
            </p>
          ))}
        </div>
      </div>

      <div className={s.button_container}>
        <button className={classNames(isDone ? s.button : s.button_disabled)} disabled={!isDone} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};
