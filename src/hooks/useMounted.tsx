import {useEffect} from 'react';

export function useMounted(label: string) {
  useEffect(() => {
    console.log(`Mounted ${label}`);
    return () => console.log(`Unmounted ${label}`);
  }, []);
}
