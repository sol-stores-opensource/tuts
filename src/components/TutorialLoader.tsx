import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useNox} from '../hooks/useNox';
import {LOCAL_MODE} from '../lib/localMode';
import {useAppContext} from './AppContext';
import {PreviouslyRewardedChecker} from './PreviouslyRewardedChecker';
import {TutorialStep} from './TutorialFlow';

export function TutorialLoader() {
  const {sessionId} = useAppContext();
  const [data, setData] = useState(null as any);
  const params = useParams();

  const nox = useNox(sessionId);
  useEffect(() => {
    (async () => {
      const x = await nox.tutsData(params.tutorialStoreId);
      // console.log('x', x);

      const tutorialStore = x.data.tutorial.tutorial_stores.find((ts) => {
        return ts.store.id === x.data.store.id;
      });
      x.data.tutorial.on_complete_nft = tutorialStore.on_complete_nft;
      x.data.tutorial.tutorial_store_id = tutorialStore.id;
      x.data.tutorial.store = tutorialStore.store;
      // alert(JSON.stringify(x.data.tutorial.store));

      const session = await nox.session();
      // console.log('session', session);

      const steps = x.data.pages.map((page: TutorialStep) => {
        if (page.type === 'content_page') {
          return {id: page.page, title: page.title, description: page.description};
        } else if (page.type === 'question') {
          return {id: page.page, title: 'Question', description: page.question};
        }
      });

      await nox.setup(steps);

      const nft = x.data.tutorial.on_complete_nft?.id;

      let previouslyRewarded = !!(nft && (session.rewardsToDate[nft] || 0) > 0);
      if (LOCAL_MODE === 'rewarded') {
        previouslyRewarded = true;
      }
      if (LOCAL_MODE === 'new') {
        previouslyRewarded = false;
      }

      setData({
        ...x.data,
        session,
        previouslyRewarded,
      });
    })();
  }, []);

  if (!data) {
    return null;
  }
  return <PreviouslyRewardedChecker data={data} />;
}
