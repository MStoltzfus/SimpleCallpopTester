import React from 'react';
import { useState, useEffect } from 'react';
import { Stack, Text, Toggle, ThemeProvider } from '@fluentui/react';
import ListItemsComponent from './ListItemsComponent';
import { stackStyles, stackTokens } from './styles'; // import the styles from the styles file
import { darkTheme, lightTheme } from './themes'; // import the themes for FluentUI
import { utils } from './utils';

export const App: React.FunctionComponent = () => {

  const [disableDarkMode, setDisableDarkMode] = useState( utils.checkLightThemeSetting() );

  let searchParams = utils.getAllUrlParams
  let foo = searchParams(undefined)

  useEffect( () => {
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
          <Text variant={'xLarge'}> Michael's URL Param Tester </Text>
          <ListItemsComponent props={foo}/>
        </Stack>
      </div>
    </ThemeProvider>
  );
};