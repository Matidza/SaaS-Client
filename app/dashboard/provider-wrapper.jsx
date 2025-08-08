// app/dashboard/provider-wrapper.jsx
'use client';

import { ChakraProvider } from '@chakra-ui/react';

export default function DashboardProviderWrapper({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
