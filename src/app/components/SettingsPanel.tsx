import { Toggle, TextField } from '@fluentui/react';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import utils from '../utils';

export const SettingsPanel: React.FunctionComponent = () => {
  const { state, setState } = useGlobalState();


  const themeToggleSwitchHandler = () => {
    if ( state.theme === "dark" ) {
      setState( ( state ) => ( { ...state, theme: utils.checkThemeSetting() } ) );
      localStorage.setItem( "theme", "light" );
    }
    else if ( state.theme === "light" ) {
      setState( ( state ) => ( { ...state, theme: utils.checkThemeSetting() } ) );
      localStorage.setItem( "theme", 'dark' );
    }
    window.location.reload();
  };

  const toggleState = () => {
    if ( utils.checkThemeSetting() === "dark" ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div style={{ paddingTop: "25px" }}>
      <Toggle
        label="Theme"
        inlineLabel
        defaultChecked={toggleState()}
        offText="🌒 Mode"
        onText="🔆 Mode"
        onChange={() => themeToggleSwitchHandler()}
      />
      <TextField label="Custom Theme JSON" multiline rows={15} resizable={false} />
    </div>
  );
};
