import { Attendee } from "../RoomEvent";

export function updateDrag(attendee: Attendee) {
    if (Math.abs(attendee.physics.velocity) < 0.0075) {
        attendee.physics.velocity = 0;
        attendee.physics.drag = 0;
    } else {
        attendee.physics.drag = attendee.physics.velocity / 22.5;
    }

    if (Math.abs(attendee.physics.angularVelocity) < 0.003) {
        attendee.physics.angularVelocity = 0;
        attendee.physics.angularDrag = 0;
    } else
        attendee.physics.angularDrag = attendee.physics.angularVelocity / 22.5;
}
