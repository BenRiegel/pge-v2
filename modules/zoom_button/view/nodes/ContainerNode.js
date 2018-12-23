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

  //define event handlers ------------------------------------------------------

  var mouseDownEventHandler = function(evt){
    buttonState.updateOnMouseDown();
  }

  var mouseUpEventHandler = function(evt){
    buttonState.updateOnMouseUp();
  }

  var mouseOutEventHandler = function(evt){
    buttonState.updateOnMouseOut();
  }

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
      container.addEventListener('mousedown', mouseDownEventHandler);
      container.addEventListener('mouseup', mouseUpEventHandler);
      container.addEventListener('mouseout', mouseOutEventHandler);
    } else {
      container.removeEventListener('mousedown', mouseDownEventHandler);
      container.removeEventListener('mouseup', mouseUpEventHandler);
      container.removeEventListener('mouseout', mouseOutEventHandler);
    }
  }

  //load reactions -------------------------------------------------------------

  controlsState.addListener('isEnabled', 'zoomInButton', 'isListening', updateListeners);
  buttonState.addListener('isActive', 'container', 'activeStyle', updateActiveStyle);

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateListeners();
  }

}
