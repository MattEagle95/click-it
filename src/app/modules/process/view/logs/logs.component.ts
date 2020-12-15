import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { SocketService } from 'src/app/shared/socket.service';
import * as Feather from 'feather-icons';
import { SortableHeader } from 'src/app/shared/table/sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  providers: [ApiService, SocketService, DecimalPipe]
})
export class LogsComponent implements OnInit, AfterViewInit {

  ngAfterViewInit() {
    Feather.replace();
  }

  processId
  process
  logs = []
  scrolllock = false

  @ViewChild('logdiv', { static: false }) logdiv: ElementRef;

  constructor(public service: ApiService, private modalService: NgbModal, private socketService: SocketService, private route: ActivatedRoute) {
    console.log('view init')
  }

  ngOnInit() {
    this.processId = this.route.parent.snapshot.paramMap.get('id')

    this.socketService.describe(this.processId)
    this.socketService.getDescribe().subscribe(proc => {
      this.process = proc[0]

      this.socketService.getLog().subscribe(event => {
        if (event['process']['pm_id'].toString() === this.processId) {
          this.logs.push(event['data'])

          if (!this.scrolllock) {
            this.logdiv.nativeElement.scrollTop = this.logdiv.nativeElement.scrollHeight
          }
        }
      })
    })

    this.socketService.getEvent().subscribe(event => {
      console.log(event['event'] + ' - ' + event['process']['pm_id'])

      if (this.processId === event['process']['pm_id']) {
        console.log('proc exists')
      }
    })
  }

  scrollLock() {
    this.scrolllock = !this.scrolllock
  }
}
