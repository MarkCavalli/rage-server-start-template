require('./Auth/sLogin');
require('./Auth/sRegister');

/*
import * as AuthAbstract from './Auth/AuthSingletone';
import * as Misc from './Options/Misc';
import * as MySQL from './Options/MySQL';
import * as Nodemailer from './Options/Nodemailer';
*/




mp.events.addCommand({
    'pos' : (player) => { 
        const pos = player.position;
        let rot;
        if (player.vehicle) rot = player.vehicle.rotation.z
        else rot = player.heading;
        const str = `x: ${pos.x}, y: ${pos.y}, z: ${pos.z}, rot: ${rot}, dim: ${player.dimension}`;
        player.outputChatBox(str);
    },

    'v' : (player, fullText, model: string) => {
        const pos = player.position;
        const vehicle = mp.vehicles.new(RageEnums.Hashes.Vehicle.HYDRA, new mp.Vector3(pos.x, pos.y, pos.z), {
			heading: player.heading,
			dimension: player.dimension,
		});
        player.putIntoVehicle(vehicle, -1);
    },
});

