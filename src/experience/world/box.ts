import * as THREE from "three";
import Experience from "../experience.ts";

export default class Box {
	private readonly geometry: THREE.BoxGeometry;
	private readonly material: THREE.MeshStandardMaterial;
	private readonly mesh: THREE.Mesh;

	constructor() {
		const scene = Experience.getInstance().scene;

		this.geometry = new THREE.BoxGeometry(1, 1, 1);

		this.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		scene.add(this.mesh);

		this.setDebug();
	}

	private setDebug() {
		const debug = Experience.getInstance().debug;

		if (debug.active && debug.ui) {
			const folder = debug.ui.addFolder("Box");

			const colorProxy = { color: "#ff0000" };
			folder.addColor(colorProxy, "color").onChange((value: string) => {
				this.material.color.set(value);
			});

			folder
				.add(this.mesh.position, "x")
				.min(-5)
				.max(5)
				.step(0.01)
				.name("position x");
			folder
				.add(this.mesh.position, "y")
				.min(-5)
				.max(5)
				.step(0.01)
				.name("position y");
			folder
				.add(this.mesh.position, "z")
				.min(-5)
				.max(5)
				.step(0.01)
				.name("position z");

			folder.add(this.material, "wireframe");
		}
	}
}
