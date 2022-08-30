import React, { createContext, useState, useContext, Dispatch, SetStateAction } from "react";
import { palleteItemTypes } from '../app/themes.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// \/ Add any new state values to the interface here \/
export interface GlobalStateInterface {
  appThemeState: string;
  settingsPanelOpenState: boolean;
  secretSettingsOpenState: boolean;
  appModeState: number | undefined;
  themePaletteState: palleteItemTypes;
  msUserIsSignedInState?: boolean;
  msAppIdState?: string;  //unneeded in state for now
  numberNormalizationRuleState?: string; //unneeded in state for now
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const GlobalStateContext = createContext( {
  globalState: {} as Partial<GlobalStateInterface>,
  setGlobalState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
} );

const GlobalStateProvider = ( {
  children,
  value = {} as GlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<GlobalStateInterface>;
} ) => {
  const [globalState, setGlobalState] = useState( value );
  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext( GlobalStateContext );
  if ( !context ) {
    throw new Error( "useGlobalState must be used within a GlobalStateContext" );
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };

/*
    
To provide the state to your entire React app - 
1. Add "import { GlobalStateProvider } from './GlobalStateProvider';" in your app entry (either main.tsx or index.tsx)
2. Wrap the app content with...
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
3. Then, to consume and set the state in any component, just add "import { useGlobalState } from './GlobalStateProvider';"...
4. And add "const { globalState, setGlobalState } = useGlobalState();" within the component's function.
5. Consume the state by using "state.property1", etc. as the variable.
6. Set the state by using the "setGlobalState( ( state ) => ( { ...state, property1: "foo" } ) );" format.
    
*/