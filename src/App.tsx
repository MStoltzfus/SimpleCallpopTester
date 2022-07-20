import React from 'react';
import { useState, useEffect } from 'react';
import { Stack, Text, TextField, Toggle, ThemeProvider } from '@fluentui/react';
import { stackStyles, stackTokens } from './styles'; // import the styles from the styles file
import { darkTheme, lightTheme } from './themes'; // import the themes for FluentUI
import { utils } from './utils';

export const App: React.FunctionComponent = () => {

  const [disableDarkMode, setDisableDarkMode] = useState( utils.checkLightThemeSetting() );

  const [callerNumberState, setCallerNumberState] = useState( '' );
  const [displayNameState, setDisplayNameState] = useState( '' );
  const [queueNameState, setQueueNameState] = useState( '' );
  const [scenarioIdState, setScenarioIdState] = useState( '' );

  const url = new URL( document.URL );
  const urlSp = url.searchParams;

  let callerNumber: string | null = urlSp.get( 'callernumber' );
  let displayName: string | null = urlSp.get( 'displayname' );
  let queueName: string | null = urlSp.get( 'queuename' );
  let scenarioId: string | null = urlSp.get( 'scenarioid' );
  let searchParams: any = utils.getAllUrlParams
  let searchParamsKeys: Array<string> = Object.keys( searchParams() );

  useEffect( () => {
    urlSearchParamsHandler();
    utils.localStorageSetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const themeToggleSwitchHandler = () => {
    if ( disableDarkMode !== true ) {
      setDisableDarkMode( !disableDarkMode );
      localStorage.setItem( "theme", "light" );
    } else {
      setDisableDarkMode( !!disableDarkMode );
      localStorage.setItem( "theme", 'dark' );
    }
  };

  const urlSearchParamsHandler = () => {
    console.log( 'URL params: number - ' + callerNumber + ' name - ' + displayName + ' queue - ' + queueName );
    console.log( searchParams() )
    console.log( searchParamsKeys );

    ( callerNumber !== null ) ? setCallerNumberState( callerNumber ) : setCallerNumberState( 'No Caller Number' );
    ( displayName !== null ) ? setDisplayNameState( displayName ) : setDisplayNameState( 'No Display Name' );
    ( queueName !== null ) ? setQueueNameState( queueName ) : setQueueNameState( 'No Queue Name' );
    ( scenarioId !== null ) ? setScenarioIdState( scenarioId ) : setScenarioIdState( 'No Scenario ID' );

  };

  return (
    <ThemeProvider applyTo="body" theme={disableDarkMode ? lightTheme : darkTheme}>
      <div>
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
          <div style={{ paddingTop: "25px" }}>
            <Toggle
              defaultChecked={utils.checkLightThemeSetting()}
              offText="🌒 Mode"
              onText="🔆 Mode"
              onChange={() => themeToggleSwitchHandler()}
            />
          </div>
          <Text variant={'xLarge'}> The URL Params are - </Text>
          <TextField label="Caller Number" readOnly value={callerNumberState} />
          <TextField label="Display Name" readOnly value={displayNameState} />
          <TextField label="Queue Name" readOnly value={queueNameState} />
          <TextField label="Scenario ID" readOnly value={scenarioIdState} />
          <Text>Params for the URL are callernumber, displayname, queuename & scenarioid</Text>
        </Stack>
      </div>
    </ThemeProvider>
  );
};
