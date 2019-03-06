//imports ----------------------------------------------------------------------

import ZoomControlsView from './view/ZoomControlsView.js';
import ViewController from './controller/ViewController.js';


//exports ----------------------------------------------------------------------

export default function ZoomControls(){

  //private code block ---------------------------------------------------------

  var view = new ZoomControlsView();
  var controller = {
    view: new ViewController(view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addClickListener = function(buttonName, cb){
    view.emitter.public.addListener(buttonName, cb);
  };

  this.enable = function(){
    view.props.inputEnabled = true;
  };

  this.disable = function(){
    view.props.inputEnabled = false;
  };

}
