import { HttpClient } from "@angular/common/http";
import { Component, HostListener } from "@angular/core";
import { AttendeeData } from './attendee-types';
import { ViewBox, viewBox } from "./viewbox";
import { Attendee } from "./events";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent {
  userId = 1;

  roomData: AttendeeData[] = [];
  windowDims = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  viewBox: ViewBox = {
    translateX: 0,
    translateY: 0
  };
  constructor(private httpClient: HttpClient) {
    this.httpClient.get('/api/roomdata')
      .subscribe((response: any) => {
        this.roomData = response.data
          .map((data: AttendeeData) => ({
            ...data,
            data: new Attendee(data.data)
          }));
        this.setViewBox();
      })
  }

  ngOnInit() {}

  setViewBox() {
    let localAttendee = this.roomData.find((attendee) => attendee.user.id === this.userId);
    this.viewBox = viewBox(this.windowDims, localAttendee!.data);
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
