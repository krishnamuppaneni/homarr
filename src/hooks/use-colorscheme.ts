import { ColorScheme } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { setCookie } from 'cookies-next';
import { Session } from 'next-auth';
import { useState } from 'react';
import { api } from '~/utils/api';

import { COOKIE_COLOR_SCHEME_KEY } from '../../data/constants';

export const useColorScheme = (defaultValue: ColorScheme, session: Session) => {
  const [colorScheme, setColorScheme] = useState(defaultValue);
  const { mutateAsync } = api.user.changeColorScheme.useMutation();

  const toggleColorScheme = async () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newColorScheme);
    setCookie(COOKIE_COLOR_SCHEME_KEY, newColorScheme);
    if (session && new Date(session.expires) > new Date()) {
      await mutateAsync({ colorScheme: newColorScheme });
    }
  };

  useHotkeys([['mod+J', () => void toggleColorScheme()]]);

  return {
    colorScheme,
    toggleColorScheme,
  };
};