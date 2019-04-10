//imports ----------------------------------------------------------------------

import DomNodeTransitions from '../../../../../lib/utils/DomNodeTransitions.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNodeTransitions{
  constructor(){
    super('div', 'popup-report-container');
  }
}
