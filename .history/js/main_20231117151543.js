import * as CANNON from 'cannon-es';
import { Camera } from 'three';

const world = new CANNON.world({
    gravity: new CANNON.Vec3(0,-9.81,0)
})

const timeStep = 1/60;


function animate() {
    world.step(timeStep)
    renderer.render(scene,Camera)
}






