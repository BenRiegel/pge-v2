//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/loader_background.scss';


//exports ----------------------------------------------------------------------

export default function BackgroundNode(state, renderingProps){

  //create dom element ---------------------------------------------------------

  var background = new DomElement('div', 'loader-background');

  //define state change reactions ----------------------------------------------

  var updateOpacity = async function(){
    if (state.isVisible){
      background.setOpacity('opaque');
    } else {
      if (renderingProps.isAnimating){
        await background.animateOpacity('transparent');
      } else {
        background.setOpacity('transparent');
      }
    }
  }

  var updateVisibility = async function(){
    if (state.isVisible){
      background.setVisibility('visible');
    } else {
      background.setVisibility('hidden');
    }
  };

  //load reactions -------------------------------------------------------------

  state.addListener('isVisible', 'background - opacity', updateOpacity);
  state.addListener('isVisible', 'background - visibility', updateVisibility);

  //init dom element -----------------------------------------------------------

  updateOpacity();
  updateVisibility();

  //public api -----------------------------------------------------------------

  return background;

}
