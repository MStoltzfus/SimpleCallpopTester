import React from 'react';
import ReactDOM from 'react-dom';

import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';

import { App } from './app/App';
import { mergeStyles, initializeIcons } from '@fluentui/react';
import { GlobalStateProvider } from './GlobalState/GlobalStateProvider';
import utils from './app/utils';
import { scopes } from './app/msAuthConfig';

//import reportWebVitals from './reportWebVitals';

utils.localStorageDefaultsSetter(); //Set the default values for the local storage -- needs to be the first function to run when the app launches
initializeIcons(); // Initialize icons in case this example uses them

//const localsettings = utils.localStorageGetter();
const msAppId = import.meta.env.VITE_MS_APPLICATION_ID;

Providers.globalProvider = new Msal2Provider({
  //@ts-ignore
  clientId: msAppId,
  scopes: scopes
});

// Inject some global styles
mergeStyles( {
  ':global(body,html,#root)': {
    margin: 0,
    padding: 0,
    height: '100vh',
  },
} );

ReactDOM.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById( 'root' )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();