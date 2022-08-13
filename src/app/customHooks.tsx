import { useGlobalState, GlobalStateInterface } from "../GlobalState/GlobalStateProvider";

type SettingsChangeProps = {
    setting: string;
    value: keyof GlobalStateInterface;
}

const useSettingsChange = (setting:string, value:SettingsChangeProps) => {
  return (
    <div>customHooks</div>
  )
}

export { useSettingsChange };