import React, {useEffect, useState} from 'react';
import '../global-fonts.scss';
import '../global-reset.scss';
import '../global-base.scss';
import s from '../styles/tutorial.module.scss';
import {ImageStepPage} from './ImageStepPage';
import {VideoStepPage} from './VideoStepPage';
import {classNames} from '../utils';
import {Tutorial, TutorialContentPage} from './TutorialFlow';
import {useAppContext} from './AppContext';
import {useNox} from '../hooks/useNox';
import {Header} from './Header';

export const ContentPage = ({
  tutorial,
  page,
  nextPage,
  stepNumber,
  totalSteps,
  walletAddress,
}: {
  tutorial: Tutorial;
  page: TutorialContentPage;
  nextPage: any;
  stepNumber: number;
  totalSteps: number;
  walletAddress: string;
}) => {
  const {sessionId} = useAppContext();
  const nox = useNox(sessionId);
  const [buttonText, setButtonText] = useState('');
  const [enableNextStep, setEnableNextStep] = useState(page.image_url || page.video_playback_url ? false : true);
  const isExitPage = !!(page.exit_label && page.exit_url);

  const getExitUrl = () => {
    if (!isExitPage) return;

    const url = new URL(page.exit_url || '');
    url.searchParams.set('wallet_address', walletAddress);
    return url.toString();
  };

  const exitUrl = getExitUrl();

  useEffect(() => {
    if (isExitPage) {
      // useful to comment out in dev
      nox.complete(true);
    }
  }, [isExitPage]);

  const handleDone = () => {
    setEnableNextStep(true);
  };

  const nextButtonText = enableNextStep ? 'Next' : buttonText;

  return (
    <>
      <Header tutorial={tutorial} stepNumber={stepNumber} totalSteps={totalSteps} />

      <div className={s.container}>
        <div>
          {page.image_url && (
            <ImageStepPage key={`image_${stepNumber}`} onDone={handleDone} page={page}></ImageStepPage>
          )}
          {page.video_playback_url && (
            <VideoStepPage
              key={`video_${stepNumber}`}
              onDone={handleDone}
              setButtonText={setButtonText}
              page={page}
            ></VideoStepPage>
          )}
        </div>

        <div className={s.button_container}>
          {isExitPage ? (
            <a rel="external nofollow noopener" href={exitUrl} className={s.button}>
              {page.exit_label || ''}
            </a>
          ) : (
            nextButtonText && (
              <button
                className={classNames(enableNextStep ? s.button : s.button_disabled)}
                disabled={!enableNextStep}
                onClick={nextPage}
              >
                {nextButtonText}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};
