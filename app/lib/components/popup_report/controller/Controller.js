//imports ----------------------------------------------------------------------

import DispatcherController from './subcontrollers/DispatcherController.js';
import EmitterController from './subcontrollers/EmitterController.js';
import ViewStateController from './subcontrollers/ViewStateController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function PopupReportController(dispatcher, emitter, view, popupModel){

  //public api -----------------------------------------------------------------

  return {
    dispatcher: new DispatcherController(dispatcher, view),
    emitter: new EmitterController(emitter, dispatcher),
    viewState: new ViewStateController(view, dispatcher),
    viewDom: new ViewDomController(view),
    viewInput: new ViewInputController(view, dispatcher),
    viewOutput: new ViewOutputController(view, dispatcher, popupModel),
  }

}
