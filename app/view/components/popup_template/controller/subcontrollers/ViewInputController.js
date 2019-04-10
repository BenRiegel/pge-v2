export default function PopupTemplateViewInputController(view, dispatcher){

  var { nodes } = view;
  var { readMore } = nodes;

  //public api -----------------------------------------------------------------

  this.enable = function(){
    readMore.isListening = true;
  };

  this.disable = function(){
    readMore.isListening = false;
  };

}
