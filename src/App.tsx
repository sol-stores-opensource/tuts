import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useSearchParams} from 'react-router-dom';
import {AppProvider, useAppContext} from './components/AppContext';
import './global-fonts.scss';
import './global-reset.scss';
import './global-base.scss';
import s from './styles/layout.module.scss';
import {TutorialLoader} from './components/TutorialLoader';
import {LOCAL_MODE, LOCAL_MODE_SID} from './lib/localMode';

// // debug helper
// window.console.log = (...args) => {
//   const body = document.body;
//   const div = document.createElement('div');
//   div.style.border = '1px solid red';
//   div.innerText = args.map((x) => `${x}`).join(', ');
//   body.appendChild(div);
// };

function NotFound() {
  return <div>404</div>;
}

function Main() {
  const {sessionId, setSessionId} = useAppContext();
  const [searchParams] = useSearchParams();
  const searchParamsSid = LOCAL_MODE ? LOCAL_MODE_SID : searchParams.get('sid') || '';

  useEffect(() => {
    if (!sessionId && searchParamsSid) {
      setSessionId(searchParamsSid);
    }
  }, [sessionId, searchParamsSid]);

  if (!sessionId) {
    return <div>Loading.....</div>;
  }

  return (
    <Routes>
      <Route path="/tuts/:tutorialStoreId" element={<TutorialLoader />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <main className={s.outer_container}>
          <Main />
        </main>
      </AppProvider>
    </BrowserRouter>
  );
}
