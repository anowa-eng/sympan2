import { AttendeePositionData } from "./attendee-types";

export enum RoomEventTypes {
    TurnRight, TurnLeft, MoveForward, MoveBackward
};
export enum RoomEventStates { Issue, Terminate };
export type RoomEventType = RoomEventTypes.TurnRight | RoomEventTypes.TurnLeft | RoomEventTypes.MoveForward | RoomEventTypes.MoveBackward;
export type RoomEventTask = RoomEventStates.Issue | RoomEventStates.Terminate;

export class Attendee {
    position: AttendeePositionData;
    _events: RoomEvent[] = [];
    constructor(positionData: AttendeePositionData) {
        this.position = positionData;
    }
}
export class RoomEvent {
    event: RoomEventType;
    task: RoomEventTask;
    timestamp?: Date;
    attendee: Attendee;
    constructor(attendee: Attendee, args: {
        event: RoomEventType,
        task: RoomEventTask
    }) {
        this.event = args.event;
        this.task = args.task;
        this.attendee = attendee;
    }
    fire() {
        switch (this.task) {
            case RoomEventStates.Issue:

        }
    }
}