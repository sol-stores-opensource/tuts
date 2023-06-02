import React, {useEffect} from 'react';
import '../global-fonts.scss';
import '../global-reset.scss';
import '../global-base.scss';
import s from '../styles/tutorial.module.scss';
import {TutorialContentPage} from './TutorialFlow';

export const ImageStepPage = ({onDone, page}: {onDone: any; page: TutorialContentPage}) => {
  useEffect(() => {
    onDone(true);
  }, []);

  return (
    <div>
      <div>
        <img className={s.image} src={page.image_url || ''}></img>
      </div>
      <div>
        <h1 className={s.p_title}> {page.title} </h1>
        <p className={s.p_body}>{page.description}</p>
      </div>
    </div>
  );
};
