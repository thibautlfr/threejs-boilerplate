import * as THREE from "three";
import Experience from "../experience.ts";
import Cube from "./cube.ts";

export default class World {
	private cube: Cube | null = null;
	private readonly unsubscribeReady: () => void;

	constructor() {
		const experience = Experience.getInstance();

		const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
		experience.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
		directionalLight.castShadow = true;
		directionalLight.shadow.camera.far = 15;
		directionalLight.shadow.mapSize.set(1024, 1024);
		directionalLight.position.set(3.5, 2, -1.25);
		experience.scene.add(directionalLight);

		const grid = new THREE.GridHelper(10, 10, "#444444", "#2a2a2a");
		experience.scene.add(grid);

		const floor = new THREE.Mesh(
			new THREE.PlaneGeometry(10, 10),
			new THREE.ShadowMaterial({ opacity: 0.15 }),
		);
		floor.rotation.x = -Math.PI * 0.5;
		floor.receiveShadow = true;
		experience.scene.add(floor);

		const onReady = () => {
			this.cube = new Cube();
		};

		experience.resources.emitter.on("ready", onReady);
		this.unsubscribeReady = () =>
			experience.resources.emitter.off("ready", onReady);
	}

	update() {
		this.cube?.update();
	}

	destroy() {
		this.unsubscribeReady();
	}
}
