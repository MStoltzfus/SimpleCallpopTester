import React from 'react';
import { useState, useEffect } from 'react';
import { Stack, Text, TextField, Toggle, ThemeProvider } from '@fluentui/react';
import { stackStyles, stackTokens } from './styles'; // import the styles from the styles file
import { darkTheme, lightTheme } from './themes'; // import the themes for FluentUI
import { utils } from './utils';

export const App: React.FunctionComponent = () => {

  const [disableDarkMode, setDisableDarkMode] = useState( utils.checkLightThemeSetting() );
  
  let searchParams: any = utils.getAllUrlParams

  useEffect( () => {
    urlSearchParamsHandler();
    utils.localStorageSetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );


  const themeToggleSwitchHandler = () => {
    if ( disableDarkMode === false ) {
      setDisableDarkMode( !disableDarkMode );
      localStorage.setItem( "theme", "light" );
    }
    if ( disableDarkMode === true ) {
      setDisableDarkMode( !!disableDarkMode );
      localStorage.setItem( "theme", 'dark' );
    }
  };

  const urlSearchParamsHandler = () => {
    console.log( 'Search params full object -', searchParams() );
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
          <>
          {searchParams().length > 0 && searchParams().map(( props:any ) => (
            <TextField label={props.key} readOnly value={props.value}/>
          ))}
          </>
        </Stack>
      </div>
    </ThemeProvider>
  );
};