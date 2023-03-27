import { Attendee } from "../RoomEvent";

export function updatePosition(attendee: Attendee) {
    let { angularVelocity, velocity } = attendee.physics;

    let directionalIncrease = angularVelocity,
      yIncrease = Math.sin(attendee.data.direction - Math.PI / 2) * (180 / Math.PI) * velocity,
      xIncrease = Math.cos(attendee.data.direction - Math.PI / 2) * (180 / Math.PI) * velocity;

    attendee.data.direction += directionalIncrease;
    attendee.data.y += yIncrease;
    attendee.data.x += xIncrease;
}
