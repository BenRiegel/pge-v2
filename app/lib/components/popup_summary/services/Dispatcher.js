//imports ----------------------------------------------------------------------

import Dispatcher from '../../../utils/Dispatcher2.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryDispatcher(){

  var dispatcher = new Dispatcher();

  dispatcher.defineAction('enable', function(){
    this.notify('viewInput', 'enable');
  });

  dispatcher.defineAction('disable', function(){
    this.notify('viewInput', 'disable');
  });

  dispatcher.defineAction('resetLoadingStatus', function(){
    this.notify('viewState', 'resetLoadingStatus');
  });

  dispatcher.defineAction('open', async function(){
    await this.notify('viewOutput', 'open');
    this.notify('viewState', 'open');
  });

  dispatcher.defineAction('close', function(){
    this.notify('viewOutput', 'close');
  })

  dispatcher.defineAction('updateOnExpand', function(){
    return this.notify('viewOutput', 'updateOnExpand');
  });

  dispatcher.defineAction('updateOnContract', function(){
    return this.notify('viewOutput', 'updateOnContract');
  });

  dispatcher.defineAction('contractAndClose', function(){
    return this.notify('viewOutput', 'contractAndClose');
  });


  dispatcher.defineAction('closeRequest', function(){
    this.notify('emitter', 'closeRequest');
  });

  dispatcher.defineAction('readMoreRequest', function(){
    this.notify('emitter', 'readMoreRequest');
  });

  dispatcher.defineAction('getDimensions', function(){
    return this.notify('viewOutput', 'getDimensions');
  });

  //public api -----------------------------------------------------------------

  return dispatcher;

}
