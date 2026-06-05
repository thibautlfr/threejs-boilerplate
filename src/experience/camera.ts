import * as THREE from "three";
import {OrbitControls} from "three/addons";
import Experience from "./experience.ts";

export default class Camera {
	instance: THREE.PerspectiveCamera;
	controls: OrbitControls;
	private experience: Experience;

	constructor() {
		this.experience = Experience.getInstance();

		this.instance = new THREE.PerspectiveCamera(
			35,
			this.experience.sizes.width / this.experience.sizes.height,
			0.1,
			100,
		);
		this.instance.position.set(6, 4, 8);
		this.experience.scene.add(this.instance);

		this.controls = new OrbitControls(this.instance, this.experience.canvas);
		this.controls.enableDamping = true;
	}

	resize() {
		this.instance.aspect =
			this.experience.sizes.width / this.experience.sizes.height;
		this.instance.updateProjectionMatrix();
	}

	update() {
		this.controls.update();
	}

	destroy() {
		this.controls.dispose();
	}
}
