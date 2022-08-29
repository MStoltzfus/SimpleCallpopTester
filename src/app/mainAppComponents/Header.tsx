import { Stack, Text, ThemeProvider } from '@fluentui/react';
import { headerStackStyles, headerItemStyles } from '../styles';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import { SettingsButton } from './settings/SettingsButton';
import themes from '../themes';

export const Header = ( props: any ) => {
  const { globalState } = useGlobalState();

  return (
    <header>
      <ThemeProvider applyTo={"element"} theme={themes.header}>
        <Stack horizontal horizontalAlign="space-between" styles={globalState.appThemeState === "dark" ? headerStackStyles.darkTheme : headerStackStyles.lightTheme}>
          <span style={headerItemStyles}></span>
          <div style={headerItemStyles}>
            <Text className="appTitle" variant={'xLarge'}> {props.appName} </Text>
          </div>
          <span style={headerItemStyles}>
            <SettingsButton />
          </span>
        </Stack>
      </ThemeProvider>
    </header >
  );
};
