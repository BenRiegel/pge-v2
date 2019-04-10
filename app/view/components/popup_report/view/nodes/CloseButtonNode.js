//imports ----------------------------------------------------------------------

import DomNodeInput from '../../../../../lib/utils/DomNodeInput.js';
import '../stylesheets/close_button.scss';


//exports ----------------------------------------------------------------------

export default class CloseButtonNode extends DomNodeInput{
  constructor(){
    super('span', `report-close-button fa fa-times`);
  }
  mouseClickHandler(){
    this.notify('click');
  }
}
