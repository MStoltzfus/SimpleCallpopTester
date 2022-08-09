import { Toggle, Panel, TextField } from '@fluentui/react';
import { settings } from 'cluster';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import utils from '../utils';

const SettingsPanel = ( props: any ) => {

  const { state, setState } = useGlobalState();


  const themeToggleSwitchHandler = () => {
    if ( state.appThemeState === "dark" ) {
      let updatedState: string = "light";
      setState( ( state ) => ( { ...state, appThemeState: updatedState } ) );
      utils.localStorageSetter( "theme", updatedState );
    } else {
      let updatedState: string = "dark";
      setState( ( state ) => ( { ...state, appThemeState: updatedState } ) );
      utils.localStorageSetter( "theme", updatedState );
    }
    window.location.reload();
  };

  const modeToggleSwitchHandler = () => {
    if ( state.appModeState === 0 ) {
      let updatedState: number = 1;
      setState( ( state ) => ( { ...state, appModeState: updatedState } ) );
      utils.localStorageSetter( "appMode", updatedState );
    } else {
      let updatedState: number = 0;
      setState( ( state ) => ( { ...state, appModeState: updatedState } ) );
      utils.localStorageSetter( "appMode", updatedState );
    }
  };

  const modeInputHandler = ( event: any, newValue: number ) => {

  }

  const settingsContainerStyle = {
    display: "grid",
    paddingTop: "25px",
  }

  const settingsListItemStyle = {
    margin: 5,
    display: "flex",
  }

  return (
    <Panel
      headerText="Settings"
      isOpen={state.settingsPanelOpenState}
      onDismiss={() => setState( ( state ) => ( { ...state, settingsPanelOpenState: !state.settingsPanelOpenState } ) )}
      closeButtonAriaLabel="Close"
    >
      <div className="settingsPanelContent" style={settingsContainerStyle}>
        <div style={settingsListItemStyle}>
          <Toggle
            label="Theme"
            inlineLabel
            defaultChecked={utils.localStorageGetter().theme === 'dark' ? false : true}
            offText="🌒 Mode"
            onText="🔆 Mode"
            onChange={() => themeToggleSwitchHandler()}
          />
        </div>
        <div style={settingsListItemStyle}>
          {/*<TextField label="Custom Theme JSON" disabled placeholder='Coming Eventually' multiline rows={15} resizable={false} />*/}
        </div>
      </div>
    </Panel>
  )
}

export default SettingsPanel