export default function PopupViewInputController(view, dispatcher){

  var { subcomponents } = view;
  var { summary, report } = subcomponents;

  //define event reactions -----------------------------------------------------

  var onEnable = function(){
    summary.enable();
    report.enable();
  }

  var onDisable = function(){
    summary.disable();
    report.disable();
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('viewInput', 'enable', onEnable);
  dispatcher.setListener('viewInput', 'disable', onDisable);

}
