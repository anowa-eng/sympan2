import { Attendee } from "../RoomEvent";

export function updateDrag(attendee: Attendee) {
    if (Math.abs(attendee.physics.velocity) < 0.025)
        attendee.physics.drag = 0;
    else
        attendee.physics.drag = attendee.physics.velocity / 30;

    if (Math.abs(attendee.physics.angularVelocity) < 0.025)
        attendee.physics.angularDrag = 0;
    else
        attendee.physics.angularDrag = attendee.physics.angularVelocity / 30;
}