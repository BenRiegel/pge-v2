//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/basemap_tile.scss';


//module code block ------------------------------------------------------------

const basemapURLString = "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile";


//exports ----------------------------------------------------------------------

export default function BasemapTileNode(layerState, state){

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
    await tile.asyncSetSrc(basemapURLString + `/${z}/${y}/${x}`);
  }

  //load state change reactions ------------------------------------------------

  layerState.addListener('tileSize', updateDimensions);
  state.setUpdateFunction('screenCoords', updateScreenCoords);
  state.setUpdateFunction('yIndexIsValid', updateVisibility);
  state.setUpdateFunction('tileIndices', async () => {
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

}
