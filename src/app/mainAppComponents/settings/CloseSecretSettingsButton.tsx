import { TooltipHost, IconButton, IIconProps } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { useGlobalState } from '../../../GlobalState/GlobalStateProvider';


export const CloseSecretSettingsButton = ( props: any ) => {

  const { globalState, setGlobalState } = useGlobalState();

  const settingsButtonHandler = () => {
    setGlobalState( ( globalState ) => ( { ...globalState, secretSettingsOpenState: !globalState.secretSettingsOpenState } ) );
  }
  const closeSecSettingsIcon: IIconProps = { iconName: 'ChromeClose' };

  const tooltipId = useId( 'tooltip' );

  return (
    <TooltipHost
      content="Close Secret Settings"
      id={tooltipId}
      setAriaDescribedBy={false}
      styles={{
        root: { display: 'inline-block' }
      }}
    >
      <IconButton iconProps={closeSecSettingsIcon} aria-label="Settings" onClick={settingsButtonHandler} />
    </TooltipHost>
  );
};