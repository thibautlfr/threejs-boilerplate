import mitt from "mitt";

type TimeEvent = {
	tick: undefined;
};

export default class Time {
	start: number;
	current: number;
	elapsed: number;
	delta: number = 16;
	readonly emitter = mitt<TimeEvent>();

	constructor() {
		this.start = Date.now();
		this.current = this.start;
		this.elapsed = 0;
		this.delta = 16;

		window.requestAnimationFrame(() => {
			this.tick();
		});
	}

	tick() {
		const currentTime = Date.now();
		this.delta = currentTime - this.current;
		this.current = currentTime;
		this.elapsed = this.current - this.start;

		this.emitter.emit("tick");

		window.requestAnimationFrame(() => {
			this.tick();
		});
	}
}
