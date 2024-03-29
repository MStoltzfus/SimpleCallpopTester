import { defaultLocalStorageSettings } from "./localStorage.types";
import { Providers, ProviderState } from "@microsoft/mgt-react";

function saveLocalSettings(input: any) {
  localStorage.setItem("Settings", JSON.stringify(input));
}

const utils = {
  getAllUrlParams(url?: string) {
    //Code from https://www.sitepoint.com/get-url-parameters-with-javascript/

    // get query string from url (optional) or window
    var encodedQueryString: string | null | undefined = url
      ? url.split("?")[1]
      : window.location.search.slice(1);

    // we'll decode the URI here first
    var queryString = decodeURIComponent(encodedQueryString);

    // we'll store the parameters here
    var obj: any = {};

    // if query string exists
    if (queryString) {
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split("#")[0];

      // split our query string into its component parts
      var arr: string[] = queryString.split("&");

      for (var i: number = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a: any = arr[i].split("=");

        // set parameter name and value (use 'true' if empty)
        var paramName: string = a[0];
        var paramValue: string =
          typeof a[1] === "undefined" ? "No Param Value Provided" : a[1];

        /* (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === "string")
          paramValue = paramValue.toLowerCase();
        */

        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, "");
          if (!obj[key]) obj[key] = [];

          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            // @ts-ignore
            var index: string = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === "string") {
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
      let out = Object.entries(obj).map(([k, v]) => ({ key: k, value: v }));

      return out;
    }
  },
  isAppNameInUrl() {
    let params = new URLSearchParams(document.location.search);
    if (params.has("appName")) {
      return params.get("appName");
    } else {
      return "Michael's URL Param Tester";
    }
  },
  localStorageGetter() {
    let settings = localStorage.getItem("Settings");
    if (settings !== null) {
      let parsedSettings = JSON.parse(settings);
      return parsedSettings;
    } else {
      console.error(
        "No settings found in local storage - THIS SHOULDN'T HAPPEN"
      );
    }
  },
  localStorageDefaultsSetter() {
    let settings = localStorage.getItem("Settings");
    if (settings === null || undefined) {
      localStorage.setItem(
        defaultLocalStorageSettings.name,
        JSON.stringify(defaultLocalStorageSettings.Settings)
      );
    }
  },
  localStorageSetter(settingKey: string, settingValue: string | number) {
    let settings = this.localStorageGetter();
    if (settings !== null || undefined) {
      switch (settingKey) {
        case "theme":
          settings.theme = settingValue;
          saveLocalSettings(settings);
          break;
        case "appMode":
          settings.appMode = settingValue;
          saveLocalSettings(settings);
          break;
        case "msAppId":
          settings.msAppId = settingValue;
          saveLocalSettings(settings);
          break;
        case "numberNormalizationRule":
          settings.numberNormalizationRule = settingValue;
          saveLocalSettings(settings);
          break;
        case "acsConnectionString":
          settings.acsConnectionString = settingValue;
          saveLocalSettings(settings);
          break;
        case "acsPhoneNumber":
          settings.acsPhoneNumber = settingValue;
          saveLocalSettings(settings);
          break;
        default:
          alert("invalid setting");
      }
      return console.log("updated settings: ", settings);
    }
    return console.error("settings storage error");
  },
  isValidMsGuid(str: string) {
    const regEx: RegExp =
      /^[{]?[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/;
    return regEx.test(str);
  },
  debounce: <T extends (...args: any[]) => ReturnType<T>>(
    callback: T,
    timeout: number
  ): ((...args: Parameters<T>) => void) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, timeout);
    };
  },
  async getMsalToken() {
    if (Providers.globalProvider.state === ProviderState.SignedIn) {
      const token = await Providers.globalProvider.getAccessToken({
        scopes: ["User.Read"],
      });
      return token;
    }
  },
};

export default utils;
