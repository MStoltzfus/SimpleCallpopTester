import { useState } from 'react';
import { Toggle, Panel } from '@fluentui/react';
import HiddenSettings from './HiddenSettings';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import utils from '../utils';
import { useSettingsChange } from '../customHooks';

const SettingsPanel = ( props: any ) => {

  const { state, setState } = useGlobalState();

  const secretSettingsDivHandler = () => {
    let count = state.secretSettingsOpenState;
    //@ts-ignore - The state of this number is set on App.tsx and is not a string.
    count !== 5 ? setState( ( state ) => ( { ...state, secretSettingsOpenState: count + 1 } ) ) : setState( ( state ) => ( { ...state, secretSettingsOpenState: 0 } ) );
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
            onChange={useSettingsChange('theme')}
          />
        </div>
        <div style={settingsListItemStyle}>
          {/*<TextField label="Custom Theme JSON" disabled placeholder='Coming Eventually' multiline rows={15} resizable={false} />*/}
        </div>
        <div
          contentEditable={false}
          className='hiddenSettingsButton'
          style={{
            height: '30px',
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '30px',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
          onClick={secretSettingsDivHandler}
        />
        {state.secretSettingsOpenState === 5 ? <HiddenSettings /> : null}
      </div>
    </Panel>
  )
}

export default SettingsPanel