//imports ----------------------------------------------------------------------

import ObservedObj from '../../../../utils/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function ActionProp(){

  var state = new ObservedObj({
    type: null,
    frameProps: null,
  });

  state.props.type.onChange = async function(currentValue, previousValue){
    if (state.type){
      var eventName = `${state.type}Begin`;
    } else {
      var eventName = `${previousValue}End`;
    }
    this.updateType(eventName);
  }

  state.props.frameProps.onChange = function(){
    var eventName = `${state.type}Frame`;
    this.updateType(eventName);
  }

  state.begin = function(type){
    return state.setAsync('type', type);
  }

  state.end = function(){
    return state.setAsync('type', null);
  }

  //public api -----------------------------------------------------------------

  return state;

}
