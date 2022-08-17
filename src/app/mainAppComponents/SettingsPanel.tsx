import { useRef } from 'react';
import { Toggle, Panel } from '@fluentui/react';
import HiddenSettings from './HiddenSettings';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import utils from '../utils';
import { useSettingsChange } from '../customHooks';

const SettingsPanel = ( props: any ) => {

  const { state, setState } = useGlobalState();
  const secretSettingsRef = useRef( 0 ); //look at us using a ref to cut down on unnecessary re-renders!!!

  const secretSettingsDivHandler = () => { //this is the furthest thing from a pure function, but we're throwing stuff together rn 🤷‍♂️🤷‍♂️
    if (secretSettingsRef.current !== 5) {
      secretSettingsRef.current = secretSettingsRef.current + 1;
    } else {
      secretSettingsRef.current = 0;
    }
    secretSettingsRef.current === 5 ?
      setState( ( state ) => ( { ...state, secretSettingsOpenState: true } ) ) :
      setState( ( state ) => ( { ...state, secretSettingsOpenState: false } ) );
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
            onChange={useSettingsChange( 'theme' )}
          />
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
        {state.secretSettingsOpenState ? <HiddenSettings /> : null}
      </div>
    </Panel>
  )
}

export default SettingsPanel