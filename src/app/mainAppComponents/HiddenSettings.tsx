import { useRef, useCallback } from 'react';
import { TextField, ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import { useSettingsChange, useModeChange } from '../customHooks';
import { modeDefinitions } from '../Pages/Pages';
import utils from '../utils';
import { CloseSecretSettingsButton } from './CloseSecretSettingsButton';
import { MsAppIdForm } from './FormTest';


const HiddenSettings = ( props: any ) => {

  const { globalState, setGlobalState } = useGlobalState();

  const comboBoxRef = useRef<IComboBox>( null );

  const modeInputHandler = ( foo: any ) => {
    let newValue = Number( foo );
    setGlobalState( ( globalState ) => ( { ...globalState, appModeState: newValue } ) );
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
    padding: 8,
  }

  return (
    <div>
      <div className="secretSettingsContent" style={settingsContainerStyle}>
        <div className='SecretSettingsHeader' style={{ display: 'flex', placeContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ display: 'inline-flex' }}>Top-Secret Settings</h3>
          <CloseSecretSettingsButton />
        </div>
        {/*<div style={{ marginTop: -5, display: "grid", maxWidth: 80 }}>
          <TextField
            label="App Mode"
            defaultValue={utils.localStorageGetter().appMode}
            onChange={( event, newValue ) => modeInputHandler( newValue )}
          />
        </div>*/}
        <div style={{ display: "grid", maxWidth: '75%' }}>
          <ComboBox
            componentRef={comboBoxRef}
            defaultSelectedKey={utils.localStorageGetter().appMode}
            label="App Mode"
            options={[
              { key: modeDefinitions.simpleGenerator, text: 'Basic' },
              { key: modeDefinitions.outlookContactsConnector, text: 'Outlook Contacts' },
              { key: modeDefinitions.errorComponentTest, text: 'Error Test' },
            ]}
            onItemClick={( event: React.FormEvent<IComboBox>, option?: IComboBoxOption ) => { modeInputHandler( option?.key ) }}
          />
        </div>
        {globalState.appModeState === 1 ? <MsAppIdForm /> : null}
        <div style={settingsListItemStyle}>
          <TextField label="Custom Theme JSON" disabled placeholder='Coming Eventually' multiline rows={15} resizable={false} />
        </div>
        <div style={settingsListItemStyle}>
          <button style={{ height: 30, width: '75%' }} onClick={useSettingsChange( 'theme' )}>Setting Test Button</button>
        </div>
      </div>
    </div>
  )
}

export default HiddenSettings