//imports ----------------------------------------------------------------------

import ZoomButtonState from './state/ZoomButtonState.js';
import ZoomButtonEmitter from './services/ZoomButtonEmitter.js';
import ZoomButtonView from './view/ZoomButtonView.js';


//exports ----------------------------------------------------------------------

export default function ZoomButton(props, controlsState){

  //private code block ---------------------------------------------------------

  var eventsEmitter = new ZoomButtonEmitter(props);
  var view = new ZoomButtonView(props, controlsState, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = eventsEmitter.addListener;

}
