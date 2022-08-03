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
    if ( state.appThemeState === "dark" ) {
      setState( ( state ) => ( { ...state, appThemeState: utils.checkThemeSetting() } ) );
      localStorage.setItem( "theme", "light" );
    }
    else if ( state.appThemeState === "light" ) {
      setState( ( state ) => ( { ...state, appThemeState: utils.checkThemeSetting() } ) );
      localStorage.setItem( "theme", 'dark' );
    }
  };

  const themeToggleState = () => {
    if ( utils.checkThemeSetting() === "dark" ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Panel
      headerText="Settings"
      isOpen={props.isOpen}
      onDismiss={props.onDismiss}
      // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
      closeButtonAriaLabel="Close"
    >
      <div style={{ paddingTop: "25px" }}>
        <Toggle
          label="Theme"
          inlineLabel
          defaultChecked={themeToggleState()}
          offText="🌒 Mode"
          onText="🔆 Mode"
          onChange={() => themeToggleSwitchHandler()}
        />
        <Toggle
          label="Outlook Mode"
          inlineLabel
          offText="Simple Mode"
          onText="Outlook Contact Mode"
          onChange={() => pageToggleSwitchHandler()}
        />
        <TextField label="Custom Theme JSON" multiline rows={15} resizable={false} />
      </div>
    </Panel>
  )
}

export default SettingsPanel
