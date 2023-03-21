import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component } from "@angular/core";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent {
  data?: unknown;
  windowDims = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  });
  junk = {
    stringifiedWindowDims: () => JSON.stringify(this.windowDims())
  };
  constructor(private httpClient: HttpClient, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.httpClient.get('/api/roomdata')
      .subscribe((res: unknown) => {
        this.data = JSON.stringify(res);
      })
  }
}
