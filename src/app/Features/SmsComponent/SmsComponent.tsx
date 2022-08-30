import { DefaultButton, ISearchBoxStyles, TextField } from '@fluentui/react';
import { mainContentStyle } from '../../styles'; // import the styles from the styles file
import utils from '../../utils';
import { UnderConstructionHeader } from '../../sharedComponents/UnderConstructionHeader';
import { useCallback, useEffect, useState } from 'react';
import { useGlobalState } from '../../../GlobalState/GlobalStateProvider';
import { sendSms } from './acsApiUtils';

export const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

const SmsComponent: React.FunctionComponent = () => {

  const [messageInput, setMessageInput] = useState( '' );
  const [numberInput, setNumberInput] = useState( '' );

  let params = new URLSearchParams( document.location.search );
  let number = '+' + params.get( 'callernumber' );

  console.log( number )

  useEffect( () => {
    setNumberInput(number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const onMessageInputChange = useCallback(
    ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ) => {
      setMessageInput( newValue || '' );
    },
    [],
  );

  const onNumberInputChange = useCallback(
    ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ) => {
      setNumberInput( newValue || '' );
    },
    [],
  );

  const handleSubmit = ( e: { preventDefault: () => void; } ) => {
    e.preventDefault();
    sendSms( numberInput, messageInput )
  }

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
        <p style={{ width: '75%' }}>This App Mode lets you send a text to the "callernumber" parameter taken from the callpop URL</p>
        <form className='messageInputForm' onSubmit={handleSubmit}>
          <div className='form-control' style={{ width: '100%', paddingBottom: '1rem' }}>
          <TextField
              label='Number'
              type='text'
              id='numberInput'
              name='numberInput'
              value={numberInput}
              onChange={onNumberInputChange}
              placeholder={numberInput}
            />
            <TextField
              label='Message'
              type='text'
              id='messageInput'
              name='messageInput'
              multiline rows={10}
              value={messageInput}
              onChange={onMessageInputChange}
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