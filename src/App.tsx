import React from 'react';
import { useState, useEffect } from 'react';
import { Stack, IStackTokens, IStackStyles } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
import './App.css';

const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '250px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c'
  },
};

export const App: React.FunctionComponent = () => {

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

  useEffect( () => {
    urlSearchParamsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const urlSearchParamsHandler = () => {
    console.log( 'URL params: number - ' + callerNumber + ' name - ' + displayName + ' queue - ' + queueName );

    ( callerNumber !== null ) ? setCallerNumberState( callerNumber ) : setCallerNumberState( 'No Caller Number' );
    ( displayName !== null ) ? setDisplayNameState( displayName ) : setDisplayNameState( 'No Display Name' );
    ( queueName !== null ) ? setQueueNameState( queueName ) : setQueueNameState( 'No Queue Name' );
    ( scenarioId !== null ) ? setScenarioIdState( scenarioId ) : setScenarioIdState( 'No Scenario ID' );

  };


  return (
    <div className="App">
      <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
        <h2 style={{ color: 'white' }}> The URL Params are - </h2>
        <TextField label="Caller Number" readOnly value={callerNumberState} />
        <TextField label="Display Name" readOnly value={displayNameState} />
        <TextField label="Queue Name" readOnly value={queueNameState} />
        <TextField label="Scenario ID" readOnly value={scenarioIdState} />
        <p style={{ color: 'grey' }}>Params for the URL are callernumber, displayname, queuename & scenarioid</p>
      </Stack>
    </div>
  );
};
