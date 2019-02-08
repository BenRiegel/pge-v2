//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/popup_report_iframe.scss';


//exports ----------------------------------------------------------------------

export default function IframeNode(popupState, reportState){

  //create dom element ---------------------------------------------------------

  var iframe = new DomElement('iframe', 'project-iframe');

  //define state change reactions ----------------------------------------------

  var updateContent = async function(){
    if (reportState.isVisible && !reportState.contentIsLoaded){
      await new Promise( resolve => {
        var contentLoaded = evt => {
          iframe.node.removeEventListener('load', contentLoaded);
          reportState.onContentIsLoaded();
          resolve();
        }
        iframe.node.addEventListener('load', contentLoaded);
        iframe.node.src = popupState.projectData.url;
      });
    };
  }

  //load reactions -------------------------------------------------------------

  reportState.addListener('isVisible', 'iframe', 'content', updateContent);

  //public api -----------------------------------------------------------------

  this.node = iframe.node;

}
