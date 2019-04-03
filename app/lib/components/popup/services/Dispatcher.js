//imports ----------------------------------------------------------------------

import Dispatcher from '../../../utils/Dispatcher2.js';


//exports ----------------------------------------------------------------------

export default function PopupDispatcher(){

  var dispatcher = new Dispatcher();

  dispatcher.defineAction('setContent', function(content){
    this.notify('model', 'setContent', content);
    this.notify('viewOutput', 'setContent', content);
  });

  dispatcher.defineAction('enable', function(){
    this.notify('viewInput', 'enable');
  });

  dispatcher.defineAction('disable', function(){
    this.notify('viewInput', 'disable');
  });

  dispatcher.defineAction('open', function(){
    this.notify('viewOutput', 'open');
  });

  dispatcher.defineAction('close', function(){
    this.notify('viewOutput', 'close');
    this.notify('emitter', 'close');
  });

  dispatcher.defineAction('forceClose', function(){
    this.notify('viewOutput', 'forceClose');
  });

  dispatcher.defineAction('contract', async function(){
    await this.notify('viewOutput', 'contract');
    this.notify('emitter', 'contract');
  });

  dispatcher.defineAction('expand', async function(){
    this.notify('emitter', 'expand');
    this.notify('viewOutput', 'expand');
  });

  dispatcher.defineAction('contractAndClose', function(){
    this.notify('viewOutput', 'contractAndClose');
    this.notify('emitter', 'contractAndClose');
  });

  //public api -----------------------------------------------------------------

  return dispatcher;

}
