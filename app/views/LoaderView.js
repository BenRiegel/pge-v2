//imports ----------------------------------------------------------------------

import Loader from '../modules/loader/Loader.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';


//module code block ------------------------------------------------------------

var loader = new Loader();

dispatcher.addListener('startLoading', () => {
  loader.show();
  rootNode.appendChild(loader.rootNode);
});

dispatcher.addListener('finishLoading', async () => {
  await loader.fadeAndHide();
});


//exports ----------------------------------------------------------------------

export default loader;
