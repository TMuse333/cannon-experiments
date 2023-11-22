// rocketPhysics.js

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class RocketPhysics {
  constructor(object3D, cannonBody, scene, world) {
    this.object3D = object3D;
    this.cannonBody = cannonBody;
    this.scene = scene;
    this.world = world;
    this.targetPosition = new THREE.Vector3();
    this.offset = new THREE.Vector3(0, 5, -10);
    this.initPositionDisplay();
  }

  initPositionDisplay() {
    // Create a DOM element for position display
    this.positionDisplay = document.createElement('div');
    this.positionDisplay.style.position = 'absolute';
    this.positionDisplay.style.bottom = '10px';
    this.positionDisplay.style.right = '10px';
    this.positionDisplay.style.color = 'white';
    this.positionDisplay.style.backgroundColor = 'red'
    document.body.appendChild(this.positionDisplay);
  }

  updateRocket() {
    // Update the rocket's physics, position, etc.
    if (this.object3D && this.cannonBody) {
      this.object3D.position.copy(this.cannonBody.position).add(new THREE.Vector3(0, -0.45, 0));
      this.object3D.quaternion.copy(this.cannonBody.quaternion);

      // Update the camera position to follow the rocket
      this.targetPosition.copy(this.object3D.position).add(this.offset);
    }
  }

  updateCamera(camera) {
    // Update the camera to follow the rocket
    if (this.object3D) {
      camera.position.lerp(this.targetPosition, 0.1); // Adjust the lerp factor as needed
      camera.lookAt(this.object3D.position);
    }
  }


  continuousUpdate() {
    // Continuously update the position of the rocket in the x, y, and z planes
    if (this.object3D && this.cannonBody) {
      const deltaTime = 1 / 60; // Assuming 60 frames per second, adjust as needed

      this.positionDisplay.textContent = `Rocket Position (x, y, z): ${this.cannonBody.position.x.toFixed(2)}, ${this.cannonBody.position.y.toFixed(2)}, ${this.cannonBody.position.z.toFixed(2)}`;


    //   console.log('Rocket Position (x, y, z):', this.cannonBody.position.x, this.cannonBody.position.y, this.cannonBody.position.z);
    
    }
  }

  // Add more methods as needed for rocket physics, controls, etc.
  // ...
}
