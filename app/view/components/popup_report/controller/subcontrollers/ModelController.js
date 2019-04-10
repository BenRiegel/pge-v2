export default function PopupReportModelController(model){

  //public api -----------------------------------------------------------------

  this.updateContent = function(content){
    model.set('content', content);
  };

}
