export default function PopupModelController(model){

  //public api -----------------------------------------------------------------

  this.updateContent = function(content){
    model.set('content', content);
  };

}
