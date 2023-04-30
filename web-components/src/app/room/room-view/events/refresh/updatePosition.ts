import { Attendee } from "../RoomEvent";
import { AttendeeDataWithObject, DistanceData } from "./../../attendee-types"
import { create, all } from 'mathjs';

let initialAngle, changedAngle;

let math = create(all);
math.config({
  epsilon: 1e-50
});

export function updatePosition(attendee: Attendee) {
    let { angularVelocity, velocity } = attendee.physics;

    let directionalIncrease = angularVelocity,
      yIncrease = math.sin(attendee.data.direction - Math.PI / 2) * 50 * velocity,
      xIncrease = math.cos(attendee.data.direction - Math.PI / 2) * 50 * velocity;

    let direction = (attendee.data.direction + directionalIncrease) % (2 * Math.PI),
      y = attendee.data.y + yIncrease,
      x = attendee.data.x + xIncrease;
    let angle: number; // Collision angle
    let collisionDetected = false;

    // Detect collision
    if (Attendee._localAttendee) {
      let roomData = Attendee._roomData,
        distances = roomData.map(function (a: AttendeeDataWithObject) {
          let yDiff = Attendee._localAttendee!.data.data.y - a.data.data.y,
            xDiff = Attendee._localAttendee!.data.data.x - a.data.data.x;
          let distanceMathType = math.sqrt(
            Number(math.add(
              math.pow(yDiff, 2),
              math.pow(xDiff, 2)
            ))
          ),
            distance = distanceMathType as number;
          return {
            id: a.id,
            distance: distance
          };
        });
      let collisionBoundaryDistance = 25;
      let boundaryCrossingAttendeeDistanceData: DistanceData | undefined = distances.find((a: DistanceData) =>
        // @ts-ignore
        a.distance < collisionBoundaryDistance && a.id !== Attendee._localAttendee!.id);
      console.log(boundaryCrossingAttendeeDistanceData!)

      // Change position according to the boundary-crossing attendee
      if (boundaryCrossingAttendeeDistanceData) {
        collisionDetected = true;
        let firstBoundaryCrossingAttendeeId = boundaryCrossingAttendeeDistanceData!.id;

        let boundaryCrossingAttendee = Attendee._roomData.find((a: AttendeeDataWithObject) => a.id === firstBoundaryCrossingAttendeeId);

        if (boundaryCrossingAttendee) {
          let yDiff = boundaryCrossingAttendee!.data.data.y - Attendee._localAttendee!.data.data.y,
            xDiff = boundaryCrossingAttendee!.data.data.x - Attendee._localAttendee!.data.data.x;

          angle = math.atan2(
            yDiff,
            xDiff
          );
          // DEBUG
          console.log({yDiff, xDiff})


          let newPosition = {
            direction: direction,
            // @ts-ignore
            y: boundaryCrossingAttendee!.data.data.y + (math.sin(angle) * (collisionBoundaryDistance - boundaryCrossingAttendeeDistanceData!.distance)),
            // @ts-ignore
            x: boundaryCrossingAttendee!.data.data.x + (math.cos(angle) * (collisionBoundaryDistance - boundaryCrossingAttendeeDistanceData!.distance))
          };
          console.log(JSON.stringify({newPosition, angle}));

          console.log(angle);
          let angleApproximatesZero = Math.abs(angle) <= (Math.PI / 180);
          if (angleApproximatesZero) console.log('angleApproximatesZero')
          x = newPosition.x;
          y = newPosition.y;
          direction = newPosition.direction;
        }
      }
    }

    attendee.data.direction = direction;
    attendee.data.y = y;
    attendee.data.x = x;
}
