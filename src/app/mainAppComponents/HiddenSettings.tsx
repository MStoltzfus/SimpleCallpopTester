import { useRef, useCallback } from 'react';
import { Toggle, TextField, DefaultButton, ComboBox, IComboBox, IComboBoxOption, IComboBoxStyles, SelectableOptionMenuItemType } from '@fluentui/react';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import { useSettingsChange, useModeChange } from '../customHooks';
import { modeDefinitions } from '../Pages/Pages';
import utils from '../utils';


const HiddenSettings = ( props: any ) => {

  const { state, setState } = useGlobalState();

  const comboBoxRef = useRef<IComboBox>( null );
  const onOpenClick = useCallback( () => comboBoxRef.current?.focus( true ), [] );

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
    padding: 8,
  }

  return (
    <div>
      <div className="secretSettingsContent" style={settingsContainerStyle}>
        <h3>Top-Secret Settings</h3>
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
        <div style={settingsListItemStyle}>
          <TextField label="Custom Theme JSON" disabled placeholder='Coming Eventually' multiline rows={15} resizable={false} />
        </div>
        <div style={settingsListItemStyle}>
          <button style={{ height: 30, width: '75%' }} onClick={useSettingsChange( 'theme' )}>Setting Test Button</button>
        </div>
        <div style={settingsListItemStyle}>
          <DefaultButton
            text='Hide Secret Settings'
            onClick={() => setState( ( state ) => ( { ...state, secretSettingsOpenState: 0 } ) )}
          />
        </div>
      </div>
    </div>
  )
}

export default HiddenSettings