// səhnə qurulmasi
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Dron modelinin yaratmaq
const droneGeometry = new THREE.BoxGeometry(1, 0.5, 1);
const droneMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const drone = new THREE.Mesh(droneGeometry, droneMaterial);
scene.add(drone);

// Kameranın başlanğıc mövqeyini add etmek
camera.position.set(0, 5, 5);
camera.lookAt(0, 0, 0);

// baxis aciglari
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Dronun ferqli baxis aciqlari
const views = [
    { position: new THREE.Vector3(0, 5, 5), lookAt: new THREE.Vector3(0, 0, 0) },
    { position: new THREE.Vector3(5, 5, 0), lookAt: new THREE.Vector3(0, 0, 0) },
    { position: new THREE.Vector3(0, 5, -5), lookAt: new THREE.Vector3(0, 0, 0) },
];

let currentView = 0;

// Gorusu deyismek
const switchView = () => {
    currentView = (currentView + 1) % views.length;
    const view = views[currentView];
    camera.position.copy(view.position);
    camera.lookAt(view.lookAt);
};

// Handle key press to switch views
window.addEventListener('keydown', (event) => {
    if (event.key === 'v') {
        switchView();
    }
});

// Animation donguye salmaq 
const animate = () => {
    requestAnimationFrame(animate);

    //  dronun hereketinin elave edilmesi
    drone.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// animation'll be adding here soon.))
animate();
