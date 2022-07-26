import React from 'react';
import { useState, useEffect } from 'react';
import { Stack, Text, Toggle, ThemeProvider } from '@fluentui/react';
import ListItemsComponent from './components/ListItemsComponent';
import { stackStyles, stackTokens } from './styles'; // import the styles from the styles file
import { darkTheme, lightTheme } from './themes'; // import the themes for FluentUI
import { utils } from './utils';

//A simple SPA for displaying URL search params created with React, TypeScript & Themed FluentUI. Practically used testing callpop properties in Landis Technologies software products.

export const App: React.FunctionComponent = () => {

  const [disableDarkMode, setDisableDarkMode] = useState( utils.checkLightThemeSetting() ); // set the initial state of the dark mode toggle to the value of the setting in local storage

  let searchParams = utils.getAllUrlParams(); //Calls the method to get URL Search Params and create an easy to work with array from them

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
      setDisableDarkMode( !disableDarkMode );
      localStorage.setItem( "theme", 'dark' );
    }
  };

  const appName = utils.isAppNameInUrl(); //Calls the method to check if the app name is in the URL

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
          <div style={{ paddingBottom: '15px' }}>
            <Text variant={'xLarge'}> {appName} </Text>
          </div>
          <ListItemsComponent props={searchParams} />
        </Stack>
      </div>
    </ThemeProvider>
  );
};