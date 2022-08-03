import { Stack } from '@fluentui/react';
import ListItemsComponent from '../simpleGenerator/pageComponents/ListItemsComponent';
import { stackStyles, stackTokens, mainContentStyle } from '../../styles'; // import the styles from the styles file
import utils from '../../utils';
  
  const SimpleGenerator = () => {

    let searchParams = utils.getAllUrlParams(); //Calls the method to get URL Search Params and create an easy to work with array from them

    return <div style={mainContentStyle}>
      <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
        <ListItemsComponent props={searchParams} />
      </Stack>
    </div>
  }
  
  export default SimpleGenerator