import Error from "./error/Error";
import SimpleGenerator from "./simpleGenerator/SimpleGenerator";
import OutlookContactsConnector from "./outlookContactsConnector/OutlookContactsConnector";
import Info from "./info/Info";

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
}