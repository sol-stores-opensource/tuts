import React from 'react';
import s from '../styles/tutorial.module.scss';
import {classNames} from '../utils';

export const Header = ({tutorial, totalSteps, stepNumber}) => {
  return (
    <div className={s.header_block}>
      <p className={s.logo}>
        <img className={s.top_logo} src={tutorial.logo} />
      </p>
      <h1 className={s.partner_name}>{tutorial.name}</h1>
      <div className={classNames(s.step_count)}>
        <span>Step {stepNumber}</span>/{totalSteps}
      </div>
      <div className={s.line_container}>
        <span className={s.line} />
        <span
          className={s.fill_line}
          style={{
            width: `${(stepNumber / totalSteps) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};
