//imports ----------------------------------------------------------------------

import DomNodeTransitions from '../../../../../lib/utils/DomNodeTransitions.js';
import '../stylesheets/window.scss';


//exports ----------------------------------------------------------------------

export default class WindowNode extends DomNodeTransitions{
  constructor(){
    super('div', 'report-window');
  }
}
