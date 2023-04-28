import { Attendee } from "./events/RoomEvent";
import { Complex } from 'mathjs';

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

export interface DistanceData {
  id: number;
  distance: number | Complex;
}
