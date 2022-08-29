import { useEffect, useState } from "react";
import { useGlobalState, GlobalStateInterface } from "../GlobalState/GlobalStateProvider";
import utils from "./utils";
import { settingsItems } from './localStorage.types';
import { Providers, ProviderState } from "@microsoft/mgt-react";


const useSettingsChange = ( setting: keyof settingsItems, value?: number | string | undefined ) => {

    const { globalState, setGlobalState } = useGlobalState();

    const themeChangeHandler = () => {
        if ( globalState.appThemeState === "dark" ) {
            let updatedState: string = "light";
            setGlobalState( ( globalState ) => ( { ...globalState, appThemeState: updatedState } ) );
            utils.localStorageSetter( "theme", updatedState );
        } else {
            let updatedState: string = "dark";
            setGlobalState( ( globalState ) => ( { ...globalState, appThemeState: updatedState } ) );
            utils.localStorageSetter( "theme", updatedState );
        }
    }

    const modeChangeHandler = ( input: number | string | undefined ) => {
        let newValue = Number( input );
        setGlobalState( ( globalState ) => ( { ...globalState, appModeState: newValue } ) );
        utils.localStorageSetter( "appMode", newValue );
    }

    const msAppIdChangeHandler = ( input: string ) => {
        let newValue = input;
        setGlobalState( ( globalState ) => ( { ...globalState, msAppIdState: newValue } ) );
        utils.localStorageSetter( "msAppId", newValue );
    }

    return ( value: any ) => {
        switch ( setting ) {
            case 'theme':
                themeChangeHandler();
                break;
            case 'appMode':
                modeChangeHandler( value );
                break;
            case 'msAppId':
                msAppIdChangeHandler( value );
                break;
            case 'themePalette':

                break;
        }
    }
}

const useModeChange = ( value: number | string | undefined ) => {

    const { globalState, setGlobalState } = useGlobalState();

    const modeChangeHandler = ( input: number | string | undefined ) => {
        let newValue = Number( input );
        setGlobalState( ( globalState ) => ( { ...globalState, appModeState: newValue } ) );
        utils.localStorageSetter( "appMode", newValue );
    }

    return ( value: any ) => {
        modeChangeHandler( value );
    }
}

function useIsSignedIn(): [boolean] {

    const { globalState, setGlobalState } = useGlobalState();
  
    useEffect( () => {
        const updateState = () => {
            const provider = Providers.globalProvider;
            let test = provider && provider.state === ProviderState.SignedIn
            setGlobalState( ( globalState ) => ( { ...globalState, msUserIsSignedInState: test } ) );
        };
  
        Providers.onProviderUpdated( updateState );
        updateState();
  
        return () => {
            Providers.removeProviderUpdatedListener( updateState );
          }
    }, [] );
    //@ts-ignore
    return [globalState.msUserIsSignedInState];
  }

export {
    useSettingsChange,
    useModeChange,
    useIsSignedIn,

};