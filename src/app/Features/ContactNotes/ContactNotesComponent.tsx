import { Providers, ProviderState } from '@microsoft/mgt-element';

import { Login } from '@microsoft/mgt-react';
import { DefaultButton, ISearchBoxStyles, TextField } from '@fluentui/react';
import { useCallback, useEffect, useState } from 'react';

import { graphCall } from './ContactNotesUtils';

export const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

const ContactNotes: React.FunctionComponent = () => {

  function useIsSignedIn(): [boolean] {
    const [isSignedIn, setIsSignedIn] = useState( false );

    useEffect( () => {
      const updateState = () => {
        const provider = Providers.globalProvider;
        setIsSignedIn( provider && provider.state === ProviderState.SignedIn );
      };

      Providers.onProviderUpdated( updateState );
      updateState();

      return () => {
        Providers.removeProviderUpdatedListener( updateState );
      }
    }, [] );

    return [isSignedIn];
  }

  const [isSignedIn] = useIsSignedIn();

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
          <h3>Contact Notes POC</h3>
        </div>
        <div className="mgt-dark">
          <Login />
        </div>
        <p style={{ width: '75%' }}>This App Mode lets you create a contact note record in a SharePoint List</p>
        {isSignedIn &&
          <ContactNotesForm />}
      </div>
    </>
  );
}


const ContactNotesForm = () => {

  const [ContactNoteInput, setContactNoteInput] = useState( '' );
  const [ContactNumberInput, setContactNumberInput] = useState( '' );
  const [ContactNameInput, setContactNameInput] = useState( '' );

  let params = new URLSearchParams( document.location.search );
  let number = params.get( 'Contactnumber' );

  useEffect( () => {
    if ( number !== null || undefined ) {
      //@ts-ignore
      setNumberInput( number );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const onContactNumberInputChange = useCallback(
    ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ) => {
      setContactNumberInput( newValue || '' );
    },
    [],
  );

  const onContactNameInputChange = useCallback(
    ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ) => {
      setContactNameInput( newValue || '' );
    },
    [],
  );

  const onContactNoteInputChange = useCallback(
    ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ) => {
      setContactNoteInput( newValue || '' );
    },
    [],
  );

  const handleSubmit = ( e: { preventDefault: () => void; } ) => {
    e.preventDefault();
    let submission = {
      "Contact Number": ContactNumberInput,
      "Contact Name": ContactNameInput,
      "Contact Note": ContactNoteInput
    }
    console.log( submission )
    console.log( import.meta.env.VITE_MS_APPLICATION_ID )
    //sendSms( numberInput, messageInput )
  }

  return (
    <form className='messageInputForm' onSubmit={handleSubmit}>
      <div className='form-control' style={{ width: '100%', paddingBottom: '1rem' }}>
        <TextField
          label='Contact Number'
          type='text'
          id='ContactNumberInput'
          name='ContactNumberInput'
          value={ContactNumberInput}
          onChange={onContactNumberInputChange}
          placeholder='Enter a Contact Number Here'
        />
        <TextField
          label='Contact Name'
          type='text'
          id='ContactNameInput'
          name='messageInput'
          value={ContactNameInput}
          onChange={onContactNameInputChange}
          placeholder='Enter a Contact Name Here'
        />
        <TextField
          label='Contact Note'
          type='text'
          id='messageInput'
          name='messageInput'
          multiline rows={10}
          value={ContactNoteInput}
          onChange={onContactNoteInputChange}
          placeholder='Enter Your Message Here'
        />
      </div>
      <DefaultButton onClick={graphCall} />
      <DefaultButton type='submit' text="Send" />
    </form>
  )
}

export default ContactNotes