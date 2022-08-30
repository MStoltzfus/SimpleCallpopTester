import { useRef, useCallback } from 'react';
import { TextField, ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react';
import { useGlobalState } from '../../../GlobalState/GlobalStateProvider';
import { useSettingsChange, useModeChange } from '../../customHooks';
import { modeDefinitions } from '../../Features/Features';
import utils from '../../utils';
import { CloseSecretSettingsButton } from './CloseSecretSettingsButton';
import { MsAppIdForm } from '../../sharedComponents/MsAppIdForm';
import { PhoneRegexForm } from './PhoneRegExForm';

//@ts-ignore
const tempV = import.meta.env

const SecretSettings = ( props: any ) => {

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
    paddingTop: 8,
    paddingBottom: 5,
    marginTop: 5,
  }

  return (
    <div>
      <div className="secretSettingsContent" style={settingsContainerStyle}>
        <div className='SecretSettingsHeader' style={{ display: 'flex', placeContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ display: 'inline-flex' }}>Top-Secret Settings</h3>
          <CloseSecretSettingsButton />
        </div>
        <div className='AppModeSelector' style={{ display: "grid", maxWidth: '75%', marginBottom: '10px' }}>
          <ComboBox
            componentRef={comboBoxRef}
            defaultSelectedKey={utils.localStorageGetter().appMode}
            label="App Mode"
            options={[
              { key: modeDefinitions.simpleGenerator, text: '1. Basic Param Tester' },
              { key: modeDefinitions.outlookContactsConnector, text: '2. Outlook Contacts' },
              { key: modeDefinitions.errorComponentTest, text: '3. Error Test' },
              { key: modeDefinitions.infoComponentTest, text: '4. Info Test' },
              { key: modeDefinitions.smsComponent, text: '4. SMS' },
            ]}
            onItemClick={( event: React.FormEvent<IComboBox>, option?: IComboBoxOption ) => { modeInputHandler( option?.key ) }}
          />
        </div>
        {globalState.appModeState === 1 ?
          <div style={settingsListItemStyle}>
            <div style={{ paddingTop: '2px', paddingBottom: '10px', borderTop: '1px solid whitesmoke', borderBottom: '1px solid whitesmoke' }}>
              <MsAppIdForm />
            </div>
          </div>
          : null}
          {globalState.appModeState === 4 ?
          <div style={settingsListItemStyle}>
            <div style={{ paddingTop: '2px', paddingBottom: '10px', borderTop: '1px solid whitesmoke', borderBottom: '1px solid whitesmoke' }}>
            <PhoneRegexForm />
            </div>
          </div>
          : null}
        <div style={settingsListItemStyle}>
          <TextField label="Custom Theme JSON" disabled placeholder='Coming Eventually' multiline rows={15} resizable={false} />
        </div>
        <div style={settingsListItemStyle}>
          <button style={{ height: 30, width: '75%' }} onClick={() => alert( 'you clicked a button lol' )}>Setting Test Button</button>
          <button style={{ height: 30, width: '75%' }} onClick={() => console.log(tempV)}>Env Vars Test Button</button>
        </div>
      </div>
    </div>
  )
}

export default SecretSettings