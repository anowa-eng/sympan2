import { Attendee } from "./events/RoomEvent";

export interface AttendeeUserProfileSourceData {
    avatar: string;
}

export interface AttendeeUserData {
    username: string;
    id: number;
    profile: AttendeeUserProfileSourceData;
}

export interface AttendeePositionData {
    x: number;
    y: number;
    direction: number;
}

export interface AttendeeData {
    id: number;
    user: AttendeeUserData;
    room: number;
    data: AttendeePositionData;
}

export interface AttendeeDataWithObject {
    id: number;
    user: AttendeeUserData;
    room: number;
    data: Attendee;
}
