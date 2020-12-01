import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serviceEndpoint: string = "pm2";

  constructor(private http: HttpClient, private configService: ConfigService, private tokenStorageService: TokenStorageService) { }

  start(name: string, script: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenStorageService.getAccessToken()
    });

    return this.http.post(this.getUrl('start'), { name: name, script: script }, { headers: headers });
  }

  stop(name: string) {
    return this.http.post(this.getUrl('stop'), { name: name });
  }

  restart(name: string) {
    return this.http.post(this.getUrl('restart'), { name: name });
  }

  reload(name: string) {
    return this.http.post(this.getUrl('reload'), { name: name });
  }

  describe(name: string) {
    return this.http.post(this.getUrl('describe'), { name: name });
  }

  list(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenStorageService.getAccessToken()
    });

    return this.http.get(this.getUrl('list'), { headers: headers });
  }

  flush(name: string) {
    return this.http.post(this.getUrl('flush'), { name: name });
  }

  reloadLogs(name: string) {
    return this.http.post(this.getUrl('reloadlogs'), { name: name });
  }

  logs(name: string) {
    return this.http.get(`${this.getUrl('logs')}?name=${name}`, { responseType: 'text' });
  }

  private getUrl(endpoint: string): string {
    return `${this.configService.config.baseUrl}/${this.serviceEndpoint}/${endpoint}`;
  }
}
