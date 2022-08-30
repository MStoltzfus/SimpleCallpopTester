import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../GlobalState/GlobalStateProvider';
import { Providers, ProviderState } from '@microsoft/mgt-element';
import { ThemeProvider } from '@fluentui/react';
import themes from './themes'; // import the themes for FluentUI
import utils from './utils';

import { Header } from './mainAppComponents/Header';
import { SimpleGenerator, OutlookContactsConnector, Error, modeDefinitions, Info } from './Features/Features';
import { MsAppIdForm } from './sharedComponents/MsAppIdForm';
import { useIsSignedIn } from './customHooks';
import StyledLogin from './sharedComponents/StyledLogin';
import SmsComponent from './Features/SmsComponent/SmsComponent';

//A simple SPA for displaying URL search params created with React, TypeScript & Themed FluentUI. Practically used testing callpop properties in Landis Technologies software products.

export const App: React.FunctionComponent = () => {

  const { globalState, setGlobalState } = useGlobalState();
  const [isSignedIn] = useIsSignedIn();

  function defaultStateSetter() {
    let initSettings = utils.localStorageGetter();
    const provider = Providers.globalProvider;
    setGlobalState( {
      ...globalState,
      appThemeState: initSettings.theme,
      settingsPanelOpenState: false,
      //@ts-ignore
      secretSettingsOpenState: import.meta.env.MODE === 'development' ? true : false,
      appModeState: initSettings.appMode,
      msUserIsSignedInState: provider && provider.state === ProviderState.SignedIn,
      themePaletteState: initSettings.theme === "dark" ? themes.dark.palette : themes.light.palette,
    } );
  }

  useEffect( () => {
    defaultStateSetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const appName = utils.isAppNameInUrl(); //Calls the method to check if the app name is in the URL
  const msAppId = utils.localStorageGetter().msAppId; //Get the msAppId from local storage  }

  return (
    <ThemeProvider applyTo={"body"} theme={globalState.appThemeState === "dark" ? themes.dark : themes.light}>
      <div className="App">
        <Header appName={appName} />
        {( () => {
          switch ( globalState.appModeState ) {
            case modeDefinitions.simpleGenerator:
              return <SimpleGenerator />;
            case modeDefinitions.outlookContactsConnector:
              return isSignedIn ?
                <OutlookContactsConnector /> :
                <Info infoMessage='You are not signed in' innerComponent={<StyledLogin />} />;
            case modeDefinitions.errorComponentTest:
              return <Error
                errorMessage='Just a handy way to test the error component 😅'
                errorMessageExtended='You can add more details about the error here 😊'
                errorCode='HELLOWORLDTEST'
              />;
            case modeDefinitions.infoComponentTest:
              return <Info
                infoMessage='Just a handy way to test the info component 😅'
              />;
            case modeDefinitions.smsComponent:
              return <SmsComponent />;
            default:
              return <Error
                errorMessage="Invalid App Mode"
                errorMessageExtended='The set app mode is not defined - it either does not exist or a definition was not updated somewhere.'
                errorCode='INVALIDAPPMODE'
              />;
          }
        } )()}
      </div>
    </ThemeProvider>
  );
};


/*
              return utils.isValidMsGuid( msAppId ) ?
                <OutlookContactsConnector /> :
                <Info infoMessage='No Valid Microsoft Application ID Set' innerComponent={<MsAppIdForm />} />;

*/