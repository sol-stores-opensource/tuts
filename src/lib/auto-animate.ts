// for some reason the way this lib is packaged makes the types/normal import not work,
// so this is a workaround.

import {useAutoAnimate as fn} from '@formkit/auto-animate/react/index.mjs';
import types from '@formkit/auto-animate/react/index';

const useAutoAnimate: typeof types.useAutoAnimate = fn;

export {useAutoAnimate};
