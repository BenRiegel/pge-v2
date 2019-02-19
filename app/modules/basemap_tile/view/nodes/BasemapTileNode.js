//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/basemap_tile.scss';


//module code block ------------------------------------------------------------

const basemapURLString = "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile";


//exports ----------------------------------------------------------------------

export default function BasemapTileNode(layerState, state, mapMovement){

  //create dom element ---------------------------------------------------------

  var tile = new DomElement('img', 'basemap-tile');
  tile.node.draggable = false;

  //put this elsewhere
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

  var updateVisibility = function(){
    if (state.yValidIndex){
      tile.setStyle('opacity', 1);
    } else {
      tile.setStyle('opacity', 0);
    }
  }

  var updateDimensions = function(){
    tile.setStyle('width', `${Math.ceil(state.size)}px`);
    tile.setStyle('height', `${Math.ceil(state.size)}px`);
  };

  var updateScreenCoords = function(){
    var x = Math.floor(state.screenCoords.x);
    var y = Math.floor(state.screenCoords.y);
    tile.setStyle('transform', `translate(${x}px, ${y}px)`);
  }

  var updateSrc = function(){
    if (state.yValidIndex){
      var x = state.tileIndices.x;
      var y = state.tileIndices.y;
      var z = layerState.imageTileLevel;
      tile.src = basemapURLString + `/${z}/${y}/${x}`;
    }
  }

  var asyncUpdateSrc = async function(){
    if (state.yValidIndex){
      var x = state.tileIndices.x;
      var y = state.tileIndices.y;
      var z = layerState.imageTileLevel;
      await load(basemapURLString + `/${z}/${y}/${x}`);
    }
  }

  state.addListener('screenCoords', 'node', 'screenCoords', () => {
  //  if (state.yValidIndex){
      updateScreenCoords();
    //}
  });

  //state.addListener('yValidIndex', 'node', 'screenCoords', () => {
  //  if (state.yValidIndex){
    //  updateScreenCoords();
    //}
  //});

  state.addListener('size', 'node', 'dimensions', () => {
  //  if (state.yValidIndex){
      updateDimensions();
    //}
  });

  state.addListener('tileIndices', 'node', 'src', updateSrc);
  //state.addListener('isVisible', 'node', 'visibility', updateVisibility);
  //state.addListener('yValidIndex', 'node', 'visibility', updateVisibility);

  mapMovement.addListener('type', 'basemapTile', 'render', async () => {
    updateScreenCoords();
    updateDimensions();
    //updateVisibility();
    await asyncUpdateSrc();
  });

  //public api -----------------------------------------------------------------

  this.node = tile.node;

  this.render = async function(){
    updateDimensions();
    updateScreenCoords();
    //updateVisibility();
    await asyncUpdateSrc();
  }

}
