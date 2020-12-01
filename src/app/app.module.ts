import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, NgbdModalConfirm, NgbdModalConfirmAutofocus } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcessModule } from './modules/process/process.module';
import { ConfigService } from './shared/config.service';
import { AuthComponent } from './modules/auth/auth.component';
import { UserComponent } from './modules/user/user.component';
import { ListComponent } from './modules/user/list/list.component';
import { SidebarComponent } from './modules/layout/sidebar/sidebar.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { SystemComponent } from './modules/system/system.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent,
    ListComponent,
    SettingsComponent,
    NgbdModalConfirm,
    NgbdModalConfirmAutofocus,
    SidebarComponent,
    HeaderComponent,
    SystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ProcessModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return () => {
          //Make sure to return a promise!
          return configService.loadConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalConfirm,
    NgbdModalConfirmAutofocus]
})
export class AppModule { }
