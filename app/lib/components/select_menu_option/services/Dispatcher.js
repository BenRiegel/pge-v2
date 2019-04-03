//imports ----------------------------------------------------------------------

import Dispatcher from '../../../utils/Dispatcher2.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionDispatcher(){

  var dispatcher = new Dispatcher();

  dispatcher.defineAction('newSelectedOption', function(){
    this.notify('model', 'newSelectedOption');
    this.notify('viewOutput', 'newSelectedOption');
  });

  dispatcher.defineAction('labelIndent', function(){
    this.notify('viewOutput', 'labelIndent');
  });

  dispatcher.defineAction('iconChar', function(){
    this.notify('viewOutput', 'iconChar');
  });

  dispatcher.defineAction('iconBorderVisibility', function(){
    this.notify('viewOutput', 'iconBorderVisibility');
  });

  dispatcher.defineAction('rootBorderRadius', function(){
    this.notify('viewOutput', 'rootBorderRadius');
  });

  dispatcher.defineAction('rootVisibility', function(){
    this.notify('viewOutput', 'rootVisibility');
  });

  dispatcher.defineAction('rootHeight', function(){
    return this.notify('viewOutput', 'rootHeight');
  });

  dispatcher.defineAction('rootOpacity', function(){
    return this.notify('viewOutput', 'rootOpacity');
  });

  //public api -----------------------------------------------------------------

  return dispatcher;

}
