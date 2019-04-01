//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/root.scss';


//module code block ------------------------------------------------------------

const BASEMAP_URL_STRING = "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile";


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(){
    super('img', 'basemap-tile');
    this.node.draggable = false;
  }
  setScreenCoords(x, y){
    var translateStr = `translate(${x}px, ${y}px)`;
    this.setStyle('transform', translateStr);
  }
  setIndices(xIndex, yIndex, imageTileLevel){
    return this.setSrc(BASEMAP_URL_STRING + `/${imageTileLevel}/${yIndex}/${xIndex}`);
  }
}
