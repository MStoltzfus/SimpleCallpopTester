import { Stack, TextField } from '@fluentui/react';
import { stackStyles, stackTokens, mainContentStyle } from '../../styles'; // import the styles from the styles file
import utils from '../../utils';

const OutlookContactsConnector = () => {

  let searchParams = utils.getAllUrlParams(); //Calls the method to get URL Search Params and create an easy to work with array from them

  const inputChange = ( event: React.ChangeEvent<HTMLInputElement>, newValue?:string ) => {
    console.log( newValue );
  };

  const debouncedInputChange = () => { utils.debounce( inputChange, 1000 ); };

  return <div style={mainContentStyle}>
    <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
    </Stack>
  </div>
}

export default OutlookContactsConnector