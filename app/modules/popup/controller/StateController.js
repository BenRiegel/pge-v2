export default function StateController(state, view){

  //define state change reactions ----------------------------------------------

  var close = function(){
    state.set('isOpen', false);
    state.set('isExpanded', false);
  }

  var expand = function(){
    state.set('isExpanded', true);
  }

  var contract = function(){
    state.set('isExpanded', false);
  }

  //load reactions -------------------------------------------------------------

  view.emitter.private.addListener('close', close);
  view.emitter.private.addListener('expand', expand);
  view.emitter.private.addListener('contract', contract);

}
