import { HttpClient } from "@angular/common/http";
import { Component, HostListener } from "@angular/core";
import { AttendeeData } from './attendee-types';
import { viewBox } from "./viewbox";

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
  viewBox = viewBox;
  constructor(private httpClient: HttpClient) {
    this.httpClient.get('/api/roomdata')
      .subscribe((response: any) => {
        this.roomData = response.data;
      })
  }

  ngOnInit() {
  }

  @HostListener('window:resize')
  updateWindowDims() {
    this.windowDims = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    let localAttendee = this.roomData.find((attendee) => attendee.user.id === this.userId);
    this.viewBox = viewBox(this.windowDims, localAttendee!.data)
  }
}
