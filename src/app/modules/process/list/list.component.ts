import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, interval, Observable, of, pipe, Subject, throwError, timer } from 'rxjs';
import { delay, flatMap, repeat, takeUntil, repeatWhen, retryWhen, take, concatMap, tap, delayWhen } from 'rxjs/operators';
import { CreateComponent } from '../create/create.component';
import * as Feather from 'feather-icons';
import { SortableHeader, SortEvent } from 'src/app/shared/table/sortable.directive';
import { ApiService } from 'src/app/shared/api.service';
import { SocketService } from 'src/app/shared/socket.service';
import { element } from 'protractor';
import { TabbarService } from 'src/app/shared/tabbar.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ApiService, SocketService, DecimalPipe]
})
export class ListComponent implements AfterViewInit {

  ngAfterViewInit() {
    Feather.replace();
  }

  countries$: Observable<Process[]>;
  total$: Observable<number>;
  systeminfo$: Observable<any>;
  systeminfotext: any;

  data: any[];

  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  constructor(public service: ApiService, private modalService: NgbModal, private socketService: SocketService, private tabbarService: TabbarService) {
    this.countries$ = service.countries$
    this.total$ = service.total$
    socketService.sendMessage('hi')
    socketService.getMessage().subscribe(msg => {
      console.log(msg)
    })

    this.countries$.subscribe(c => {
      console.log(c)
      this.data = c
    });

    socketService.getDeleted().subscribe(event => {
      console.log('delete')
      console.log(event)
      let index = this.data.findIndex(element => element.name === event)
      this.data.splice(index, 1);
      return;
    })

    socketService.getEvent().subscribe(event => {
      console.log('process: ' + event['process']['status'])

      if (event['event'] === 'online') {
        console.log('online2')
        let proc: Process = this.data.find(element => element.pm_id === event['process']['pm_id'])

        if (!proc) {
          console.log(event['uiprocess'][0])
          this.data.push(event['uiprocess'][0])
        }

        return;
      }

      let proc: Process = this.data.find(element => element.pm_id === event['process']['pm_id'])
      if (proc) {
        proc.pm2_env.status = event['process']['status']
        proc.pm2_env.pm_uptime = event['process']['pm_uptime']
      }
    })
  }

  addTab() {
    this.tabbarService.addTab({ name: 'Process list', route: 'process' })
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  processesObs: Subject<Process[]> = new Subject();
  processes: Process[] = [];
  logstr;
  loadingObs: Subject<boolean>[] = [];
  loading: boolean[] = [];

  getProcesses() {
    return this.processes.filter(x => x.name !== 'piwatch');
  }

  getMainProcess() {
    let process = this.processes.filter(x => x.name === 'piwatch');
    if (process && process.length === 1) {
      return process[0];
    }

    return null;
  }

  create() {
    console.log('test')
    const modalRef = this.modalService.open(CreateComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }

  status() {
    this.service.list()
      .subscribe((processes: Process[]) => {
        this.processes = processes;
        console.log(processes);
      });
  }

  logs(name: string) {
    this.service.logs(name)
      .subscribe((data) => {
        console.log(data);
        this.logstr = data;
      });
  }

  reload(name: string) {
    this.service.reload(name)
      .subscribe((data) => {
        console.log(data);
      });
  }

  flush(name: string) {
    this.service.reload(name)
      .subscribe((data) => {
        console.log(data);
      });
  }

  checkLoading(action: string, name: string): boolean {
    if (!this.loading[action + '-' + name]) {
      return false;
    }

    return this.loading[action + '-' + name];
  }

  restart(name: string) {
    this.socketService.restart(name)
  }

  stop(name: string) {
    this.socketService.stop(name)
  }

  deleteProcess(name: string) {
    this.socketService.delete(name)
  }

}
