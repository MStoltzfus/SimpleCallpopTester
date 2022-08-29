import { DefaultButton, ISearchBoxStyles, TextField } from '@fluentui/react';
import { mainContentStyle } from '../../styles'; // import the styles from the styles file
import utils from '../../utils';
import { UnderConstructionHeader } from '../../sharedComponents/UnderConstructionHeader';
import { useCallback, useState } from 'react';
import { useGlobalState } from '../../../GlobalState/GlobalStateProvider';
import { sendSms } from './acsApiUtils';

export const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

const SmsComponent: React.FunctionComponent = () => {

  const [messageInput, setMessageInput] = useState( '' );
  //const { globalState, setGlobalState } = useGlobalState();

  let params = new URLSearchParams(document.location.search);
  let number = '+' + params.get('callernumber');

  console.log(number)

  const onInputChange = useCallback(
    ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ) => {
      setMessageInput( newValue || '' );
    },
    [],
  );

  const handleSubmit = ( e: { preventDefault: () => void; } ) => {
    e.preventDefault();
    sendSms(number, messageInput)
  }

  console.log(params)

  return (
    <>
      <div
        className='smsParent'
        style={{
          display: 'grid',
          alignContent: 'center',
          justifyContent: 'center',
          justifyItems: 'center'
        }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <h3>ACS SMS Tester</h3>
        </div>
        <p style={{width:'75%'}}>This App Mode lets you send a text to the "callernumber" parameter taken from the callpop URL</p>
        <form className='msAppIdForm' onSubmit={handleSubmit}>
          <div className='form-control' style={{ width: '100%', paddingBottom:'1rem'}}>
            <TextField
              label='Message'
              type='text'
              id='messageInput'
              name='messageInput'
              value={messageInput}
              onChange={onInputChange}
              placeholder='Enter Your Message Here'
            />
          </div>
          <DefaultButton type='submit' text="Send" />
        </form>
      </div>
    </>
  );
}

export default SmsComponent