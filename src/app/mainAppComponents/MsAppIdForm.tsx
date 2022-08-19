import { useCallback, useState } from 'react';
import { useGlobalState } from '../../GlobalState/GlobalStateProvider';
import { TextField, DefaultButton, Separator } from "@fluentui/react";
import utils from '../utils';


export const MsAppIdForm = () => {
    const [msAppIdInput, setMsAppIdInput] = useState( '' );
    const { globalState, setGlobalState } = useGlobalState();

    const onInputChange = useCallback(
        ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ) => {
            setMsAppIdInput( newValue || '' );
        },
        [],
    );

    const handleSubmit = ( e: { preventDefault: () => void; } ) => {
        e.preventDefault();
        alert( 'You have submitted ' + msAppIdInput );
        setGlobalState( ( globalState ) => ( { ...globalState, msAppIdState: msAppIdInput } ) );
        utils.localStorageSetter( "msAppId", msAppIdInput );
    }

    return (
        <div>
            <form className='msAppIdForm' onSubmit={handleSubmit}>
                <div className='form-control' style={{ marginBottom: '15px' }}>
                    <TextField
                        label='Microsoft App ID'
                        type='text'
                        id='msAppIdInput'
                        name='msAppIdInput'
                        value={msAppIdInput}
                        onChange={onInputChange}
                        placeholder={globalState.msAppIdState}
                    />
                </div>
                <DefaultButton type='submit' text="Apply" />
            </form>
        </div>
    );
};
