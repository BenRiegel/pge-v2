//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/tile_container.scss';


//exports ----------------------------------------------------------------------

export default class TileContainerNode extends DomNode{
  constructor(){
    super('div', 'tile-container');
  }
}
