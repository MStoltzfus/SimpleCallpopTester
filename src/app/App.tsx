import React, { useEffect } from 'react';
import { useGlobalState } from '../GlobalState/GlobalStateProvider';
import { ThemeProvider } from '@fluentui/react';
import themes from './themes'; // import the themes for FluentUI
import utils from './utils';

import { Header } from './mainAppComponents/Header';
import SimpleGenerator from './Pages/simpleGenerator/SimpleGenerator';
import OutlookContactsConnector from './Pages/outlookContactsConnector/OutlookContactsConnector';

//A simple SPA for displaying URL search params created with React, TypeScript & Themed FluentUI. Practically used testing callpop properties in Landis Technologies software products.

export const App: React.FunctionComponent = () => {

  const { state, setState } = useGlobalState();

  useEffect( () => {
    utils.localStorageSetter();
    setState( {
      ...state,
      appThemeState: utils.localStorageGetter().theme,
      settingsPanelOpenState: false,
      appModeState: utils.localStorageGetter().appMode,
    } );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const appName = utils.isAppNameInUrl(); //Calls the method to check if the app name is in the URL

  console.log( state )
  return (
    <ThemeProvider applyTo={"body"} theme={state.appThemeState === "dark" ? themes.dark : themes.light}>
      <div className="App">
        <Header appName={appName} />
        {( () => {
          switch ( state.appModeState ) {
            case 0:
              return <SimpleGenerator />;
            case 1:
              return <OutlookContactsConnector />;
            default:
              return <SimpleGenerator />;
          }
        } )()}

      </div>
    </ThemeProvider>
  );
};