import { Stack, Text } from '@fluentui/react';
import { headerStackStyles, headerItemStyles } from '../styles';
import { SettingsButton } from './SettingsButton';

export const Header = ( props: any ) => {
  return (
    <Stack horizontal horizontalAlign="space-between" styles={headerStackStyles}>
      <span style={headerItemStyles}></span>
      <span style={headerItemStyles}>
        <Text className="appTitle" variant={'xLarge'}> {props.appName} </Text>
      </span>
      <span style={headerItemStyles}>
        <SettingsButton />
      </span>
    </Stack>
  );
};
