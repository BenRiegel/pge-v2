export default function SelectMenuViewController(view){

  var { subcomponents } = view;
  var { options } = subcomponents;

  //public api -----------------------------------------------------------------

  this.addOption = function(option){
    options.push(option);
  };

}
