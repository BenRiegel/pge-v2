//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/title.scss';


//exports ----------------------------------------------------------------------

export default function TitleNode(popupState){

  //create dom element ---------------------------------------------------------

  var title = new DomElement('div', 'project-title');

  //define state change reactions ----------------------------------------------

  var updateContent = function(){
    title.innerHTML = popupState.projectData.projectName;
  }

  //load reactions -------------------------------------------------------------

  popupState.addListener('projectData', 'title - content', updateContent)

  //public api -----------------------------------------------------------------

  return title;

}
