//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import { popupEventStart, popupEventEnd, popupClose } from '../services/Dispatcher.js';
import Popup from '../modules/popup/Popup.js';
import rootNode from './RootView.js';


//module code block ------------------------------------------------------------

var popup = new Popup();

dispatcher.addListener('load', () => {
  popup.addEventListener('eventStart', popupEventStart);
  popup.addEventListener('eventEnd', popupEventEnd);
  popup.addEventListener('isClosed', popupClose);
  rootNode.appendChild(popup.rootNode);
});

dispatcher.addListener('popup - loadProjectData', projectData => {
  popup.setContent(projectData);
});

dispatcher.addListener('popup - open', projectData => {
  popup.open(projectData);
});

dispatcher.addListener('popup - close', () => {
  popup.close();
});

dispatcher.addListener('popup - enable', () => {
  popup.enable();
});

dispatcher.addListener('popup - disable', () => {
  popup.disable();
});


//exports ----------------------------------------------------------------------

export default popup;
