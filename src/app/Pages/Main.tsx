import { useEffect } from 'react';
import { Stack, ThemeProvider } from '@fluentui/react';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import ListItemsComponent from '../components/ListItemsComponent';
import { stackStyles, stackTokens, mainContentStyle } from '../styles'; // import the styles from the styles file
import { darkTheme, lightTheme, headerTheme } from '../themes'; // import the themes for FluentUI
import utils from '../utils';
import { Header } from '../components/Header';

function Main() {
  const { state, setState } = useGlobalState();

  let searchParams = utils.getAllUrlParams(); //Calls the method to get URL Search Params and create an easy to work with array from them

  useEffect( () => {
    utils.localStorageSetter();
    setState( { ...state, theme: utils.checkThemeSetting() } );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const appName = utils.isAppNameInUrl(); //Calls the method to check if the app name is in the URL
  console.log( state )

  return (
    <ThemeProvider applyTo={"body"} theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <div className="App">
        <ThemeProvider applyTo={"element"} theme={headerTheme}>
          <Header appName={appName} />
        </ThemeProvider>
        <div style={mainContentStyle}>
          <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
            <ListItemsComponent props={searchParams} />
          </Stack>
        </div>
      </div>
    </ThemeProvider>
  )
}

//<ThemeProvider applyTo={"body"} theme={disableDarkMode ? lightTheme : darkTheme}></ThemeProvider>

export default Main