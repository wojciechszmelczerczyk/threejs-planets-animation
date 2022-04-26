import * as THREE from "three";
import getData from "./data";
import fs from "fs";

// GLSL
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

import atmosphereVertexShader from "./shaders/atmosphere.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";

console.log(atmosphereFragmentShader);

// gsap implemented for smooth movement effect
import gsap from "gsap";

// get Earth data by default
getData("terre");

let scene = new THREE.Scene();
let scene1 = new THREE.Scene();

let scene2 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("canvas"),
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Earth
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load("./img/globe.jpg"),
      },
    },
  })
);

// Mars
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load("./img/mars_1k_color.jpg"),
      },
    },
  })
);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

// spawn stars
const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 1000;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);
const stars = new THREE.Points(starGeometry, starMaterial);
const stars2 = new THREE.Points(starGeometry, starMaterial);

scene1.add(stars);
scene2.add(stars2);

// atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  })
);

const atmosphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader.replace(
      "vec4(0.3,0,1,0.5)",
      "vec4(0.9,0,0,0.5)"
    ),
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  })
);

atmosphere.scale.set(1.1, 1.1, 1.1);

atmosphere.position.z = 5;

scene1.add(atmosphere);

atmosphere2.scale.set(1.1, 1.1, 1.1);

atmosphere2.position.z = 5;

scene2.add(atmosphere2);

const group = new THREE.Group();
const group2 = new THREE.Group();

// Earth
group.add(earth);
scene1.add(group);

// Mars
group2.add(mars);
scene2.add(group2);

camera.position.z = 15;

// mouse default position
const mouse = {
  x: undefined,
  y: undefined,
};

scene = scene1;

const canvas = document.querySelector("canvas");

canvas.addEventListener("click", () => {
  scene = scene2;
  getData("mars");
});

canvas.addEventListener("dblclick", () => {
  scene = scene1;
  getData("terre");
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  earth.rotation.y += 0.001;
  mars.rotation.y += 0.001;

  gsap.to(group.rotation, {
    x: mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2,
  });
  gsap.to(group2.rotation, {
    x: mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2,
  });
}
animate();

addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = (e.clientY / innerHeight) * 2 + 1;
});
