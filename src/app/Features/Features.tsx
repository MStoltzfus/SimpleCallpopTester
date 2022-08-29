import Error from "./Error/Error";
import SimpleGenerator from "./SimpleGenerator/SimpleGenerator";
import OutlookContactsConnector from "./OutlookContactsConnector/OutlookContactsConnector";
import Info from "./Info/Info";

export {
    Error,
    SimpleGenerator,
    OutlookContactsConnector,
    Info
};

export enum modeDefinitions {
    simpleGenerator = 0,
    outlookContactsConnector = 1,
    errorComponentTest = 2,
    infoComponentTest = 3,
    smsComponent = 4,
}