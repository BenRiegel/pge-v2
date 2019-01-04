//imports ----------------------------------------------------------------------
import dispatcher from '../services/Dispatcher.js';
import { popupEventStart, popupEventEnd } from '../controllers/DispatcherController.js';
import Popup from '../../modules/popup/Popup.js';
import '../assets/stylesheets/popup_container.scss';
import '../assets/stylesheets/popup_report_container.scss';
import '../assets/stylesheets/popup_report_content.scss';
import '../assets/stylesheets/popup_summary_container.scss';
import '../assets/stylesheets/popup_summary_content.scss';


//module code block ------------------------------------------------------------

var popup = new Popup();

dispatcher.addListener('popup', 'load', () => {
  popup.close();
  popup.enable();
  popup.addListener('eventStart', popupEventStart);
  popup.addListener('eventEnd', popupEventEnd);
});

dispatcher.addListener('popup', 'loadProjectData', projectData => {
  popup.setContent(projectData);
});

dispatcher.addListener('popup', 'open', () => {
  popup.open();
});

dispatcher.addListener('popup', 'close', () => {
  popup.close();
});

dispatcher.addListener('popup', 'enable', () => {
  popup.enable();
});

dispatcher.addListener('popup', 'disable', () => {
  popup.disable();
});


//exports ----------------------------------------------------------------------

export default popup;
