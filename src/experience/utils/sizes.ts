import mitt from "mitt";

type SizesEvents = {
	resize: undefined;
};

export default class Sizes {
	width: number;
	height: number;
	pixelRatio: number;
	readonly emitter = mitt<SizesEvents>();

	constructor() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.pixelRatio = Math.min(window.devicePixelRatio, 2);

		window.addEventListener("resize", () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.pixelRatio = Math.min(window.devicePixelRatio, 2);
			this.emitter.emit("resize");
		});
	}
}
