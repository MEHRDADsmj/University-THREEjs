var world;
var timeStep = 1 / 60;
var ballBody, floorPhys;

function InitCannon()
{
    world = new CANNON.World();
    world.gravity.set(0.0, -9.81 * 50, 0.0);

    var floorMat = new CANNON.Material();
    var ballMat = new CANNON.Material();

    floorPhys = new CANNON.Body({
        shape: new CANNON.Plane(),
        mass: 0,
        position: new CANNON.Vec3(0.0, -185.0, 0.0),
        material: floorMat
    });
    floorPhys.quaternion.setFromEuler(-Math.PI / 2.0, 0.0, 0.0);
    world.addBody(floorPhys);
    floor.position.copy(floorPhys.position);
    floor.quaternion.copy(floorPhys.quaternion);

    ballBody = new CANNON.Body({
        shape: new CANNON.Sphere(15),
        mass: 10,
        position: new CANNON.Vec3(500.0, 500.0, 0.0),
        material: ballMat
    });
    world.addBody(ballBody);
    ballBody.linearDamping = 0.05;

    var matContact = new CANNON.ContactMaterial(floorMat, ballMat, {friction: 0.0, restitution: 0.5});
    world.addContactMaterial(matContact);
}

function UpdatePhysics()
{
    world.step(timeStep);

    ball.position.copy(ballBody.position);
    ball.quaternion.copy(ballBody.quaternion);
}