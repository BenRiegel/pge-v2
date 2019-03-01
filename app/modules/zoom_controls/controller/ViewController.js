export default function ViewController(state, view){

  var { nodes } = view;
  var { container, homeButtonContainer, inOutButtonContainer } = nodes;
  var { zoomHomeButton, zoomHomeIcon } = nodes;
  var { zoomInButton, zoomInIcon } = nodes;
  var { zoomOutButton, zoomOutIcon } = nodes;

  //configure dom --------------------------------------------------------------

  container.node.appendChild(homeButtonContainer.node);
  container.node.appendChild(inOutButtonContainer.node);
  zoomHomeButton.node.appendChild(zoomHomeIcon.node);
  zoomInButton.node.appendChild(zoomInIcon.node);
  zoomOutButton.node.appendChild(zoomOutIcon.node);
  homeButtonContainer.node.appendChild(zoomHomeButton.node);
  inOutButtonContainer.node.appendChild(zoomInButton.node);
  inOutButtonContainer.node.appendChild(zoomOutButton.node);

}
