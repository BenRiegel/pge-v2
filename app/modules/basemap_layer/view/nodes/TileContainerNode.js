//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/basemap_tile_container.scss';


//exports ----------------------------------------------------------------------

export default function TileContainerNode(){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'tile-container');

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.addChildNodes = function(childNodes){
    var docFragment = document.createDocumentFragment();
    for (var childNode of childNodes){
      docFragment.appendChild(childNode.node);
    }
    container.node.appendChild(docFragment);
  }

  this.fadeOut = async function(){
    await container.animateOpacity('transparent');
  }

  this.reset = async function(){
    while (container.node.firstChild) {
      container.node.removeChild(container.node.firstChild);
    }
    container.setOpacity('opaque');
  }

}
