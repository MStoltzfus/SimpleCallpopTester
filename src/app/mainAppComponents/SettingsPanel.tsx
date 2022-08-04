import { Toggle, TextField, Panel } from '@fluentui/react';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import utils from '../utils';

const SettingsPanel = ( props: any ) => {

  const { state, setState } = useGlobalState();


  const themeToggleSwitchHandler = () => {
    if ( state.appThemeState === "dark" ) {
      setState( ( state ) => ( { ...state, appThemeState: 'light' } ) );
      localStorage.setItem( "Settings", JSON.stringify( {
        name: "Settings",
        Settings: {
          theme: "light",
          appMode: state.appModeState,
        },
      }
      ) );
      localStorage.setItem( "Settings", JSON.stringify( { theme: 'light' } ) );
    }
    else if ( state.appThemeState === "light" ) {
      setState( ( state ) => ( { ...state, appThemeState: 'dark' } ) );
      localStorage.setItem( "Settings", JSON.stringify( {
        name: "Settings",
        Settings: {
          theme: "dark",
          appMode: state.appModeState,
        },
      }
      ) );
    }
    window.location.reload();
  };

  const pageToggleSwitchHandler = () => {
    if ( state.appModeState === 0 ) {
      setState( ( state ) => ( { ...state, appModeState: 1 } ) );
      localStorage.setItem( "Settings", JSON.stringify( {
        name: "Settings",
        Settings: {
          theme: state.appThemeState,
          appMode: 1,
        },
      }
      ) );
    } else {
      setState( ( state ) => ( { ...state, appModeState: 0 } ) );
      localStorage.setItem( "Settings", JSON.stringify( {
        name: "Settings",
        Settings: {
          theme: state.appThemeState,
          appMode: 0,
        },
      }
      ) );
    }
  };

  return (
    <Panel
      headerText="Settings"
      isOpen={state.settingsPanelOpenState}
      onDismiss={() => setState( ( state ) => ( { ...state, settingsPanelOpenState: !state.settingsPanelOpenState } ) )}
      closeButtonAriaLabel="Close"
    >
      <div style={{ paddingTop: "25px" }}>
        <Toggle
          label="Theme"
          inlineLabel
          defaultChecked={utils.localStorageGetter().theme === 'dark' ? false : true}
          offText="🌒 Mode"
          onText="🔆 Mode"
          onChange={() => themeToggleSwitchHandler()}
        />
        <Toggle
          label="Coming Soon - Callpop Mode"
          inlineLabel
          offText="Simple Mode"
          onText="Outlook Contact Mode"
          onChange={() => pageToggleSwitchHandler()}
        />
        {/*<TextField label="Custom Theme JSON" multiline rows={15} resizable={false} />*/}
      </div>
    </Panel>
  )
}

export default SettingsPanel