import { Login, Providers } from '@microsoft/mgt-react';
import { DefaultButton, SearchBox, Stack, TextField } from '@fluentui/react';
import { stackStyles, stackTokens } from '../../styles';
import utils from '../../utils';
import React from 'react';
import { searchBoxStyles } from './OutlookContactsConnector';
import StyledLogin from '../../sharedComponents/StyledLogin';
//import { msGraphReq } from './apiUtils'

/*
  const sampleContactsSaver = async ( input?: any ) => {
  const data = await msGraphReq.simple( 'me/contacts' )
  console.log( data )
  localStorage.setItem( 'sampleContacts', JSON.stringify( data ) )
}
*/

const InnerComponent: React.FunctionComponent = () => {

  const debouncedInputChange = utils.debounce( e => {
    console.log( e );
  }, 1000 );

  return (
    <>
      <StyledLogin />
      <div className='searchBoxContainer' style={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBox
          styles={searchBoxStyles}
          placeholder="Search"
          onSearch={newValue => console.log( 'value is ' + newValue )}
          onChange={( event?: React.ChangeEvent<HTMLInputElement>, newValue?: string ) => debouncedInputChange( newValue )} />
      </div>
      <div className="columns" style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '1rem'
      }}>
        <div className="column" style={{ flex: '50%', outline: '1px solid whitesmoke', }}>
        </div>
        <div className="column" style={{ flex: '50%' }}>
          <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <DefaultButton text='Test' onClick={async () => alert( 'Yay' )} />
          </Stack>
        </div>
      </div>
    </>
  );
};


export default InnerComponent