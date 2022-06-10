// TBI
var camera, scene, renderer;
var controls;

function Init()
{
    TBI();
    CreateMap();
    PlaySound();

    SetupControls();
}

// Three basic init
function TBI()
{
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1.0, 10000.0);
    camera.rotation.y = 45.0 / 180.0 * Math.PI;
    camera.position.set(800.0, 100.0, 1000.0);
    camera.lookAt(scene);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xdddddd);
    document.body.appendChild(renderer.domElement);
}

function Animate()
{
    requestAnimationFrame(Animate);
    renderer.render(scene, camera);
    controls.update();
}

function SetupControls()
{
    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', renderer);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.1;
}

window.onload = function ()
{
    Init();
    Animate();
}