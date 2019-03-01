//imports ----------------------------------------------------------------------

import Loader from '../modules/loader/Loader.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';


//module code block ------------------------------------------------------------

var loader = new Loader();

dispatcher.addListener('startLoading', () => {
  loader.activate();
  rootNode.appendChild(loader.rootNode);
});

dispatcher.addListener('finishLoading', async () => {
  await loader.terminate(true);
});


//exports ----------------------------------------------------------------------

export default loader;
