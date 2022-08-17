import { TooltipHost, IconButton, IIconProps } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import SettingsPanel from './SettingsPanel';


export const SettingsButton = ( props: any ) => {

  const { state, setState } = useGlobalState();

  const settingsButtonHandler = () => {
    if ( state.settingsPanelOpenState === false ) {
      setState( ( state ) => ( { ...state, settingsPanelOpenState: true } ) );
    } else {
      setState( ( state ) => ( { ...state, settingsPanelOpenState: false } ) );
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