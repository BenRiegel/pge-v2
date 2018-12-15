export default function NewLabelCountView(count){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'tag-count';
  node.innerHTML = count;

  //public api -----------------------------------------------------------------

  return {
    node,
  }
}
