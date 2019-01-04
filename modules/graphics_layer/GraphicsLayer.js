//imports ----------------------------------------------------------------------

import GraphicsLayerEmitter from './services/GraphicsLayerEmitter.js';
import GraphicsLayerState from './state/GraphicsLayerState.js';
import GraphicState from './state/GraphicState.js';
import GraphicsLayerView from './view/GraphicsLayerView.js';


//exports ----------------------------------------------------------------------

export default function NewGraphicsLayer(mapState, mapProperties){

  //private code block ---------------------------------------------------------

  var state = new GraphicsLayerState(mapState, mapProperties);
  var eventsEmitter = new GraphicsLayerEmitter(state);
  var view = new GraphicsLayerView(state, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = eventsEmitter.addListener,

  this.enable = function(){
    state.set('isEnabled', true);
  };

  this.disable = function(){
    state.set('isEnabled', false);
  };

  this.addGraphics = function(graphicsInfoArray){
    var graphicStates = [];
    for (var graphicInfo of graphicsInfoArray){
      var graphicState = new GraphicState(graphicInfo, mapState, mapProperties, state);
      graphicStates.push(graphicState);
      view.newGraphicNode(graphicInfo, graphicState);
    }
    state.setGraphics(graphicStates);
  };

  this.filterGraphics = function(selectedTag){
    state.filterGraphics(selectedTag);
  }

}
