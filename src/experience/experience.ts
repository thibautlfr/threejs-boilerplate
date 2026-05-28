import * as THREE from "three";
import Camera from "./camera.ts";
import Renderer from "./renderer.ts";
import Debug from "./utils/debug.ts";
import Sizes from "./utils/sizes";
import Time from "./utils/time.ts";
import World from "./world/world.ts";

declare global {
	interface Window {
		experience: Experience;
	}
}

export default class Experience {
	private static instance: Experience | null = null;

	canvas: HTMLCanvasElement;
	sizes: Sizes;
	scene: THREE.Scene;
	camera: Camera;
	renderer: Renderer;
	world: World;
	debug: Debug;
	time: Time;

	static getInstance(canvas?: HTMLCanvasElement): Experience {
		if (!Experience.instance) {
			if (!canvas)
				throw new Error("Canvas is required to initialize Experience");
			Experience.instance = new Experience(canvas);
		}
		return Experience.instance;
	}

	private constructor(canvas: HTMLCanvasElement) {
		Experience.instance = this;

		window.experience = this;

		this.canvas = canvas;

		this.debug = new Debug();
		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.world = new World();

		this.sizes.emitter.on("resize", () => {
			this.resize();
		});

		this.time.emitter.on("tick", () => {
			this.update();
		});
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		this.camera.update();
		this.world.update();
		this.renderer.update();
	}

	destroy() {
		console.log("Experience destroyed");
	}
}
