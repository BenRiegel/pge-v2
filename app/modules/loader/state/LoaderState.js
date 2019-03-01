//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState4.js';

//imports ----------------------------------------------------------------------

export default function SelectMenuState(){

  var state = new ComponentState({
    isActivated: false,
  });

  //modify behavior of isActivated prop ----------------------------------------

  state.props.isActivated.onChange = async function(){
    this.updateType('spinnerVisibility');
    await this.updateTypeAsync('backgroundOpacity');
    this.updateType('backgroundVisibility');
  };

  //public api -----------------------------------------------------------------

  return state;
}
