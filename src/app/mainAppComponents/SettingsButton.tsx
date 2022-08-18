import { TooltipHost, IconButton, IIconProps } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import SettingsPanel from './SettingsPanel';


export const SettingsButton = ( props: any ) => {

  const { globalState, setGlobalState } = useGlobalState();

  const settingsButtonHandler = () => {
    if ( globalState.settingsPanelOpenState === false ) {
      setGlobalState( ( globalState ) => ( { ...globalState, settingsPanelOpenState: true } ) );
    } else {
      setGlobalState( ( globalState ) => ( { ...globalState, settingsPanelOpenState: false } ) );
    }

  }
  const settingsIcon: IIconProps = { iconName: 'CollapseMenu' };

  const tooltipId = useId( 'tooltip' );

  return (
    <TooltipHost
      content="Settings"
      id={tooltipId}
      setAriaDescribedBy={false}
      styles={{
        root: { display: 'inline-block' }
      }}
    >
      <SettingsPanel />
      <IconButton iconProps={settingsIcon} aria-label="Settings" onClick={settingsButtonHandler} />
    </TooltipHost>
  );
};