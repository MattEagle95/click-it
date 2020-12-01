import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceEndpoint: string = "auth";

  constructor(private http: HttpClient, private configService: ConfigService, private tokenStorageService: TokenStorageService) { }

  public isAuthorized(): boolean {
    return !!this.tokenStorageService.getAccessToken();
  }

  public login(name: string, password: string): Observable<any> {
    return this.http.post(this.getUrl('login'), { name: name, password: password }).pipe(
      tap((data: any) => {
        console.log(data.token);
        this.tokenStorageService.setAccessToken(data.token);
      })
    )
  }

  private getUrl(endpoint: string): string {
    return `${this.configService.config.baseUrl}/${this.serviceEndpoint}/${endpoint}`;
  }

}
