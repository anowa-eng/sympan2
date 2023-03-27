import { HttpClient } from "@angular/common/http";
import { Component, HostListener } from "@angular/core";
import { AttendeeData, AttendeeDataWithObject } from './attendee-types';
import { Attendee, RoomEvent, RoomEventStates, RoomEventTypes } from "./events/RoomEvent";
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
    translateY: 0
  };

  localAttendee?: AttendeeDataWithObject;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('/api/roomdata')
      .subscribe((response: any) => {
        this.roomData = response.data.map((attendee: AttendeeData) => ({
          ...attendee,
          data: new Attendee(attendee.data)
        }));
        console.log(this.roomData);
        this.localAttendee = this.roomData.find((attendee) => attendee.user.id === this.userId);
        this.setViewBox();
        this.onInit();
      })
  }

  onInit() {
    // Debug.
    let attendee = this.localAttendee!.data;
    let roomEvent = new RoomEvent(attendee, {
      event: RoomEventTypes.MoveForward,
      state: RoomEventStates.Issue
    });
    roomEvent.fire();
    attendee.playTimeline();
    attendee.onRefresh.subscribe(() => {
      this.setViewBox()
    });
  }

  setViewBox() {
    this.viewBox = viewBox(this.windowDims, this.localAttendee!.data.data);
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
