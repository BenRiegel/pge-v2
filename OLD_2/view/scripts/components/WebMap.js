//imports ----------------------------------------------------------------------

import { INIT_WEB_MAP_XYZ as initCoords} from '../../../config/Config.js';
import { getPixelSize, calculateNewZ } from '../../../models/WebMapScale.js';
import { getPixelNum, calculateNewX, calculateNewY } from '../../../models/WebMercator.js';
import State from '../lib/State.js';
import { addChildrenTo } from '../lib/ViewUtils.js';
import animate from '../lib/Animation.js';
import NodeInstance from '../lib/NodeInstance.js';
import NewLoader from './Loader.js';
import NewZoomControls from './ZoomControls.js';
import NewSelectMenu from './SelectMenu.js';
import NewPopup from './Popup.js';
import NewGraphicsLayer from './GraphicsLayer.js';
import NewBasemapLayer from './BasemapLayer.js';
import '../../stylesheets/web_map.scss';


var clamp = function(value, min, max){
  return Math.min(Math.max(value, min), max);
}

//exports ----------------------------------------------------------------------

export default function NewWebmap( {width, height} ){

  //state ----------------------------------------------------------------------

  var state = new State('x', 'y', 'z');

  var handleZoom = function(){

  };

  var handlePan = function(){
    console.log('handle pan');
  }

  var setCoords = async function(x, y, z){
    var oldX = state.x.value;
    var oldY = state.y.value;
    var oldZ = state.z.value;
    state.x.value = calculateNewX(x);
    state.y.value = calculateNewY(y);
    state.z.value = calculateNewZ(z);
    var deltaX = state.x.value - oldX;;
    var deltaY = state.y.value - oldY;
    var deltaZ = state.z.value - oldZ;
    if (oldX !== undefined && oldY !== undefined && oldZ !== undefined){
      if (deltaZ){
        handleZoom();
      } else {
        if (deltaZ || deltaY){
          handlePan();
        }
      }
    } else {
      var mapProperties = calculateMapProperties();
      basemapLayer.render(mapProperties);
      graphicsLayer.onMapCoordsChange(mapProperties);
    }


  /*  state.x.set(x);
    state.y.set(y);
    state.z.set(z);
    if (state.x.hasChanged || state.y.hasChanged || state.z.hasChanged){
      if (state.z.hasChanged){
        //handleZoom();
      } else {
        var deltaX = -(state.x.value - state.x.previousValue);
        var deltaY = -(state.y.value - state.y.previousValue);
        var pixelSize = getPixelSize(state.z.value);
        var deltaXPx = deltaX / pixelSize;
        var deltaYPx = deltaY / pixelSize;
        var maxDeltaPx = Math.max( Math.abs(deltaXPx), Math.abs(deltaYPx));
        var numFrames = Math.floor(maxDeltaPx / 5);
        numFrames = clamp(numFrames, 15, 60);
        var deltaXPxInc = deltaXPx / numFrames;
        var deltaYPxInc = deltaYPx / numFrames;
        console.log(deltaXPxInc, deltaYPxInc);

        //handlePan();
      }*/
      //handleCoordChange();
      //var mapProperties = calculateMapProperties();
      //basemapLayer.render(mapProperties);
      //graphicsLayer.onMapCoordsChange(mapProperties);
    //}
  }

  var pan = function(deltaXPx, deltaYPx){


  }

  var panTo = function(x, y){
    var newX = calculateNewX(x);
    var deltaX = newX - state.x.value;
    var newY = calculateNewY(y);
    var deltaY = newY - state.y.value;
    var d

    var z = state.z.value;
    setCoords(newX, newY, z);
  }

  var zoom = function(deltaZ){

  }

  var zoomTo = function(x, y, z){

  }


  //view -----------------------------------------------------------------------

  //do something about this
  var calculateMapProperties = function(){
    var pixelSize = getPixelSize(state.z.value);
    var pixelNum = getPixelNum(pixelSize);
    var leftMapCoord = state.x.value / pixelSize - width * 0.5;   //change this in case of negative?
    var topMapCoord = state.y.value / pixelSize - height * 0.5;

    var imageTileLevel = Math.floor(state.z.value);
    var scaleFactor = Math.pow(2, state.z.value - imageTileLevel);
    var tileSize = scaleFactor * 256;
    var numBasemapTiles = Math.round(pixelNum / tileSize);
    var leftTileCoord = Math.floor(leftMapCoord / tileSize);
    var topTileCoord = Math.floor(topMapCoord / tileSize);
    //var expansionDistance = (tileSize - 256) / 2;              //don't need?
    var leftMapOffset = leftMapCoord % tileSize;
    leftMapOffset += (leftMapOffset < 0) ? tileSize : 0;
    var topMapOffset = topMapCoord % tileSize;
    topMapOffset += (topMapOffset < 0) ? tileSize : 0;
    return {
      pixelSize,
      pixelNum,
      leftMapCoord,
      topMapCoord,
      imageTileLevel,
    //  scaleFactor,
      leftTileCoord,
      topTileCoord,
      numBasemapTiles,
      //expansionDistance,
      tileSize,
      leftMapOffset,
      topMapOffset,
    };
  }

/*  var setCoords = function(coords){
    state.x.set(coords.x);
    state.y.set(coords.y);
    state.z.set(coords.z);
    if (state.x.hasChanged || state.y.hasChanged || state.z.hasChanged){
      var mapProperties = calculateMapProperties();
      basemapLayer.render(mapProperties);
      graphicsLayer.onMapCoordsChange(mapProperties);
    }
  }*/

  //var panTo = async function(x, y){
  //  state.x.set(x);
  //  state.y.set(y);
    /*if (state.x.hasChanged || state.y.hasChanged){
      var deltaX = -(state.x.value - state.x.previousValue);
      var deltaY = -(state.y.value - state.y.previousValue);
      var pixelSize = getPixelSize(state.z.value);
      var deltaXPx = deltaX / pixelSize;
      var deltaYPx = deltaY / pixelSize;
      var maxDeltaPx = Math.max( Math.abs(deltaXPx), Math.abs(deltaYPx));
      var numFrames = Math.floor(maxDeltaPx / 5);
      numFrames = clamp(numFrames, 15, 60);
      var deltaXPxInc = deltaXPx / numFrames;
      var deltaYPxInc = deltaYPx / numFrames;
      var pixelNum = Math.round(wm.circumference / pixelSize);
      for (var i = 0; i < numFrames; i++){
        var p1 = graphicsLayer.panTo(deltaXPxInc, deltaYPxInc, pixelNum);
        var p2 = basemapLayer.panTo(deltaXPxInc, deltaYPxInc);
        await Promise.all([p1,p2]);
      }
    }*/
  //}

  var menuOptionClickAction = async function(clickedOption){
    selectMenu.disable();
    selectMenu.setSelectedOption(clickedOption);
    await selectMenu.toggleOpenStatus();
    graphicsLayer.setSelectedTag(clickedOption);
    selectMenu.enable();
  };

  var zoomAction = async function(zoomType){

  };

  var closePopup = function(){
    popup.close();
  };

  var expandPopup = function(){
    popup.expand();
  };

  var contractPopup = function(){
    popup.contract();
  };

  var pointSelectAction = async function(id, xCoord, yCoord){
    await panTo(xCoord, yCoord);
    popup.setContent(id);
    popup.open();
  };

  var clusterSelectAction = function(xCoord, yCoord){
    console.log('cluster', xCoord, yCoord);
  };

  var loader = NewLoader();
  var zoomControls = NewZoomControls(zoomAction);
  var selectMenu = NewSelectMenu(menuOptionClickAction);
  var popup = NewPopup(closePopup, expandPopup, contractPopup);
  var graphicsLayer = NewGraphicsLayer(pointSelectAction, clusterSelectAction);
  var basemapLayer = NewBasemapLayer(width, height);
  var container = new NodeInstance('div');
  container.className = 'web-map';
  addChildrenTo(container, [loader, zoomControls, selectMenu, popup, graphicsLayer, basemapLayer]);

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    init: async function(){
      loader.activate();
      zoomControls.enable();
      selectMenu.enable();
      selectMenu.setSelectedOption('All Sites');
      selectMenu.close();
      popup.close();
      setCoords(initCoords.x, initCoords.y, initCoords.z);
      graphicsLayer.enable();
      graphicsLayer.setSelectedTag('All Sites');
      await new Promise( resolve => {
        setTimeout(resolve, 1000);
      });
      await loader.terminate();
    }
  }
}
