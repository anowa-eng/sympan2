import { RoomEvent } from '../RoomEvent';
import { Attendee, RoomEventTypes } from '../RoomEvent';

export function updateVelocities(attendee: Attendee) {
	let velocityUnitIncrease = 0.0075;
	let angularVelocityUnitIncrease = 0.003;

	attendee._events.forEach((ev: RoomEvent) => {
		const MILLISECONDS_PER_FRAME = 1000 * (1 / 60);
		let framesSinceUpdated = Math.round((Date.now() - ev.lastUpdated!) / MILLISECONDS_PER_FRAME);

		let velocityIncrease = velocityUnitIncrease * framesSinceUpdated;
		let angularVelocityIncrease = angularVelocityUnitIncrease * framesSinceUpdated;
		switch (ev.event) {
			case RoomEventTypes.MoveForward:
				attendee.physics.velocity += velocityIncrease;
				break;
			case RoomEventTypes.MoveBackward:
				attendee.physics.velocity -= velocityIncrease;
				break;
			case RoomEventTypes.TurnRight:
				attendee.physics.angularVelocity += angularVelocityIncrease;
				break;
			case RoomEventTypes.TurnLeft:
				attendee.physics.angularVelocity -= angularVelocityIncrease;
		}

		ev.lastUpdated = Date.now();
	});
	attendee.physics.velocity -= attendee.physics.drag;
	attendee.physics.angularVelocity -= attendee.physics.angularDrag;
}
