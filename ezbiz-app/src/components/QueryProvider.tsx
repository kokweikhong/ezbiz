"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient();

type QueryProviderProps = {
  children: React.ReactNode;
};

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
