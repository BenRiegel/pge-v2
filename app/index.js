//imports ----------------------------------------------------------------------

import dispatcher from './services/Dispatcher.js';
import './controllers/ViewController.js';        //other way to do this?
import './view/stylesheets/index.scss';


//module code block ------------------------------------------------------------

dispatcher.newAsyncAction('initApp');
