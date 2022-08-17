import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/App';
import { mergeStyles, initializeIcons } from '@fluentui/react';
import { GlobalStateProvider } from './GlobalState/GlobalStateProvider';
import utils from './app/utils';

//import reportWebVitals from './reportWebVitals';

// Inject some global styles
mergeStyles( {
  ':global(body,html,#root)': {
    margin: 0,
    padding: 0,
    height: '100vh',
  },
} );

utils.localStorageDefaultsSetter(); //Set the default values for the local storage
initializeIcons(); // Initialize icons in case this example uses them

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
