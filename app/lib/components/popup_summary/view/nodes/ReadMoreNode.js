//imports ----------------------------------------------------------------------

import DomNodeInput from '../../../../utils/DomNodeInput.js';
import '../stylesheets/read_more.scss';


//exports ----------------------------------------------------------------------

export default class ReadMoreNode extends DomNodeInput{
  constructor(){
    super('span', 'read-more-text');
    this.innerHTML = 'Read more';
  }
  mouseClickHandler(){
    if (this.isListening && this.onClick){
      this.onClick();
    }
  }
}
