export default function NewLabelNameView(name){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'tag-name';
  node.innerHTML = name;

  //public api -----------------------------------------------------------------

  return {
    node,
  }
}
