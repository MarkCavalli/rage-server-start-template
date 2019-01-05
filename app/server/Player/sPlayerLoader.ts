/// <reference path="../index.d.ts" />

import DB from '../Options/sDB';
import Logger from '../Options/sLogger';


export default class PlayerLoader {
    constructor(player: PlayerMp) {
        this.loadMethods(player);
    }

    loadMethods(player: PlayerMp) {
        player.updateName = function() {
            this.name = `${this.firstName} ${this.lastName}`;
        } 

        player.isDriver = function() {
            if (!this.vehicle || this.seat !== -1) return false;
            return true;
        }

        player.teleport = function(coord) {
            this.position = coord.pos;
            this.heading = coord.rot;
            this.dimension = coord.dim;
        }
    }
}