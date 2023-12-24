// Dron sehnesinin creati
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Drone objecti create 
const droneGeometry = new THREE.BoxGeometry(1, 1, 1);
const droneMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const drone = new THREE.Mesh(droneGeometry, droneMaterial);
scene.add(drone);

// Kamera pozisiyasi p2
camera.position.z = -5;

// Animasiya func.
const animate = () => {
    requestAnimationFrame(animate);

    //  dron hərəkət məntiqini əlavə edeciyik hele
    drone.rotation.x += 0.01;
    drone.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// dronun baxis aciginin teyini p2
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// animation need to add here too...))
animate();
