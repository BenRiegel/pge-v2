//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerState(){

  //public state variable ------------------------------------------------------

  var state = new ObservedObj({
    selectedTag: null,
    selectedGraphic: null,
  });

  state.props.selectedTag.onChange = function(){
    this.updateType('pointGraphic');
    this.updateType('clusterGraphics');
  }

  //public api -----------------------------------------------------------------

  return state;

}
