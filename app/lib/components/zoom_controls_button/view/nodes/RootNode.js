//imports ----------------------------------------------------------------------

import DomNodeInput from '../../../../utils/DomNodeInput.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNodeInput{
  constructor(className){
    super('div', `zoom-button ${className}`);
  }
  mouseClickHandler(){
    if (this.isListening && this.onClick){
      this.onClick();
    }
  }
}
