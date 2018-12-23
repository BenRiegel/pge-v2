//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function BackgroundNode(state){

  //create dom element ---------------------------------------------------------

  var background = new DomElement('div', 'loader-background');

  //define state change reactions ----------------------------------------------

  var updateOpacity = async function(){
    if (state.isVisible){
      background.setOpaque();
    } else {
      background.setTransparent();
      if (state.isFadingOut){
        await background.fadeOut();
      }
    }
  }

  var updateVisibility = async function(){
    if (state.isVisible){
      background.show();
    } else {
      background.hide();
    }
  };

  //load reactions -------------------------------------------------------------

  state.addListener('isVisible', 'background', 'opacity', updateOpacity);
  state.addListener('isVisible', 'background', 'visibility', updateVisibility);

  //public api -----------------------------------------------------------------

  this.node = background.node;

  this.render = async function(){
    updateOpacity();
    updateVisibility();
  };

}
