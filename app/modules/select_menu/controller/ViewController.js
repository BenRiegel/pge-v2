export default function ViewController(state, view){

  var { nodes } = view;
  var { container } = nodes;

  //define state change reactions ----------------------------------------------

  var updateContainerBorderRadius = function(){
    if (state.isOpen){
      container.props.borderRadiusStyle.set('default-border-radius');  //do something about this
    } else {
      container.props.borderRadiusStyle.set('rounded-border-radius');
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListenerByType('isOpen', 'menuContainerBorderRadius', updateContainerBorderRadius);

  //init -----------------------------------------------------------------------

  updateContainerBorderRadius();

  //public api -----------------------------------------------------------------

  this.addNewOption = function(option){
    container.node.appendChild(option.rootNode);
  }

}
