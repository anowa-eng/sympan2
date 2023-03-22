import { HttpClient } from "@angular/common/http";
import { Component, HostListener } from "@angular/core";
import { AttendeeData } from './attendee-types';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent {
  roomData?: AttendeeData[] | unknown = {};
  windowDims = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('/api/roomdata')
      .subscribe((data: unknown) => {
        this.roomData = data;
      })
  }

  @HostListener('window:resize')
  updateWindowDims() {
    this.windowDims = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
