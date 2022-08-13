interface settingsItems {
  theme: string;
  appMode: number;
  msAppId?: string;
}

export interface localStorageSettingsType {
  name: string;
  Settings: settingsItems;
}

export const defaultLocalStorageSettings: localStorageSettingsType = {
    name: "Settings",
    Settings: {
      theme: "dark",
      appMode: 0,
    },
  };
