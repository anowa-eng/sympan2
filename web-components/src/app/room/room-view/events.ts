import { AttendeePositionData } from "./attendee-types";

export type RoomEventType = 'turn_right' | 'turn_left' | 'forward' | 'backward';
export type RoomEventTask = 'issue' | 'terminate';

export class Attendee {
    data: AttendeePositionData;
    constructor(positionData: AttendeePositionData) {
        this.data = positionData;
    }
}
export class RoomEvent {
    event: RoomEventType;
    task: RoomEventTask;
    timestamp: Date;
    attendee: Attendee;
    constructor(attendee: Attendee, args: {
        event: RoomEventType,
        task: RoomEventTask
    }) {
        this.event = args.event;
    }
}