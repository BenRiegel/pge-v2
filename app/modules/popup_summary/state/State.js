//imports ----------------------------------------------------------------------

import ObservedObj from '../../../lib/ObservedObj.js';
import { waitAtLeast } from '../../../lib/Utils.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryState(){

  //create state var -----------------------------------------------------------

  var state = new ObservedObj({
    content: undefined,
    isActive: undefined,
  });

  //modify behavior of props ---------------------------------------------------

  state.props.content.onChange = async function(){
    this.updateType('loaderIsActive', true);
    await waitAtLeast(500, async() => {
      this.updateType('updateTitle');
      this.updateType('updateAuthor');
      this.updateType('updateText');
      await this.updateTypeAsync('updateImageSrc');
      this.updateType('updateImageSize');
    });
    this.updateType('loaderIsActive', false);
  }

  state.props.isActive.onChange = async function(){
    if (state.isActive){
      this.updateType('rootVisibility');
      await this.updateTypeAsync('contentHeight');
      await this.updateTypeAsync('contentOpacity');
    } else {
      await this.updateTypeAsync('contentOpacity');
      this.updateType('contentHeight');
      this.updateType('rootVisibility');
    }
  }

  //public api -----------------------------------------------------------------

  return state;

}
