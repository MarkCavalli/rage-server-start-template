class CameraSingletone {
	camera: any;

	constructor() {
		mp.events.add({
			"cCamera-CreateCamera" : (pos1: Vector3Mp, pos2: Vector3Mp, viewangle: number) => {
				this.createCamera(pos1, pos2, viewangle);
			},

			"cCamera-ResetCamera" : () => {
				this.resetCamera();
			},
		});
	}

	createCamera(pos1: Vector3Mp, pos2: Vector3Mp, viewangle: number) {
		this.camera = mp.cameras.new("Cam", pos1, pos2, viewangle);
		this.camera.setActive(true);
		mp.game.cam.renderScriptCams(true, true, 20000000000000000000000000, false, false);
	}

	resetCamera() {
		this.camera.setActive(false);
		mp.game.cam.renderScriptCams(false, true, 0, true, true);
		this.camera.destroy();
	}
}
new CameraSingletone();