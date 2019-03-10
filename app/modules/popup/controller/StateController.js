export default function PopupStateController(state, view){

  var { subcomponents } = view;
  var { summary, report } = subcomponents;

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

  summary.addEventListener('close', close);
  summary.addEventListener('expand', expand);
  report.addEventListener('close', close);
  report.addEventListener('contract', contract);

}
