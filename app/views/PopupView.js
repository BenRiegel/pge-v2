//imports ----------------------------------------------------------------------
import dispatcher from '../services/Dispatcher.js';
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
});

dispatcher.addListener('popup', 'loadProjectData', projectData => {
  popup.setContent(projectData);
});

dispatcher.addListener('popup', 'open', () => {
  popup.open();
});



//exports ----------------------------------------------------------------------

export default popup;
