import { Attendee } from "../RoomEvent";
import { AttendeeDataWithObject, DistanceData } from "./../../attendee-types"


export function updatePosition(attendee: Attendee) {
    let { angularVelocity, velocity } = attendee.physics;

    let directionalIncrease = angularVelocity,
      yIncrease = Math.sin(attendee.data.direction - Math.PI / 2) * (180 / Math.PI) * velocity,
      xIncrease = Math.cos(attendee.data.direction - Math.PI / 2) * (180 / Math.PI) * velocity;

    let direction = (attendee.data.direction + directionalIncrease) % (2 * Math.PI),
      y = attendee.data.y + yIncrease,
      x = attendee.data.x + xIncrease;
    let angle?: number; // Collision angle
    let collisionDetected = false;

    // Detect collision
    if (Attendee._localAttendee) {
      let roomData = Attendee._roomData,
        distances = roomData.map(function (a: AttendeeDataWithObject) {
          let distance = Math.hypot(
            Attendee._localAttendee!.data.data.y - a.data.data.y,
            Attendee._localAttendee!.data.data.x - a.data.data.x
          )
          return {
            id: a.id,
            distance: distance
          };
        });
      let collisionBoundaryDistance = 25;
      let boundaryCrossingAttendeeDistanceData: DistanceData | undefined = distances.find((a: DistanceData) =>
        a.distance < collisionBoundaryDistance && a.id !== Attendee._localAttendee!.id);

      // Change position according to the boundary-crossing attendee
      if (boundaryCrossingAttendeeDistanceData) {
        collisionDetected = true;
        let firstBoundaryCrossingAttendeeId = boundaryCrossingAttendeeDistanceData!.id;

        let boundaryCrossingAttendee = Attendee._roomData.find((a: AttendeeDataWithObject) => a.id === firstBoundaryCrossingAttendeeId);
        console.log(boundaryCrossingAttendee);

        if (boundaryCrossingAttendee) {
          angle = Math.atan2(
              boundaryCrossingAttendee!.data.data.y
            - Attendee._localAttendee!.data.data.y,
              boundaryCrossingAttendee!.data.data.x
            - Attendee._localAttendee!.data.data.x
          );
          console.log(Math.abs(Math.sin(angle)) > 1);

          let newPosition = {
            direction: direction,
            y: boundaryCrossingAttendee!.data.data.y + (Math.sin(angle) * (collisionBoundaryDistance - boundaryCrossingAttendeeDistanceData!.distance)),
            x: boundaryCrossingAttendee!.data.data.x + (Math.cos(angle) * (collisionBoundaryDistance - boundaryCrossingAttendeeDistanceData!.distance))
          };
          console.log((Math.sin(angle) * collisionBoundaryDistance));
          x = newPosition.x;
          y = newPosition.y;
          direction = newPosition.direction;
        }
      }
    }

    attendee.data.direction = direction;
    if (collisionDetected && Math.abs(Math.sin(angle!)) >= 0.00001) attendee.data.y = y;
    if (collisionDetected && Math.abs(Math.cos(angle!)) >= 0.00001) attendee.data.x = x;
}
