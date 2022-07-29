import { TooltipHost, IconButton, IIconProps, initializeIcons, Panel } from '@fluentui/react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { SettingsPanel } from './SettingsPanel';


export const SettingsButton = ( props: any ) => {

  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean( false );

  initializeIcons(); // Initialize icons in case this example uses them
  const settingsIcon: IIconProps = { iconName: 'Settings' };

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
      <Panel
        headerText="Settings"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <SettingsPanel/>
      </Panel>
      <IconButton iconProps={settingsIcon} aria-label="Settings" onClick={openPanel} />
    </TooltipHost>
  );
};