//imports ----------------------------------------------------------------------

import DomNodeInput from '../../../../../lib/utils/DomNodeInput.js';
import '../stylesheets/read_more.scss';


//exports ----------------------------------------------------------------------

export default class ReadMoreNode extends DomNodeInput{
  constructor(){
    super('span', 'read-more-text');
    this.innerHTML = 'Read more';
  }
  mouseClickHandler(){
    this.notify('click');
  }
}
