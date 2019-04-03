//imports ----------------------------------------------------------------------

import Dispatcher from '../../../utils/Dispatcher2.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuDispatcher(){

  var dispatcher = new Dispatcher();

  dispatcher.defineAction('loadOptions', function(payload){
    this.notify('model', 'loadOptions', payload);
    this.notify('viewDom', 'loadOptions', payload);
  });

  dispatcher.defineAction('optionClick', async function(selectedOptionKey){
    this.notify('viewInput', 'optionClick', 'start');
    this.notify('emitter', 'optionClick', 'start');
    this.notify('model', 'optionClick', selectedOptionKey);
    await this.notify('viewOutput', 'optionClick');
    this.notify('viewInput', 'optionClick', 'end');
    this.notify('emitter', 'optionClick', 'end');
  });

  dispatcher.defineAction('enable', function(){
    this.notify('viewInput', 'enable');
  });

  dispatcher.defineAction('disable', function(){
    this.notify('viewInput', 'disable');
  });

  dispatcher.defineAction('forceClose', function(){
    this.notify('model', 'forceClose');
    this.notify('viewOutput', 'forceClose');
  });

  //public api -----------------------------------------------------------------

  return dispatcher;

}
