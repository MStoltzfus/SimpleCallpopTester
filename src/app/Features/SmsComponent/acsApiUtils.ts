import { SmsClient } from '@azure/communication-sms';

// This code retrieves your connection string
// from an environment variable.
//@ts-ignore
const connectionString = import.meta.env.VITE_COMMUNICATION_SERVICES_CONNECTION_STRING;

// Instantiate the SMS client.
const smsClient = new SmsClient(connectionString);

async function sendSms(callerNumber:string, messageText:string) {
    const sendResults = await smsClient.send({
    //@ts-ignore
      from: import.meta.env.VITE_COMMUNICATION_SERVICES_PHONE_NUMBER,
      to: [callerNumber],
      message: messageText
    });
  
    // Individual messages can encounter errors during sending.
    // Use the "successful" property to verify the status.
    for (const sendResult of sendResults) {
      if (sendResult.successful) {
        console.log("Success: ", sendResult);
        alert('Message Sent Successfully!')
      } else {
        console.error("Something went wrong when trying to send this message: ", sendResult);
        alert('There was an error. Check the browser console for more information.')
      }
    }
  }
  

  export { 
    sendSms
  }