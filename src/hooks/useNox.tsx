import {LOCAL_MODE} from '../lib/localMode';

const NOX_BASE = process.env.REACT_APP_NOX_HTTP_BASE;

export function useNox(sessionId: string) {
  const step = async (step: number) => {
    console.log('nox step', step);
    if (LOCAL_MODE) {
      return {ok: true} as any;
    }
    const res = await fetch(`${NOX_BASE}/api/le/step`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionId,
        step: step,
        status: 'COMPLETE',
      }),
    });

    return await res.json();
  };

  const reward = async (amount: number, token: string) => {
    console.log('nox reward', amount, token);
    if (LOCAL_MODE) {
      return {ok: true} as any;
    }
    const res = await fetch(`${NOX_BASE}/api/le/reward`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionId,
        amount,
        token,
      }),
    });
    return await res.json();
  };

  const session = async () => {
    console.log('nox session');
    if (LOCAL_MODE) {
      return {address: 'LOCAL', rewardsToDate: {}} as any;
    }
    const res = await fetch(`${NOX_BASE}/api/le/session?sessionId=${sessionId}`, {
      method: 'GET',
    });

    return await res.json();
  };

  const complete = async (status: boolean): Promise<{ok: boolean; spaces_nft_reward_count: number}> => {
    console.log('nox complete', status);
    if (LOCAL_MODE) {
      return {ok: true, spaces_nft_reward_count: 1};
    }
    const res = await fetch(`${NOX_BASE}/api/le/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionId,
        status,
      }),
    });
    return await res.json();
  };

  const setup = async (steps: any) => {
    console.log('nox setup', steps);
    if (LOCAL_MODE) {
      return {ok: true} as any;
    }
    const res = await fetch(`${NOX_BASE}/api/le/setup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: sessionId,
        steps,
      }),
    });

    return await res.json();
  };

  const tutsData = async (...args: any) => {
    console.log('nox tutsData');
    const sid = LOCAL_MODE ? `${sessionId}:${args[0]}` : sessionId;
    const res = await fetch(`${NOX_BASE}/api/le/tuts_data?sessionId=${sid}`, {
      method: 'GET',
    });

    return await res.json();
  };

  return {
    step,
    reward,
    session,
    complete,
    setup,
    tutsData,
  };
}
