import * as THREE from "three";
import Experience from "../experience.ts";
import Box from "./box.ts";

export default class World {
	constructor() {
		const scene = Experience.getInstance().scene;

		const ambientLight = new THREE.AmbientLight(0x2266d4, 1);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0x2266d4, 2);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		new Box();
	}

	update() {
		// Can be useful for GLTF objects with animations
	}
}
