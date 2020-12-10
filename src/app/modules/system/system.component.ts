import * as Feather from 'feather-icons';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { DecimalPipe } from '@angular/common';
import { TabbarService } from 'src/app/shared/tabbar.service';

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

  constructor(private userService: UserService, private tabbarService: TabbarService) {
    this.userService.getSystemInfo().subscribe((systeminfo) => {
      this.systeminfo = systeminfo
    })
  }

  addTab() {
    this.tabbarService.addTab({ name: 'System', route: 'system' })
  }

}
