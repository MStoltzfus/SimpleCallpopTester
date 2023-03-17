import Error from "./Error/Error";
import SimpleGenerator from "./SimpleGenerator/SimpleGenerator";
import OutlookContactsConnector from "./OutlookContactsConnector/OutlookContactsConnector";
import Info from "./Info/Info";
import SmsComponent from "./SmsComponent/SmsComponent";
import ContactNotes from "./ContactNotes/ContactNotesComponent";

export {
    Error,
    Info,
    SimpleGenerator,
    OutlookContactsConnector,
    SmsComponent,
    ContactNotes
};

export enum modeDefinitions {
    simpleGenerator = 0,
    outlookContactsConnector = 1,
    errorComponentTest = 2,
    infoComponentTest = 3,
    smsComponent = 4,
    ContactNotesComponent = 5,
}