//imports ----------------------------------------------------------------------

import Dispatcher from '../../../utils/Dispatcher2.js';


//exports ----------------------------------------------------------------------

export default function PopupReportDispatcher(){

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

  dispatcher.defineAction('position', function(contractedDimensions){
    this.notify('viewOutput', 'position', contractedDimensions);
  });

  dispatcher.defineAction('open', async function(expandedDimensions){
    await this.notify('viewOutput', 'open', expandedDimensions);
    this.notify('viewState', 'open');
  });

  dispatcher.defineAction('updateOnContract', function(contractedDimensions){
    return this.notify('viewOutput', 'updateOnContract', contractedDimensions);
  });

  dispatcher.defineAction('contractAndClose', function(){
    return this.notify('viewOutput', 'contractAndClose');
  });


  dispatcher.defineAction('closeRequest', function(){
    this.notify('emitter', 'closeRequest');
  });

  dispatcher.defineAction('contractRequest', function(){
    this.notify('emitter', 'contractRequest');
  });


  //public api -----------------------------------------------------------------

  return dispatcher;

}
