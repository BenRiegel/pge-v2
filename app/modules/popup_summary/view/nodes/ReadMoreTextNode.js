//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/read_more_text.scss';


//exports ----------------------------------------------------------------------

export default function ReadMoreTextNode(popupState){

  //create dom element ---------------------------------------------------------

  var readMoreText = new DomElement('span', 'read-more-text');
  readMoreText.innerHTML = 'Read more';
  readMoreText.addEventListener('click', popupState.onExpandAction.bind(popupState));  //don't like this

  //public api -----------------------------------------------------------------

  return readMoreText;

}
