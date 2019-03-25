//imports ----------------------------------------------------------------------

import DomNodeInput from '../../../../utils/DomNodeInput.js';
import '../stylesheets/contract_button.scss';


//exports ----------------------------------------------------------------------

export default class CloseButtonNode extends DomNodeInput{
  constructor(){
    super('span', `report-contract-button fa fa-compress`);
  }
  mouseClickHandler(){
    this.notify('click');
  }
}
