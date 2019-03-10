//imports ----------------------------------------------------------------------

import ObservedObj from '../../../lib/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function LoaderState(){

  var state = new ObservedObj({
    isActive: false,
  });

  state.props.isActive.onChange = async function(){
    this.updateType('animationVisibility');
    await this.updateTypeAsync('rootOpacity');
    this.updateType('rootVisibility');
  }

  //public api -----------------------------------------------------------------

  return state;

}
