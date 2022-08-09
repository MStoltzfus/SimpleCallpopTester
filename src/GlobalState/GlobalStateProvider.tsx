import React, { createContext, useState, useContext, Dispatch, SetStateAction } from "react";
import { palleteItemTypes } from '../app/themes.types';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// \/ Add any new state values to the interface here \/
interface GlobalStateInterface {
  appThemeState: string;
  settingsPanelOpenState: boolean;
  secretSettingsPanelOpenState: boolean;
  appModeState: number;
  themePaletteState: palleteItemTypes;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const GlobalStateContext = createContext( {
  state: {} as Partial<GlobalStateInterface>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
} );

const GlobalStateProvider = ( {
  children,
  value = {} as GlobalStateInterface,
}: {
  children: React.ReactNode;
  value?: Partial<GlobalStateInterface>;
} ) => {
  const [state, setState] = useState( value );
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
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