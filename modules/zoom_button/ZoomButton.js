//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import ZoomButtonView from './view/ZoomButtonView.js';


//exports ----------------------------------------------------------------------

export default function ZoomButton(containerClassName, iconClassName, controlsState){

  //private code block ---------------------------------------------------------

  var eventsEmitter = new Emitter();
  var view = new ZoomButtonView(containerClassName, iconClassName, controlsState, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addClickListener = function(cb){
    eventsEmitter.addListener('click', cb);
  }

}
