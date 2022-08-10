import { Toggle, Panel, TextField } from '@fluentui/react';
import HiddenSettings from './HiddenSettings';
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

  const secretSettingsDivHandler = () => {
    setState( ( state ) => ( { ...state, secretSettingsOpenState: !state.secretSettingsOpenState } ) );
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
      isLightDismiss={true}
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
        <div
          className='hiddenSettingsPanel'
          style={{
            height: '30px',
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '30px',
          }}
          onClick={secretSettingsDivHandler}
        />
        {state.secretSettingsOpenState ? <HiddenSettings /> : null}
      </div>
    </Panel>
  )
}

export default SettingsPanel