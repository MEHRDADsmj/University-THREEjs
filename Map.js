var gltf;
var floor;

function CreateMap()
{
    AddLights();
    AddGeometry();
    LoadModel();
}

function AddLights()
{
    var ambient = new THREE.AmbientLight(0x404040, 100.0);
    scene.add(ambient);

    directionalLight = new THREE.DirectionalLight(0xffffff, 100.0);
    directionalLight.position.set(0.0, 1.0, 0.0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    light = new THREE.PointLight(0xc4c4c4, 10.0);
    light.position.set(0.0, 300.0, 500.0);
    scene.add(light);
}

function LoadModel()
{
    let loader = new THREE.GLTFLoader();
    loader.load('Assets/Models/scene.gltf', function(gltf){
    car = gltf.scene.children[0];
    car.scale.set(0.5, 0.5, 0.5);
    scene.add(gltf.scene);
    });
}

function AddGeometry()
{
    var loader = new THREE.TextureLoader();
    var floorTexture = loader.load("Assets/Textures/Floor.jpg");
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping
    floorTexture.repeat.set(100, 100);
    var floorMat = new THREE.MeshBasicMaterial( {map: floorTexture} );
    var floorGeo = new THREE.PlaneGeometry(100000.0, 100000.0);
    floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotateX(-1.57);
    floor.position.set(0.0, -185.0, 0.0);
    scene.add(floor);
}