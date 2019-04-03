//imports ----------------------------------------------------------------------

import Dispatcher from '../../../utils/Dispatcher2.js';


//exports ----------------------------------------------------------------------

export default function WebMapDispatcher(){

  var dispatcher = new Dispatcher();

  dispatcher.defineAction('configure', function(){
    return this.notify('viewOutput', 'configure');
  });

  dispatcher.defineAction('newSelectedTag', function(selectedOptionKey){
    this.notify('viewOutput', 'newSelectedTag', selectedOptionKey);
  });

  dispatcher.defineAction('selectMenuActionStart', function(){
    this.notify('viewInput', 'selectMenuActionStart');
  });

  dispatcher.defineAction('selectMenuActionEnd', function(){
    this.notify('viewInput', 'selectMenuActionEnd');
  });

  dispatcher.defineAction('pointGraphicSelected', async function(payload){
    this.notify('viewInput', 'pointGraphicSelected', 'start');
    this.notify('model', 'pointGraphicSelected', payload);
    await this.notify('viewOutput', 'pointGraphicSelected', payload);
    this.notify('viewInput', 'pointGraphicSelected', 'end');
  });

  dispatcher.defineAction('clusterGraphicSelected', async function(payload){
    this.notify('viewInput', 'clusterGraphicSelected', 'start');
    this.notify('model', 'clusterGraphicSelected', payload);
    await this.notify('viewOutput', 'clusterGraphicSelected', payload);
    this.notify('viewInput', 'clusterGraphicSelected', 'end');
  });

  dispatcher.defineAction('zoomInRequest', async function(){
    this.notify('model', 'zoomInRequest');
    this.notify('viewInput', 'zoomInRequest', 'start');
    await this.notify('viewOutput', 'zoomInRequest');
    this.notify('viewInput', 'zoomInRequest', 'end');
  });

  dispatcher.defineAction('zoomOutRequest', async function(){
    this.notify('model', 'zoomOutRequest');
    this.notify('viewInput', 'zoomOutRequest', 'start');
    await this.notify('viewOutput', 'zoomOutRequest');
    this.notify('viewInput', 'zoomOutRequest', 'end');
  });

  dispatcher.defineAction('zoomHomeRequest', async function(){
    this.notify('model', 'zoomHomeRequest');
    this.notify('viewInput', 'zoomHomeRequest', 'start');
    await this.notify('viewOutput', 'zoomHomeRequest');
    this.notify('viewInput', 'zoomHomeRequest', 'end');
  });

  dispatcher.defineAction('panStart', function(){
    this.notify('model', 'panStart');
    this.notify('viewInput', 'panStart');
    this.notify('viewOutput', 'panStart');
  });

  dispatcher.defineAction('pan', function(payload){
    this.notify('model', 'pan', payload);
    this.notify('viewOutput', 'pan', payload);
  });

  dispatcher.defineAction('panEnd', function(){
    this.notify('viewInput', 'panEnd');
    this.notify('viewOutput', 'panEnd');
  });

  dispatcher.defineAction('popupClosed', function(){
    this.notify('viewOutput', 'popupClosed');
  });

  dispatcher.defineAction('popupExpansionStart', function(){
    this.notify('viewInput', 'popupExpansionStart');
  });

  dispatcher.defineAction('popupContractionEnd', function(){
    this.notify('viewInput', 'popupContractionEnd');
  });

  //public api -----------------------------------------------------------------

  return dispatcher;

}
