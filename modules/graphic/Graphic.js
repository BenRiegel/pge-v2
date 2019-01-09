//imports ----------------------------------------------------------------------

import GraphicState from './state/GraphicState.js';
import GraphicView from './view/GraphicView.js';


//exports ----------------------------------------------------------------------

export default function Graphic(props, mapViewpoint, mapProperties, layerState){

  //private code block ---------------------------------------------------------

  var state = new GraphicState(props, mapViewpoint, mapProperties, layerState);
  var view = new GraphicView(props, state);

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.rootNode,
    resetState: function(){
      state.reset();
    },
    setIsCovered: function(parentId){
      state.setIsCovered(parentId);
    },
    setIsVisible: function(){
      state.setIsVisible();
    },
    setRadius: function(radius, renderedRadius){
      state.setRadius(radius, renderedRadius);
    },
    setWorldCoords: function(coords){
      state.setWorldCoords(coords);
    },
    setNum: function(num){
      state.setNum(num);
    },
    get id(){
      return props.id;
    },
    get worldCoords(){
      return state.worldCoords;
    },
    get renderedRadius(){
      return state.renderedRadius;
    },
    get isMapped(){
      return state.isMapped;
    },
    get isCovered(){
      return state.isCovered;
    }
  }

}
