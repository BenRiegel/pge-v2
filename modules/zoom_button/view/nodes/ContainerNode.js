//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(controlsState, buttonState, className){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', `zoom-button ${className}`);

  container.showActiveStyle = function(){
    this.addClass('active');
  }

  container.hideActiveStyle = function(){
    this.removeClass('active');
  }

  container.setEventListener('mousedown', buttonState.updateOnMouseDown);

  container.setEventListener('mouseup', buttonState.updateOnMouseUp);

  container.setEventListener('mouseout', buttonState.updateOnMouseOut);

  //define state change reactions ----------------------------------------------

  var updateActiveStyle = function(){
    if (buttonState.isActive){
      container.showActiveStyle()
    } else {
      container.hideActiveStyle();
    }
  }

  var updateListeners = function(){
    if (controlsState.isEnabled){
      container.enableListeners();
    } else {
      container.disableListeners();
    }
  }

  //load reactions -------------------------------------------------------------

  controlsState.addListener('isEnabled', 'zoomInButton', 'isListening', updateListeners);
  buttonState.addListener('isActive', 'container', 'activeStyle', updateActiveStyle);

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateActiveStyle();
    updateListeners();
  }

}
