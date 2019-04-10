export default function PopupViewInputController(view){

  var { subcomponents } = view;
  var { template } = subcomponents;

  //public api -----------------------------------------------------------------

  this.enable = template.enable;

  this.disable = template.disable;

}
