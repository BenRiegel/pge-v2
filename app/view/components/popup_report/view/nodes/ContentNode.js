//imports ----------------------------------------------------------------------

import DomNodeTransitions from '../../../../../lib/utils/DomNodeTransitions.js';
import '../stylesheets/content.scss';


//exports ----------------------------------------------------------------------

export default class ContentNode extends DomNodeTransitions{
  constructor(){
    super('div', 'report-content');
  }
}
