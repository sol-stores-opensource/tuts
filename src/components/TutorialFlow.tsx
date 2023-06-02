import React, {useState} from 'react';
import {ContentPage} from './ContentPage';
import {DonePage} from './DonePage';
import {QuestionPage} from './QuestionPage';
import {useNox} from '../hooks/useNox';
import {useAppContext} from './AppContext';

export type Tutorial = {
  description: string;
  id: string;
  logo: string;
  name: string;
  reward: string;
  time: string;
  url: string;
  tutorial_store_id?: string;
  store?: Store;
  on_complete_nft?: {
    id: string;
    image: string;
  } | null;
};

export type Store = {
  id: string;
  slug: string;
  name: string;
  misc: [k: string];
};

export type TutorialContentPage = {
  page: number;
  type: 'content_page';
  title: string;
  description: string | null;
  image_url: string | null;
  video_playback_url: string | null;
  video_thumbnail_url: string | null;
  exit_label: string | null;
  exit_url: string | null;
};

export type TutorialQuestion = {
  page: number;
  type: 'question';
  question: string;
  answers: {
    answer: string;
    correct: boolean;
  }[];
};

export type TutorialStep = TutorialContentPage | TutorialQuestion;

type LokiSession = {
  address: string;
  rewardsToDate: {
    [key: string]: number;
  };
};

export type TutorialFlowData = {
  session: LokiSession;
  pages: TutorialStep[];
  tutorial: Tutorial;
  store: Store;
  previouslyRewarded: boolean;
};

export function TutorialFlow({data}: {data: TutorialFlowData}) {
  const {sessionId} = useAppContext();
  const nox = useNox(sessionId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextPage = () => {
    const curPage = data.pages[currentIndex];
    if (curPage) {
      nox.step(curPage.page);
    }
    setCurrentIndex(currentIndex + 1);
  };
  const page = data.pages[currentIndex];
  const tutorial = data.tutorial;
  const walletAddress = data.session?.address;

  const render = () => {
    if (!page) {
      return <DonePage data={data} />;
    }

    if (page.type === 'content_page') {
      return (
        <ContentPage
          tutorial={tutorial}
          page={page}
          nextPage={nextPage}
          stepNumber={currentIndex + 1}
          totalSteps={data.pages.length}
          walletAddress={walletAddress}
        />
      );
    }

    if (page.type === 'question') {
      return (
        <QuestionPage
          tutorial={tutorial}
          page={page}
          nextPage={nextPage}
          stepNumber={currentIndex + 1}
          totalSteps={data.pages.length}
        />
      );
    }

    return (
      <div>
        <div>{JSON.stringify(page)}</div>
        <div>
          <button onClick={nextPage}>next</button>
        </div>
      </div>
    );
  };

  return <React.Fragment key={currentIndex}>{render()}</React.Fragment>;
}
