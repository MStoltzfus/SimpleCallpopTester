import { ISearchBoxStyles } from '@fluentui/react';
import { mainContentStyle } from '../../styles'; // import the styles from the styles file
import utils from '../../utils';
import { useIsSignedIn } from '../../customHooks';
import InnerComponent from './InnerComponent';
import { Login, Providers, ProviderState } from '@microsoft/mgt-react';
import { Info } from '../Features';
import { UnderConstructionHeader } from '../../sharedComponents/UnderConstructionHeader';

export const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

const OutlookContactsConnector: React.FunctionComponent = () => {

  const debouncedInputChange = utils.debounce( e => {
    console.log( e )
  }, 1000 )

  return (
    <>
      <UnderConstructionHeader />
      <InnerComponent />
    </>
  );
}

export default OutlookContactsConnector