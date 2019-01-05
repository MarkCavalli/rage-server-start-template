interface PlayerMp {
    loggedIn: boolean;
    guid: number;
    email: string;
    firstName: string;
    lastName: string;
    lang: string;
    adminlvl: number;

    updateName(): void;
    isDriver(): boolean;
    teleport(coord: EntityCoord): void;
}



interface EntityCoord {
    pos: Vector3Mp;
    rot: number;
    dim: number;
}