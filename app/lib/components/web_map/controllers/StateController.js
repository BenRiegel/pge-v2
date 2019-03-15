//imports ----------------------------------------------------------------------

import ActionController from './subcontrollers/ActionController.js';
import ViewpointController from './subcontrollers/ViewpointController.js';


//exports ----------------------------------------------------------------------

export default function WebMapStateController(state, dispatcher, view){

  //public api -----------------------------------------------------------------

  return {
    action: new ActionController(state, view),
    viewpoint: new ViewpointController(state, dispatcher, view),
  }

}
