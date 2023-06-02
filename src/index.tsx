import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App';

export const isBrowser = () => typeof window !== 'undefined' && !!window;

const w: any = window;

w.appRevision = process.env.REACT_APP_APP_REVISION;

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
