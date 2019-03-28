//imports ----------------------------------------------------------------------

import DomNodeTransitions from '../../../../utils/DomNodeTransitions.js';
import '../stylesheets/tile_container.scss';


//exports ----------------------------------------------------------------------

export default class TileContainerNode extends DomNodeTransitions{
  constructor(){
    super('div', 'tile-container');
  }
}
