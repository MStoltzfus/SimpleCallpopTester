import { Toggle, TextField, Panel } from '@fluentui/react';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import utils from '../utils';

const SettingsPanel = ( props: any ) => {

  const { state, setState } = useGlobalState();


  const themeToggleSwitchHandler = () => {
    if ( state.appThemeState === "dark" ) {
      setState( ( state ) => ( { ...state, appThemeState: utils.checkThemeSetting() } ) );
      localStorage.setItem( "theme", "light" );
    }
    else if ( state.appThemeState === "light" ) {
      setState( ( state ) => ( { ...state, appThemeState: utils.checkThemeSetting() } ) );
      localStorage.setItem( "theme", 'dark' );
    }
    window.location.reload();
  };

  const pageToggleSwitchHandler = () => {
    if ( state.appModeState === 0 ) {
      return setState( ( state ) => ( { ...state, appModeState: 1 } ) );
    } else {
      return setState( ( state ) => ( { ...state, appModeState: 0 } ) );
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
          defaultChecked={utils.checkThemeSetting() === 'dark' ? false : true}
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