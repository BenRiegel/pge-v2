//imports ----------------------------------------------------------------------

import Loader from '../../modules/loader/Loader.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';
import '../assets/stylesheets/loader_spinner.scss';
import '../assets/stylesheets/loader_background.scss';


//module code block ------------------------------------------------------------

var loader = new Loader();

dispatcher.addListener('loader', 'startLoading', () => {
  loader.show();
  rootNode.appendChild(loader.rootNode);
});

dispatcher.addListener('loader', 'finishLoading', async () => {
  await loader.hide( {fadeOutOnHide:true} );
});


//exports ----------------------------------------------------------------------

export default loader;
