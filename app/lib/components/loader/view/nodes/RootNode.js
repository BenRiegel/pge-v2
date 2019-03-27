//imports ----------------------------------------------------------------------

import DomNodeTransitions from '../../../../utils/DomNodeTransitions.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNodeTransitions{
  constructor(){
    super('div', 'loader');
  }
}
