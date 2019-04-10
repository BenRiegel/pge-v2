export default function PopupViewInputController(view){

  var { subcomponents } = view;
  var { template } = subcomponents;

  //define event reactions -----------------------------------------------------

  this.enable = template.enable;

  this.disable = template.disable;

}
