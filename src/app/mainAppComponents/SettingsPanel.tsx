import { Toggle, TextField, Panel } from '@fluentui/react';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import utils from '../utils';

const SettingsPanel = ( props: any ) => {

  const { state, setState } = useGlobalState();


  const themeToggleSwitchHandler = () => {
    if ( state.appThemeState === "dark" ) {
      let updatedState:string = "light";
      setState( ( state ) => ( { ...state, appThemeState: updatedState } ) );
      utils.localStorageSetter( "theme", updatedState );
    } else {
      let updatedState:string = "dark";
      setState( ( state ) => ( { ...state, appThemeState: updatedState } ) );
      utils.localStorageSetter( "theme", updatedState );
    }
    window.location.reload();
  };

  const modeToggleSwitchHandler = () => {
    if ( state.appModeState === 0 ) {
      let updatedState:number = 1;
      setState( ( state ) => ( { ...state, appModeState: updatedState } ) );
      utils.localStorageSetter("appMode", updatedState);
    } else {
      let updatedState:number = 0;
      setState( ( state ) => ( { ...state, appModeState: updatedState } ) );
      utils.localStorageSetter("appMode", updatedState);
    }
  };

  return (
    <Panel
      headerText="Settings"
      isOpen={state.settingsPanelOpenState}
      onDismiss={() => setState( ( state ) => ( { ...state, settingsPanelOpenState: !state.settingsPanelOpenState } ) )}
      closeButtonAriaLabel="Close"
    >
      <div style={{ paddingTop: "25px" }}>
        <Toggle
          label="Theme"
          inlineLabel
          defaultChecked={utils.localStorageGetter().theme === 'dark' ? false : true}
          offText="🌒 Mode"
          onText="🔆 Mode"
          onChange={() => themeToggleSwitchHandler()}
        />
        <Toggle
          label="Coming Soon - Callpop Mode"
          inlineLabel
          defaultChecked={utils.localStorageGetter().appMode === 0 ? false : true}
          offText="Simple Mode"
          onText="Outlook Contact Mode"
          onChange={() => modeToggleSwitchHandler()}
        />
        {/*<TextField label="Custom Theme JSON" multiline rows={15} resizable={false} />*/}
      </div>
    </Panel>
  )
}

export default SettingsPanel