//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/basemap_tile_container.scss';


//exports ----------------------------------------------------------------------

export default function TileContainerNode(){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'tile-container');

  //public api -----------------------------------------------------------------

  return container;

}
