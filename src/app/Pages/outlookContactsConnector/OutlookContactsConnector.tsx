import { Login } from '@microsoft/mgt-react';
import { Stack, TextField } from '@fluentui/react';
import { stackStyles, stackTokens, mainContentStyle } from '../../styles'; // import the styles from the styles file
import utils from '../../utils';

const OutlookContactsConnector = () => {

  let searchParams = utils.getAllUrlParams(); //Calls the method to get URL Search Params and create an easy to work with array from them

  let msAppId = utils.localStorageGetter().msAppId; //Get the msAppId from local storage  }

  utils.isValidMsGuid(msAppId);


  const inputChange = ( event: React.ChangeEvent<HTMLInputElement>, newValue?: string ) => {
    console.log( newValue );
  };

  const loginButtonTheme = () => {
    const theme = utils.localStorageGetter().theme;
    return theme === "dark" ? "mgt-dark" : "mgt-light";
  };

  return (
    <>
      <div style={{ margin:'15px', display:'flex', justifyContent:'center'}}>
        {utils.isValidMsGuid(msAppId) ? <Login className={loginButtonTheme()}/> : null }
      </div>
      <div style={mainContentStyle}>
        <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
          <TextField />
          <TextField />
          <TextField />
          <TextField />
          <TextField />
          <TextField />
        </Stack>
      </div>
    </>
  );
}

export default OutlookContactsConnector