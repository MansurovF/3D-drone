// Dron sehnesinin creati
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// dronun fiz.(strukturu) dünyası qur
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

// Dron modelini yaratmaq
const droneGeometry = new THREE.BoxGeometry(1, 0.5, 1);
const droneMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const drone = new THREE.Mesh(droneGeometry, droneMaterial);
scene.add(drone);

// Dronun 3d deki korpusunun creati
const droneShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.25, 0.5));
const droneBody = new CANNON.Body({ mass: 5, shape: droneShape });
world.addBody(droneBody);

// Kameranin pozisiyasi
camera.position.z = 5;

// User idaresi ucun elaveler etmek 
const keyboard = new THREEx.KeyboardState();

// Animation functionu hele elave de etmeliyik daha better ucun
const animate = () => {
    requestAnimationFrame(animate);

    // Dron hərəkətinə istifadəçinin daxiletməsi tətbiq edilmesi
    if (keyboard.pressed("W")) {
        droneBody.applyLocalForce(new CANNON.Vec3(0, 0, -10), new CANNON.Vec3(0, 0, 0));
    }
    if (keyboard.pressed("S")) {
        droneBody.applyLocalForce(new CANNON.Vec3(0, 0, 10), new CANNON.Vec3(0, 0, 0));
    }
    if (keyboard.pressed("A")) {
        droneBody.applyLocalForce(new CANNON.Vec3(-10, 0, 0), new CANNON.Vec3(0, 0, 0));
    }
    if (keyboard.pressed("D")) {
        droneBody.applyLocalForce(new CANNON.Vec3(10, 0, 0), new CANNON.Vec3(0, 0, 0));
    }

    // dronun fiziki struktr deyismek lazmdir p2
    world.step(1 / 60);

    //  dron mövqeyini yeniləmek
    drone.position.copy(droneBody.position);
    drone.quaternion.copy(droneBody.quaternion);

    renderer.render(scene, camera);
};

// baxis acigini ölçüsünü dəyişdirmek
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// animation elave etmek lazimdir 
animate();
