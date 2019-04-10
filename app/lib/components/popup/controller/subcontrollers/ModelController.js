export default function PopupTemplateModelController(model){

  //public api -----------------------------------------------------------------

  this.updateContent = function(content){
    model.set('content', content);
  };
  
}
