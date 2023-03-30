import { EventEmitter } from "@angular/core";
import { AttendeePositionData } from "../attendee-types";
import { updateDrag } from "./refresh/updateDrag";
import { updatePosition } from "./refresh/updatePosition";
import { updateVelocities } from "./refresh/updateVelocities";

export enum RoomEventTypes {
    TurnRight,
    TurnLeft,
    MoveForward,
    MoveBackward
};
export enum RoomEventStates {
    Issue,
    Terminate
};
export type RoomEventType = RoomEventTypes.TurnRight | RoomEventTypes.TurnLeft | RoomEventTypes.MoveForward | RoomEventTypes.MoveBackward
export type RoomEventState = RoomEventStates.Issue | RoomEventStates.Terminate;

// Terminal velocity in px/s
let terminalVelocity = 20;
export class Attendee {
    data: AttendeePositionData;
    _events: RoomEvent[] = [];
    onRefresh = new EventEmitter<any>();
    physics = {
        velocity: 0,
        angularVelocity: 0,
        drag: 0,
        angularDrag: 0
    };
    constructor(positionData: AttendeePositionData) {
        this.data = positionData;
    }
    refresh() {
        updateDrag(this);
        updateVelocities(this);
        updatePosition(this);
        this.onRefresh.emit();
    }
    playTimeline = () => {
        this.refresh();
        requestAnimationFrame(this.playTimeline);
    }
}
export class RoomEvent {
    event: RoomEventType;
    state: RoomEventState;
    firingTimestamp?: number;
    lastUpdated?: number;
    attendee: Attendee;
    constructor(attendee: Attendee, args: {
        event: RoomEventType,
        state: RoomEventState
    }) {
        this.event = args.event;
        this.state = args.state;
        this.attendee = attendee;
    }
    fire() {
        if (this.state == RoomEventStates.Issue) {
            this.firingTimestamp = Date.now();
            this.lastUpdated = this.firingTimestamp;
            this.attendee._events.push(this);
        } else if (this.state == RoomEventStates.Terminate)
            this.attendee._events = this.attendee._events.filter((e) => e.event !== this.event);
        else
            console.error('state is neither Issue nor Terminate.');
    }
}
