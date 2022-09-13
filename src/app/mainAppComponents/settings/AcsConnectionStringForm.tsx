import { useCallback, useState } from 'react';
import { TextField, DefaultButton, Separator } from "@fluentui/react";
import utils from '../../utils';


export const AcsConnectionStringForm = () => {
    const [connectionStringInput, setConnectionStringInput] = useState( '' );
    const [phoneNumberInput, setPhoneNumberInput] = useState( '' );
    const settings = utils.localStorageGetter()

    const onConnStringInputChange = useCallback(
        ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ) => {
            setConnectionStringInput( newValue || '' );
        },
        [],
    );

    const onPhoneNumberInputChange = useCallback(
        ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ) => {
            setPhoneNumberInput( newValue || '' );
        },
        [],
    );

    const handleSubmit = ( e: { preventDefault: () => void; } ) => {
        e.preventDefault();
        utils.localStorageSetter( "acsConnectionString", connectionStringInput );
        utils.localStorageSetter( 'acsPhoneNumber', phoneNumberInput )
    }

    return (
        <div>
            <form className='AcsSettingsForm' onSubmit={handleSubmit}>
                <div className='form-control' style={{ marginBottom: '15px' }}>
                    <TextField
                        label='ACS Connection String'
                        type='text'
                        id='AcsConnectionStringInput'
                        name='AcsConnectionStringInput'
                        value={connectionStringInput}
                        onChange={onConnStringInputChange}
                        placeholder={settings.acsConnectionString}
                    />
                    <TextField
                        label='ACS Phone Number'
                        type='text'
                        id='AcsPhoneNumberInput'
                        name='AcsPhoneNumberInput'
                        value={phoneNumberInput}
                        onChange={onPhoneNumberInputChange}
                        placeholder={settings.acsPhoneNumber}
                    />
                </div>
                <DefaultButton type='submit' text="Apply" />
            </form>
        </div>
    );
};
