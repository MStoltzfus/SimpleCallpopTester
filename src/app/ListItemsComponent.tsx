import { Text, TextField } from '@fluentui/react';
  
const ListItemsComponent = ( props:any ) => {
  if ( props.props === undefined ) {
    return <Text variant={'large'}>No Search Params are in the URL</Text>;
  } else {
    return props.props.map( ( props: any ) => ( <TextField key={props.key} label={props.key} readOnly value={props.value} /> ) );
  }
};

export default ListItemsComponent
