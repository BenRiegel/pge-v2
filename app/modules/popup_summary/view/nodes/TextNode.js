//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/text.scss';


//exports ----------------------------------------------------------------------

export default function TextNode(popupState){

  //create dom element ---------------------------------------------------------

  var text = new DomElement('span', 'project-text');

  //define state change reactions ----------------------------------------------

  var updateContent = function(){
    text.innerHTML = popupState.projectData.introText + ' . . . ';
  }

  //load reactions -------------------------------------------------------------

  popupState.addListener('projectData', 'text', 'content', updateContent)

  //public api -----------------------------------------------------------------

  this.node = text.node;

}
