//imports ----------------------------------------------------------------------

import DomNodeTransitions from '../../../../utils/DomNodeTransitions.js';
import '../stylesheets/template_container.scss';


//exports ----------------------------------------------------------------------

export default class TemplateContainerNode extends DomNodeTransitions{
  constructor(){
    super('div', 'template-container');
  }
}
