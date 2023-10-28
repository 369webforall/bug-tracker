'use client';
import React, { PropsWithChildren } from 'react';
import {
  QueryClientProvider as ReactQueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
