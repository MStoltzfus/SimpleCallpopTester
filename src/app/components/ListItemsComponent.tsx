import { Text, TextField } from '@fluentui/react';

const NoParamsMessage = () => {
  return (
    <>
      <>
        <Text variant={'large'}>No URL Search Params Found</Text>
      </>
      <>
        <Text>This app generates components based on URL search params specified in the URL</Text>
        <Text>To see it in action, add some params to the URL in the "example.com?key=value" format</Text>
      </>
    </>
  );
}

const ListItemsComponent = ( props: any ) => {
  let excludeAppNameKey = props.props.filter((data: { key: string; }) => data.key !== 'appName'); //Dirty fix that excludes the appName URL param/value from being rendered in the list
  if ( props.props === undefined ) {
    return <NoParamsMessage />
  } else {
    return excludeAppNameKey.map( ( props: any ) => ( <TextField key={props.key} label={props.key} readOnly value={props.value} /> ) );
  }
};

export default ListItemsComponent;