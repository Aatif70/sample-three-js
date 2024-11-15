
import * as THREE from 'three';

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#f5f5f5');

// camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
document.body.appendChild(renderer.domElement);


function createCube(color, position) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.set(...position);
    return cube;
}


const mainCube = createCube('#BDBDBD', [0, 0, 0]);
const rightShadowCube = createCube('#BDBDBD', [3, 0, 0]);
const leftShadowCube = createCube('#BDBDBD', [-3, 0, 0]);


scene.add(mainCube, rightShadowCube, leftShadowCube);


const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.1 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -3.5;
plane.receiveShadow = true;
scene.add(plane);




// Lighting 

const rightShadowLight = new THREE.DirectionalLight(0xffffff, 0.6);
rightShadowLight.position.set(-5, 2, 5); 
rightShadowLight.castShadow = true;
scene.add(rightShadowLight);


const leftShadowLight = new THREE.DirectionalLight(0xffffff, 0.6);
leftShadowLight.position.set(5, 2, 5); 
leftShadowLight.castShadow = true;
scene.add(leftShadowLight);


const bottomShadowLight = new THREE.DirectionalLight(0xffffff, 0.6);
bottomShadowLight.position.set(0, 5, 5);
bottomShadowLight.castShadow = true;
scene.add(bottomShadowLight);


rightShadowLight.target = rightShadowCube;
leftShadowLight.target = leftShadowCube;




function animate() {
    requestAnimationFrame(animate);

    mainCube.rotation.x += 0.03;
    rightShadowCube.rotation.x += 0.06;
    leftShadowCube.rotation.x += 0.01;

    renderer.render(scene, camera);
}
animate();
