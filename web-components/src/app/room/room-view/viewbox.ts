import { AttendeePositionData } from './attendee-types';

export type ViewBox = {
    translateX: number;
    translateY: number;
    rotate: number;
}

export const viewBox = (windowDims: {
    width: number;
    height: number;
}, attendeePointOfView: AttendeePositionData): ViewBox => ({
    translateX: (windowDims.width / 2) - attendeePointOfView.x,
    translateY: (windowDims.height / 2) - attendeePointOfView.y,
    // Convert direction to degrees
    rotate: attendeePointOfView.direction * (180 / Math.PI)
});
