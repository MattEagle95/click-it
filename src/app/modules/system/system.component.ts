import * as Feather from 'feather-icons';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
  providers: [UserService, DecimalPipe]
})
export class SystemComponent implements AfterViewInit {

  systeminfo: any

  ngAfterViewInit() {
    Feather.replace();
  }

  constructor(private userService: UserService) {
    this.userService.getSystemInfo().subscribe((systeminfo) => {
      this.systeminfo = systeminfo
    })
  }

}
