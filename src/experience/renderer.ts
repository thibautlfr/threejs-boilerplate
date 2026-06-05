import * as THREE from "three";
import Experience from "./experience.ts";

export default class Renderer {
	instance: THREE.WebGLRenderer;
	private experience: Experience;

	constructor() {
		this.experience = Experience.getInstance();

		this.instance = new THREE.WebGLRenderer({
			canvas: this.experience.canvas,
			antialias: true,
		});
		this.instance.shadowMap.enabled = true;
		this.instance.shadowMap.type = THREE.PCFShadowMap;
		this.instance.setClearColor("#1a1a1a");
		this.instance.setSize(
			this.experience.sizes.width,
			this.experience.sizes.height,
		);
		this.instance.setPixelRatio(this.experience.sizes.pixelRatio);
	}

	resize() {
		this.instance.setSize(
			this.experience.sizes.width,
			this.experience.sizes.height,
		);
		this.instance.setPixelRatio(this.experience.sizes.pixelRatio);
	}

	update() {
		this.instance.render(
			this.experience.scene,
			this.experience.camera.instance,
		);
	}
}
