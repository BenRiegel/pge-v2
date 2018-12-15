//imports ----------------------------------------------------------------------

import NodeInstance from '../lib/NodeInstance.js';
import { getNextAnimationFrame } from '../lib/Animation.js';
import '../../stylesheets/graphic.scss';


//exports ----------------------------------------------------------------------

export default function NewGraphic({id, worldCoords, tags}){

  //state ----------------------------------------------------------------------

  var state = {
    isSelected: undefined,
    type: undefined,
    radius: undefined,
    parentGraphic: undefined,
    combinedGraphics: undefined,
    worldCoords: undefined,
    screenCoords: {x:undefined, y:undefined},
    get isCombined(){
      return this.parentGraphic;
    },
  }

  //view -----------------------------------------------------------------------

  var node = new NodeInstance('div');
  node.className = 'graphic';
  node.dataset = {id};

  //public api -----------------------------------------------------------------

  return {
    rootNode: node.rootNode,
    state,
    resetState: function(){
      state.type = 'point';
      state.radius = 8.5;
      state.parentGraphic = null;
      state.combinedGraphics = [this];
      state.worldCoords = {x:worldCoords.x, y:worldCoords.y};
    },
    updateIsSelected: function(selectedTag){
      state.isSelected = tags.includes(selectedTag);
    },
    updateScreenCoords: function( {pixelSize, pixelNum, leftMapCoord, topMapCoord} ){
      state.screenCoords.x = worldCoords.x / pixelSize - leftMapCoord;
      state.screenCoords.x += (state.screenCoords.x < 0) ? pixelNum : 0;
      state.screenCoords.x -= (state.screenCoords.x > pixelNum) ? pixelNum : 0;
      state.screenCoords.y = worldCoords.y / pixelSize - topMapCoord;
    },
    render(){
      node.setStyle('visibility', (state.isSelected && !state.isCombined) ? 'visible' : 'hidden');
      node.setStyle('transform', `translate(-50%, -50%) translate(${state.screenCoords.x}px, ${state.screenCoords.y}px)`);
      node.dataset = {type:state.type, worldX:state.worldCoords.x, worldY:state.worldCoords.y};
      node.setStyle('width', `${state.radius * 2}px`);
      node.setStyle('height', `${state.radius * 2}px`);
      node.innerHTML = `${state.combinedGraphics.length}`;
    },
    async pan(deltaXPx, deltaYPx, pixelNum){
      state.screenCoords.x += deltaXPx;
      state.screenCoords.x += (state.screenCoords.x < 0) ? pixelNum : 0;
      state.screenCoords.x -= (state.screenCoords.x > pixelNum) ? pixelNum : 0;
      state.screenCoords.y += deltaYPx;
      await getNextAnimationFrame();
      node.setStyle('transform', `translate(-50%, -50%) translate(${state.screenCoords.x}px, ${state.screenCoords.y}px)`);
    }
  };

}
