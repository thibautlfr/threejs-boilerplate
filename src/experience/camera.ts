import * as THREE from "three";
import {OrbitControls} from "three/addons";
import Experience from "./experience";
import type Sizes from "./utils/sizes.ts";

export default class Camera {
	instance: THREE.PerspectiveCamera;
	controls: OrbitControls;
	private sizes: Sizes;

	constructor() {
		const { sizes, scene, canvas } = Experience.getInstance();

		this.sizes = sizes;

		this.instance = new THREE.PerspectiveCamera(
			35,
			sizes.width / sizes.height,
			0.1,
			100,
		);
		this.instance.position.set(6, 4, 8);
		scene.add(this.instance);

		this.controls = new OrbitControls(this.instance, canvas);
		this.controls.enableDamping = true;

		sizes.emitter.on("resize", () => {
			this.instance.aspect = sizes.width / sizes.height;
			this.instance.updateProjectionMatrix();
		});
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.updateProjectionMatrix();
	}

	update() {
		this.controls.update();
	}
}
