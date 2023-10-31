import * as Font from 'expo-font';
import { useEffect, useMemo, useState } from 'react';

interface FontObject {
  fontFamily: string;
  fontWeight: string;
}

interface UseFontResult {
  font: Record<string, FontObject> | null;
  loaded: boolean;
  error: Error | null;
}

export function useFont(): UseFontResult {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadFont() {
      try {
        await Font.loadAsync({
          'TTCommons-Regular': require('@/assets/fonts/TTCommons-Regular.otf'),
          'TTCommons-Light': require('@/assets/fonts/TTCommons-Light.otf'),
          'TTCommons-Medium': require('@/assets/fonts/TTCommons-Medium.otf'),
          'TTCommons-Bold': require('@/assets/fonts/TTCommons-Bold.otf'),
          'TTCommons-SemiBold': require('@/assets/fonts/TTCommons-SemiBold.otf'),
        });
        setLoaded(true);
      } catch (e: unknown) {
        // type annotation added here
        if (e instanceof Error) {
          // check if e is an instance of the Error class
          setError(e);
        }
      }
    }

    loadFont();
  }, []);

  const font = useMemo<Record<string, FontObject> | null>(() => {
    if (loaded) {
      return {
        'TTCommons-Regular': {
          fontFamily: 'TTCommons-Regular',
          fontWeight: 'normal',
        },
        'TTCommons-Light': {
          fontFamily: 'TTCommons-Light',
          fontWeight: 'normal',
        },
        'TTCommons-Medium': {
          fontFamily: 'TTCommons-Medium',
          fontWeight: 'normal',
        },
        'TTCommons-Bold': {
          fontFamily: 'TTCommons-Bold',
          fontWeight: 'normal',
        },
        'TTCommons-SemiBold': {
          fontFamily: 'TTCommons-Bold',
          fontWeight: 'normal',
        },
      };
    }
    return null;
  }, [loaded]);

  return { font, loaded, error };
}
