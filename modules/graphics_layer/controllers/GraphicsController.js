//imports ----------------------------------------------------------------------


//exports ----------------------------------------------------------------------

export default function NewGraphicsController(state, view){

  return {
    filter: function(selectedTag){
      for (var graphicState of state.graphics){
        graphicState.updateIsSelected(selectedTag);
      }
    }
  }

}
