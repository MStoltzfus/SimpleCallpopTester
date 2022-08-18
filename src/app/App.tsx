import React, { useEffect } from 'react';
import { useGlobalState } from '../GlobalState/GlobalStateProvider';
import { ThemeProvider } from '@fluentui/react';
import themes from './themes'; // import the themes for FluentUI
import utils from './utils';

import { Header } from './mainAppComponents/Header';
import { SimpleGenerator, OutlookContactsConnector, Error, modeDefinitions } from './Pages/Pages';

//A simple SPA for displaying URL search params created with React, TypeScript & Themed FluentUI. Practically used testing callpop properties in Landis Technologies software products.

export const App: React.FunctionComponent = () => {

  const { globalState, setGlobalState } = useGlobalState();

  function defaultStateSetter() {
    let initSettings = utils.localStorageGetter();
    setGlobalState( {
      ...globalState,
      appThemeState: initSettings.theme,
      settingsPanelOpenState: false,
      secretSettingsOpenState: process.env.NODE_ENV === 'development' ? true : false,
      appModeState: initSettings.appMode,
      msAppIdState: initSettings.msAppId,
      themePaletteState: initSettings.theme === "dark" ? themes.dark.palette : themes.light.palette,
    } );
  }

  useEffect( () => {
    defaultStateSetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const appName = utils.isAppNameInUrl(); //Calls the method to check if the app name is in the URL

  console.log( globalState )

  return (
    <ThemeProvider applyTo={"body"} theme={globalState.appThemeState === "dark" ? themes.dark : themes.light}>
      <div className="App">
        <Header appName={appName} />
        {( () => {
          switch ( globalState.appModeState ) {
            case modeDefinitions.simpleGenerator:
              return <SimpleGenerator />;
            case modeDefinitions.outlookContactsConnector:
              return <OutlookContactsConnector />;
            case modeDefinitions.errorComponentTest:
              return <Error
                errorMessage='Just a handy way to test the error component 😅'
                errorCode='HELLOWORLDTEST'
              />;
            default:
              return <Error
                errorMessage="Invalid App Mode Set"
                errorCode='INVALIDAPPMODE'
              />;
          }
        } )()}
      </div>
    </ThemeProvider>
  );
};