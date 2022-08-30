import { useCallback, useState } from 'react';
import { useGlobalState } from '../../../GlobalState/GlobalStateProvider';
import { TextField, DefaultButton, Separator } from "@fluentui/react";
import utils from '../../utils';


export const PhoneRegexForm = () => {
    const [regexInput, setRegexInput] = useState( '' );
    const settings = utils.localStorageGetter()

    const onInputChange = useCallback(
        ( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string ) => {
            setRegexInput( newValue || '' );
        },
        [],
    );

    const handleSubmit = ( e: { preventDefault: () => void; } ) => {
        e.preventDefault();
        utils.localStorageSetter( "numberNormalizationRule", regexInput );
    }

    return (
        <div>
            <form className='phoneRegexForm' onSubmit={handleSubmit}>
                <div className='form-control' style={{ marginBottom: '15px' }}>
                    <TextField
                        label='Phone Number Normalization RegEx'
                        type='text'
                        id='regexInput'
                        name='regexInput'
                        value={regexInput}
                        onChange={onInputChange}
                        placeholder={settings.numberNormalizationRule}
                    />
                    <p>This implementation is still pretty brittle. Talk to Michael about the specs needed for your regex pattern if you wish to update it.</p>
                </div>
                <DefaultButton type='submit' text="Apply" />
            </form>
        </div>
    );
};
