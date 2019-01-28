//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//module code block ------------------------------------------------------------

const basemapURLString = "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile";


//exports ----------------------------------------------------------------------

export default function BasemapTileNode(state, mapViewpoint, mapProperties){

  //create dom element ---------------------------------------------------------

  var tile = new DomElement('img', 'basemap-tile');

  var load = function(src){
    return new Promise(resolve => {
      var contentLoaded = evt => {
        tile.removeEventListener('load', contentLoaded);
        resolve();
      };
      tile.addEventListener('load', contentLoaded);
      tile.src = src;
    });
  }

  var updateDimensions = function(){
    if (state.isVisible){
      tile.setStyle('width', `${Math.ceil(mapProperties.tileSize)}px`);
      tile.setStyle('height', `${Math.ceil(mapProperties.tileSize)}px`);
    }
  };

  var updateScreenCoords = function(){
    //if (state.isVisible){
      var x = Math.floor(state.screenCoords.x);
      var y = Math.floor(state.screenCoords.y);
      tile.setStyle('transform', `translate(${x}px, ${y}px)`);
  //  } else {
  //    tile.setStyle('transform', `translate(${-500}px, ${-500}px)`);
  //  }
  }

  var updateSrc = function(){
    var x = state.tileIndices.x;
    var y = state.tileIndices.y;
    var z = mapProperties.imageTileLevel;
    tile.src = basemapURLString + `/${z}/${y}/${x}`;
  }

  var asyncUpdateSrc = async function(){
    var x = state.tileIndices.x;
    var y = state.tileIndices.y;
    var z = mapProperties.imageTileLevel;
    await load(basemapURLString + `/${z}/${y}/${x}`);
  }

  state.onIndicesChange = updateSrc;

  state.onScreenCoordsChange = updateScreenCoords;

  state.onSizeChange = updateDimensions;

  mapViewpoint.addListener('basemapTile - render', async () => {
    updateScreenCoords();
    updateDimensions();
    await asyncUpdateSrc();
  });


  //public api -----------------------------------------------------------------

  this.node = tile.node;

  this.render = async function(){
    updateDimensions();
    updateScreenCoords();
    await asyncUpdateSrc();
  }

}
