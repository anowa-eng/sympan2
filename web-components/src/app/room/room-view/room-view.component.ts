import { HttpClient } from "@angular/common/http";
import { Component, HostListener } from "@angular/core";
import { AttendeeData, AttendeeDataWithObject } from './attendee-types';
import { Attendee, RoomEvent, RoomEventStates, RoomEventType, RoomEventTypes } from "./events/RoomEvent";
import { ViewBox, viewBox } from "./viewbox";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent {
  userId = 1;

  roomData: AttendeeDataWithObject[] = [];
  windowDims = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  viewBox: ViewBox = {
    translateX: 0,
    translateY: 0,
    rotate: 0
  };

  localAttendee?: AttendeeDataWithObject;

  keyboardMappings: { [key: string]: RoomEventType } = {
    ArrowUp: RoomEventTypes.MoveForward,
    ArrowDown: RoomEventTypes.MoveBackward,
    ArrowLeft: RoomEventTypes.TurnLeft,
    ArrowRight: RoomEventTypes.TurnRight,

    KeyW: RoomEventTypes.MoveForward,
    KeyS: RoomEventTypes.MoveBackward,
    KeyA: RoomEventTypes.TurnLeft,
    KeyD: RoomEventTypes.TurnRight
  }

  PI = Math.PI;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('/api/roomdata')
      .subscribe((response: any) => {
        this.roomData = response.data.map((attendee: AttendeeData) => ({
          ...attendee,
          data: new Attendee(attendee.data)
        }));
        this.localAttendee = this.roomData.find((attendee) => attendee.user.id === this.userId);
        this.roomData.forEach((attendee: AttendeeDataWithObject) => {
          attendee.data.playTimeline();
          attendee.data.onRefresh.subscribe(() => {
            this.setViewBox();
          });
        });
        this.onInit();
      })
  }

  onInit() {
  }

  setViewBox() {
    this.viewBox = viewBox(this.windowDims, this.localAttendee!.data.data);
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.localAttendee) {
      let roomEvent = new RoomEvent(this.localAttendee.data, {
        event: this.keyboardMappings[event.code],
        state: RoomEventStates.Issue
      });
      let eventOfTypeExists = this.localAttendee.data._events.map((ev) => ev.event).includes(roomEvent.event);
      if (!eventOfTypeExists) roomEvent.fire();
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (this.localAttendee!) {
      let roomEvent = new RoomEvent(this.localAttendee!.data, {
        event: this.keyboardMappings[event.code],
        state: RoomEventStates.Terminate
      });
      roomEvent.fire();
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.windowDims = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.setViewBox();
  }
}
