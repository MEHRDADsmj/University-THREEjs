var gltf;
var floor, ball;
var particles, geometry, materials = [], parameters, i, h, color, sprite, size;
var clock = new THREE.Clock();

function CreateMap()
{
    AddLights();
    AddGeometry();
    AddParticles();
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
    // Floor
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

    // Ball
    var ballGeo = new THREE.SphereGeometry(128, 32, 32);
    var ballMat = new THREE.MeshPhongMaterial( { color: 0x000022 } );
    ball = new THREE.Mesh(ballGeo, ballMat);
    ball.position.set(500.0, 0.0, 0.0);
    scene.add(ball);
}

function AddParticles()
{
    geometry = new THREE.Geometry();
    var textureLoader = new THREE.TextureLoader();

    sprite1 = textureLoader.load("Assets/Textures/snowflake.png");
    sprite2 = textureLoader.load("Assets/Textures/snowflake.png");
    sprite3 = textureLoader.load("Assets/Textures/snowflake.png");
    sprite4 = textureLoader.load("Assets/Textures/snowflake.png");
    sprite5 = textureLoader.load("Assets/Textures/snowflake.png");
    sprite6 = textureLoader.load("Assets/Textures/snowflake.png");

    for (i = 0; i < 4000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Math.random() * 2000 - 1000;
        vertex.z = Math.random() * 2000 - 1000;
        geometry.vertices.push(vertex);
    }

    parameters = [
        // [[Color in HSL], texture, size
        [[1.0, 0.2, 0.5], sprite2, 1],
        [[0.95, 0.1, 0.5], sprite3, 2],
        [[0.90, 0.05, 0.5], sprite1, 3],
        [[0.85, 0, 0.5], sprite5, 1.5],
        [[0.80, 0, 0.5], sprite4, 2.5],
        [[0.75, 0, 0.5], sprite6,3.5]
    ];

    for (i = 0; i < parameters.length; i++) {
        color = parameters[i][0];
        sprite = parameters[i][1];
        size = parameters[i][2];

        materials[i] = new THREE.PointsMaterial({
            size: size,
            map: sprite,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });

        materials[i].color.setHSL(color[0], color[1], color[2]);
        particles = new THREE.Points(geometry, materials[i]);
        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;
        scene.add(particles);
    }
}

function UpdateMap()
{
    var t = (Date.now() / 1000);
    for (i = 0; i < scene.children.length; i++) {

        var object = scene.children[i];
        if (object instanceof THREE.Points) {
            object.rotation.y = t * ( i < 400 ? i + 1 : -( i + 1 ) );
        }
    }
}