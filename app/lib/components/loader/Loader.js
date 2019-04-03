//imports ----------------------------------------------------------------------

import Controller from './controller/Controller.js';
import Dispatcher from '../../utils/Dispatcher2.js';
import View from './view/View.js';


//exports ----------------------------------------------------------------------

export default function Loader(){

  //private code block ---------------------------------------------------------

  var dispatcher = new Dispatcher();
  var view = new View();
  var controller = new Controller(dispatcher, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.activate = function(){
    dispatcher.notify('viewOutput', 'show');
  };

  this.terminate = function(fadeOut = false){
    return dispatcher.notify('viewOutput', 'hide', {fadeOut});
  };

}
