//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerState(){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isEnabled: true,
    selectedTag: null,
    highlightedGraphicId: null,
  });

  //modify behavior of selectedTag prop ----------------------------------------

  state.setOnChange('selectedTag', function(){
    this.requestUpdate('graphic', 'isMapped');
    this.requestUpdate('layerView', 'cluster');
  });

  //public api -----------------------------------------------------------------

  return state;

}
