export default function SelectMenuViewStateController(view){

  var { state } = view;

  //public api -----------------------------------------------------------------

  this.toggleOpenState = function(){
    state.set('isOpen', !state.isOpen);
  }

  this.setClosed = function(){
    state.set('isOpen', false);
  };

}
