import React from 'react';
import { GlobalStateProvider } from '../GlobalState/GlobalStateProvider';
import Main from './Pages/Main';

//A simple SPA for displaying URL search params created with React, TypeScript & Themed FluentUI. Practically used testing callpop properties in Landis Technologies software products.

export const App: React.FunctionComponent = () => {

  return (
    <GlobalStateProvider>
      <Main/>
    </GlobalStateProvider>
  );
};