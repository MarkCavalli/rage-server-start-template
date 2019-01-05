 class Camera {
	constructor() {

	}

	createCamera(player: PlayerMp, pos1: Vector3Mp, pos2: Vector3Mp, viewangle: number) {
		player.call("cCamera-CreateCamera", [pos1, pos2, viewangle]);
    }
    
    resetCamera(player: PlayerMp) {
        player.call("cCamera-ResetCamera");
    }

}
export default new Camera();