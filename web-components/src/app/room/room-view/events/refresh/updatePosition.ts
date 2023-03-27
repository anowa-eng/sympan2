import { Attendee } from "../RoomEvent";

export function updatePosition(attendee: Attendee) {
    let { angularVelocity, velocity } = attendee.physics;
    attendee.data.direction += angularVelocity;
    attendee.data.y += Math.sin(attendee.data.direction) * (180 / Math.PI) * velocity;
    attendee.data.x += Math.cos(attendee.data.direction) * (180 / Math.PI) * velocity;
}