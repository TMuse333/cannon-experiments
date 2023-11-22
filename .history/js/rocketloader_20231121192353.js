import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';
import { createRocket } from './rocket.js';

export function importRocket() {

    const { animateRocket, rocketBody, rocketGeo } = await createRocket(world, scene, camera, renderer, ground);



}