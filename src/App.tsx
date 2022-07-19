import React from 'react';
import { useState, useEffect } from 'react';
import { Stack, Text, TextField, Toggle, ThemeProvider } from '@fluentui/react';
import { stackStyles, stackTokens } from './styles'; // import the styles from the styles file
import { darkTheme, lightTheme } from './themes'; // import the themes for FluentUI
import { effects } from './sideEffects';

export const App: React.FunctionComponent = () => {

  const [disableDarkMode, setDisableDarkMode] = useState( false );

  const [callerNumberState, setCallerNumberState] = useState( '' );
  const [displayNameState, setDisplayNameState] = useState( '' );
  const [queueNameState, setQueueNameState] = useState( '' );
  const [scenarioIdState, setScenarioIdState] = useState( '' );

  const url = new URL( document.URL );
  const urlSp = url.searchParams;

  let callerNumber: any = urlSp.get( 'callernumber' );
  let displayName: any = urlSp.get( 'displayname' );
  let queueName: any = urlSp.get( 'queuename' );
  let scenarioId: any = urlSp.get( 'scenarioid' );
  let searchParams: any = effects.getAllUrlParams
  let searchParamsKeys: Array<string> = Object.keys( searchParams() );

  useEffect( () => {
    urlSearchParamsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

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
          <div style={{paddingTop: "25px"}}>
            <Toggle
              offText="🌙 Mode"
              onText="🔆 Mode"
              onChange={() => setDisableDarkMode( !disableDarkMode )}
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
