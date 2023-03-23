import { AttendeePositionData } from './attendee-types';

export type ViewBox = {
    translateX: number;
    translateY: number;
}

export const viewBox = (windowDims: {
    width: number;
    height: number;
}, attendeePointOfView: AttendeePositionData): ViewBox => ({
    translateX: (windowDims.width / 2) - attendeePointOfView.x,
    translateY: (windowDims.height / 2) - attendeePointOfView.y
});