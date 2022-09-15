import { WebGLRenderer } from "three";
import { BoxGeometry } from "three";
import { Mesh } from "three";
import { MeshBasicMaterial } from "three";
import { PerspectiveCamera } from "three";
import { Scene } from "three";
import logo from "./logo.svg";

function App() {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.innerHTML = "";
  document.body.appendChild(renderer.domElement);

  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({
    color: "blue",
  });
  camera.position.z = 5;
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  return null;
}

export default App;
