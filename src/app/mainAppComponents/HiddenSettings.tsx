import { Toggle, TextField, DefaultButton } from '@fluentui/react';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import utils from '../utils';

const HiddenSettings = ( props: any ) => {

  const { state, setState } = useGlobalState();

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

  const modeInputHandler = ( foo: any ) => {
    let newValue = Number( foo );
    setState( ( state ) => ( { ...state, appModeState: newValue } ) );
    utils.localStorageSetter( "appMode", newValue );
  }

  const settingsContainerStyle = {
    display: "grid",
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: "20px",
    outline: "1px solid white",
  }

  const settingsListItemStyle = {
    display: "grid",
  }

  return (
    <div>
      <div className="secretSettingsContent" style={settingsContainerStyle}>
        <h3>Top-Secret Settings</h3>
        <div style={settingsListItemStyle}>
          <Toggle
            label="Coming Soon - App Mode"
            defaultChecked={utils.localStorageGetter().appMode === 0 ? false : true}
            offText="Simple Mode"
            onText="Outlook Contact Mode"
            onChange={() => modeToggleSwitchHandler()}
          />
        </div>
        <div style={{ marginTop: -5, display: "grid", maxWidth: 80 }}>
          <TextField
            label="App Mode"
            defaultValue={utils.localStorageGetter().appMode}
            onChange={( error, newValue ) => modeInputHandler( newValue )}
          />
        </div>
        <div style={settingsListItemStyle}>
          <TextField label="Custom Theme JSON" disabled placeholder='Coming Eventually' multiline rows={15} resizable={false} />
        </div>
        <div style={settingsListItemStyle}>
          <DefaultButton
            text='Hide Secret Settings'
            onClick={() => setState( ( state ) => ( { ...state, secretSettingsOpenState: !state.secretSettingsOpenState } ) )}
          />
        </div>
      </div>
    </div>
  )
}

export default HiddenSettings