//imports ----------------------------------------------------------------------

import DomNodeInput from '../../../../utils/DomNodeInput.js';
import '../stylesheets/close_button.scss';


//exports ----------------------------------------------------------------------

export default class CloseButtonNode extends DomNodeInput{
  constructor(){
    super('span', `summary-close-button fa fa-times`);
  }
  mouseClickHandler(){
    this.notify('click');
  }
}
