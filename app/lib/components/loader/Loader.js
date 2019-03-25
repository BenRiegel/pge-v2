//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Dispatcher from '../../utils/Dispatcher.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function Loader(){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var view = new View();
  var controller = new Controller(dispatcher, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.show = function(){
    dispatcher.newAction('show');
  };

  this.hide = function(fadeOut = false){
    if (fadeOut){
      return dispatcher.newAsyncAction('fadeOutAndHide');
    } else {
      dispatcher.newAction('hide');
    }
  };

}
