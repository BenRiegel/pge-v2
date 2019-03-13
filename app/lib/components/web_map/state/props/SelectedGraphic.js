//imports ----------------------------------------------------------------------

import Emitter from '../../../../utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function SelectedGraphicProp(){

  var emitter = new Emitter();

  var notify = async function(){
    emitter.broadcast('updateGraphics');
    if (this.worldCoords){
      await emitter.asyncBroadcast('updateViewpoint');
    }
    if (this.type === 'point'){
      emitter.broadcast('openPopup');
    }
  }

  var state = {
    type: null,
    id: null,
    worldCoords: null,
    attributes: null,
    addListener: function(eventName, callback){
      emitter.addListener(eventName, callback);
    },
    removeListener: function(eventName, callback){
      emitter.removeListener(eventName, callback);
    },
    set: async function(type, id = null, worldCoords = null, attributes = null){
      this.type = type;
      this.id = id;
      this.worldCoords = worldCoords;
      this.attributes = attributes;
      await notify.call(this);
    },
  }

  //public api -----------------------------------------------------------------

  return state;

}
