//imports ----------------------------------------------------------------------

import DomNodeInput from '../../../../utils/DomNodeInput.js';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNodeInput{
  constructor(className, buttonId){
    super('div', `${className}`);
  }
  mouseClickHandler(){
    if (this.isListening && this.onClick){
      this.onClick();
    }
  }
}
