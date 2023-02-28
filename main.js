import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('./images/space.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('./images/me.png');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('./images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./images/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;
jeff.position.y = -1.5;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

// project section
const projects = [{ image: "./images/static-job.png", github: "https://github.com/Pranshu-Sahu/static-job-filter-fem.git", liveSite: "https://euphonious-zuccutto-5f30f8.netlify.app/", description: "Filter out jobs based on selected categories" },
{ image: "./images/typing-game.png", github: "https://github.com/Pranshu-Sahu/typing-game.git", liveSite: "https://funny-souffle-9a6e82.netlify.app/", description: "Typing game React Js" },
{ image: "./images/movie-fight.png", github: "https://github.com/Pranshu-Sahu/movie-app.git", liveSite: "https://pranshu-sahu.github.io/movie-app/", description: "Movie App JavaScript" },
{ image: "./images/newshome-page.jpg", github: "https://github.com/Pranshu-Sahu/news-homepage-fem.git", liveSite: "https://pranshu-sahu.github.io/news-homepage-fem/", description: "News Home page Tailwind" },
{ image: "./images/calculator.jpg", github: "https://github.com/Pranshu-Sahu/fem-calculator.git", liveSite: "https://leafy-mousse-1a35f4.netlify.app/", description: "Calculator javascript" },
{ image: "./images/todo.jpg", github: "https://github.com/Pranshu-Sahu/Todo-app.git", liveSite: "https://earnest-faun-d1f889.netlify.app/", description: "Todo App Javascript" },
]
const projectContainer = document.querySelector(".project-container")
projects.forEach((item, index) => {
  projectContainer.innerHTML +=
    (`<div class="project-item">
          <img class="project-image" src=${item.image} alt="Project ${index}" />
          <div class="project-description">
            <p>${item.description}</p>
            <div class="project-web">
              <a class="fa-brands fa-github" href=${item.github}></a>
              <a class="fa-solid fa-globe" href=${item.liveSite}></a>
            </div>
          </div>
        </div>`)
})

console.log('change structre')