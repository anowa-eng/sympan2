import { AttendeePositionData } from './attendee-types';

export const viewBox = (windowDims: {
    width: number;
    height: number;
}, attendeePointOfView: AttendeePositionData) => ({
    translateX: (windowDims.width / 2) - attendeePointOfView.x,
    translateY: (windowDims.height / 2) - attendeePointOfView.y
});