//imports ----------------------------------------------------------------------

import EmitterController from './subcontrollers/EmitterController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsController(emitter, view){

  var { nodes } = view;
  var { root } = nodes;

  //define subcontrollers ------------------------------------------------------

  var emitterController = new EmitterController(emitter);
  var domController = new ViewDomController(view);
  var inputController = new ViewInputController(view);

  //load event listeners ------------------------------------------------------

  root.setEventListener('click', emitterController.onButtonClick);

  //public api -----------------------------------------------------------------

  this.enable = inputController.enable;
  this.disable = inputController.disable;

}
