import Error from "./error/Error";
import SimpleGenerator from "./simpleGenerator/SimpleGenerator";
import OutlookContactsConnector from "./outlookContactsConnector/OutlookContactsConnector";

export { Error, SimpleGenerator, OutlookContactsConnector };

export enum modeDefinitions  {
    simpleGenerator = 0,
    outlookContactsConnector = 1,
    errorComponentTest = 2,
}