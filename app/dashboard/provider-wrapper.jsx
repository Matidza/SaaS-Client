'use client';

import { ChakraProvider, extendTheme, theme } from '@chakra-ui/react';

const customTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    brand: {
      500: '#3182ce',
    },
  },
};

export default function DashboardProviderWrapper({ children }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}



