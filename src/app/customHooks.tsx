import { useGlobalState, GlobalStateInterface } from "../GlobalState/GlobalStateProvider";
import utils from "./utils";
import { settingsItems } from './localStorage.types';


const useSettingsChange = ( setting: keyof settingsItems, value?: number | string | undefined ) => {

    const { state, setState } = useGlobalState();

    const themeChangeHandler = () => {
        if ( state.appThemeState === "dark" ) {
            let updatedState: string = "light";
            setState( ( state ) => ( { ...state, appThemeState: updatedState } ) );
            utils.localStorageSetter( "theme", updatedState );
        } else {
            let updatedState: string = "dark";
            setState( ( state ) => ( { ...state, appThemeState: updatedState } ) );
            utils.localStorageSetter( "theme", updatedState );
        }
    }

    const modeChangeHandler = ( input: number | string | undefined ) => {
        let newValue = Number( input );
        setState( ( state ) => ( { ...state, appModeState: newValue } ) );
        utils.localStorageSetter( "appMode", newValue );
      }

    return (value:any) => {
        switch ( setting ) {
            case 'theme':
                themeChangeHandler();
                break;

            case 'appMode':
                modeChangeHandler( value );
                break;
            case 'msAppId':

                break;
            case 'themePalette':

                break;
        }
    }
}

const useModeChange = ( value: number | string | undefined ) => {

    const { state, setState } = useGlobalState();

    const modeChangeHandler = ( input: number | string | undefined ) => {
        let newValue = Number( input );
        setState( ( state ) => ( { ...state, appModeState: newValue } ) );
        utils.localStorageSetter( "appMode", newValue );
      }

    return (value:any) => {
        modeChangeHandler( value );
    }
}

export { useSettingsChange, useModeChange };