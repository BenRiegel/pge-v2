export default function OptionLabelViewOutputController(props, view){

  var { nodes } = view;
  var { name } = nodes;

  //public api -----------------------------------------------------------------

  this.showIndent = function(){
    if (props.isIndented){
      name.setIndentVisibility('visible');
    }
  };

  this.hideIndent = function(){
    if (props.isIndented){
      name.setIndentVisibility('hidden');
    }
  };

}
