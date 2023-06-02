import React, {useState} from 'react';
import {TutorialFlow, TutorialFlowData} from './TutorialFlow';
import s from '../styles/previously-rewarded-checker.module.scss';
import redarrowup from '../static/images/redarrowup.png';
import {useAppContext} from './AppContext';
import {useNox} from '../hooks/useNox';

export function PreviouslyRewardedChecker({data}: {data: TutorialFlowData}) {
  const {sessionId} = useAppContext();
  const nox = useNox(sessionId);
  const [ack, setAck] = useState(false);
  const [wantsExit, setWantsExit] = useState(false);

  if (wantsExit) {
    return (
      <div>
        <div style={{textAlign: 'right'}}>
          <img src={redarrowup} className={s.redarrowup} />
        </div>
        <div className={s.text}>Close out above.</div>
      </div>
    );
  }

  const needsAck = data.previouslyRewarded && !ack;

  if (needsAck) {
    return (
      <div>
        <div className={s.text}>You were already rewarded for this one, but you can go through it again for fun!</div>
        <div style={{textAlign: 'center'}}>
          <div style={{height: '30px'}} />
          <button
            onClick={() => {
              nox.complete(false);
              setWantsExit(true);
            }}
            className={s.button_secondary}
          >
            Exit
          </button>
          <div style={{height: '20px'}} />
          <button onClick={() => setAck(true)} className={s.button}>
            Continue
          </button>
          <div style={{height: '30px'}} />
        </div>
      </div>
    );
  } else {
    return <TutorialFlow data={data} />;
  }
}
