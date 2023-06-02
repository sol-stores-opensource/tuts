import React, {ReactNode, useState, useContext, useCallback} from 'react';
import {uuid} from '../utils';

export type AppContextState = ReturnType<typeof useAppContextValue>;

export const AppContext = React.createContext(null as any as AppContextState);

export function useAppContext() {
  return useContext(AppContext);
}

let ran = false;

function useAppContextValue() {
  const [sessionId, setSessionId] = useState('');
  const [navIsHidden, setNavIsHidden] = useState(false);
  const [tick, setTick] = useState(0);
  const doTick = useCallback(() => setTick(tick + 1), [tick, setTick]);

  return {
    navIsHidden,
    setNavIsHidden,
    tick,
    setTick,
    doTick,
    sessionId,
    setSessionId,
  };
}

export const AppProvider = ({children}: {children: ReactNode}) => {
  const value = useAppContextValue();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
