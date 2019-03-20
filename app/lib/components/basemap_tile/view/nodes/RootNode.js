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
  setScreenCoords(screenCoords){
    var x = Math.floor(screenCoords.x);
    var y = Math.floor(screenCoords.y);
    var translateStr = `translate(${x}px, ${y}px)`;
    this.setStyle('transform', translateStr);
  }
  setIndices(xIndex, yIndex, imageTileLevel){
    return this.setSrc(BASEMAP_URL_STRING + `/${imageTileLevel}/${yIndex}/${xIndex}`);
  }
}

/*export default function BasemapTileNode(layerState, state){

  //create dom element ---------------------------------------------------------

  var tile = new DomElement('img', 'basemap-tile');
  tile.node.draggable = false;

  //define state change reactions ----------------------------------------------

  var updateVisibility = function(){
    if (state.yIndexIsValid){
      tile.setStyle('opacity', 1);
    } else {
      tile.setStyle('opacity', 0);
    }
  }

  var updateDimensions = function(){
    tile.setStyle('width', `${Math.ceil(layerState.tileSize)}px`);
    tile.setStyle('height', `${Math.ceil(layerState.tileSize)}px`);
  };

  var updateScreenCoords = function(){
    var x = Math.floor(state.screenCoords.x);
    var y = Math.floor(state.screenCoords.y);
    tile.setStyle('transform', `translate(${x}px, ${y}px)`);
  }

  var updateSrc = async function(){
    var x = state.tileIndices.x;
    var y = state.tileIndices.y;
    var z = layerState.imageTileLevel;
    await tile.asyncSetSrc(BASEMAP_URL_STRING + `/${z}/${y}/${x}`);
  }
  var updateSrc = function(){
    var x = state.tileIndices.x;
    var y = state.tileIndices.y;
    var z = layerState.imageTileLevel;
    tile.setSrc(BASEMAP_URL_STRING + `/${z}/${y}/${x}`);
  }

  //load state change reactions ------------------------------------------------

  layerState.addListener('tileSize', 'tileNode - dimensions', updateDimensions);
  state.addListener('screenCoords', 'tileNode - screenCoords', updateScreenCoords);
  state.addListener('yIndexIsValid', 'tileNode - visibility', updateVisibility);
  state.addListener('tileIndices', 'tileNode - src', () => {
    if (state.yIndexIsValid){
      updateSrc();
    }
  });

  /*state.addListener('tileIndices', async () => {
    if (state.yIndexIsValid){
      await updateSrc();
    }
  });

  //public api -----------------------------------------------------------------

  this.node = tile.node;

  this.render = async function(){
    updateVisibility();
    updateDimensions();
    updateScreenCoords();
    await updateSrc();
  }

}*/
