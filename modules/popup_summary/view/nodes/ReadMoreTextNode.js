//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ReadMoreTextNode(popupState){

  //create dom element ---------------------------------------------------------

  var readMoreText = new DomElement('span', 'read-more-text');
  readMoreText.innerHTML = 'Read more';
  readMoreText.addEventListener('click', popupState.onExpandAction.bind(popupState));

  //public api -----------------------------------------------------------------

  this.node = readMoreText.node;

}
