import React, { useEffect } from 'react';
import { useGlobalState } from '../GlobalState/GlobalStateProvider';
import { ThemeProvider } from '@fluentui/react';
import themes from './themes'; // import the themes for FluentUI
import utils from './utils';

import { Header } from './mainAppComponents/Header';
import HiddenSettingsPanel from './mainAppComponents/HiddenSettingsPanel';
import { SimpleGenerator, OutlookContactsConnector, Error } from './Pages/Pages';

//A simple SPA for displaying URL search params created with React, TypeScript & Themed FluentUI. Practically used testing callpop properties in Landis Technologies software products.

export const App: React.FunctionComponent = () => {

  const { state, setState } = useGlobalState();

  function defaultStateSetter() {
    let initSettings = utils.localStorageGetter();
    setState( {
      ...state,
      appThemeState: initSettings.theme,
      settingsPanelOpenState: false,
      secretSettingsPanelOpenState: false,
      appModeState: initSettings.appMode,
      themePaletteState: initSettings.theme === "dark" ? themes.dark.palette : themes.light.palette,
    } );
  }

  const secretSettingsDivHandler = () => {
    if ( state.settingsPanelOpenState === false ) {
      setState( ( state ) => ( { ...state, secretSettingsPanelOpenState: true } ) );
    } else {
      setState( ( state ) => ( { ...state, secretSettingsPanelOpenState: false } ) );
    }

  }

  useEffect( () => {
    defaultStateSetter();
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
            case 2:
              return <Error errorMessage='Just a handy hack to test the error component 😅' errorCode='HELLOWORLDTEST' />;
            default:
              return <Error errorMessage='Something went very wrong and IDEK how you managed to get here!' errorCode='123YOUMESSEDUP890' />;
          }
        } )()}
      </div>
      <div
        className='hiddenSettingsPanel'
        style={{
          height: '30px',
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '30px',
        }}
        onClick={secretSettingsDivHandler}
      />
      <HiddenSettingsPanel />
    </ThemeProvider>
  );
};