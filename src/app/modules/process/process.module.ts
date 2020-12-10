import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CreateComponent } from './create/create.component';
import { ProcessComponent } from './process.component';
import { DeployComponent } from './deploy/deploy.component';
import { ChartModule } from '../charts/number-chart/chart.module';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { ViewComponent } from './view/view.component';
import { AdvancedComponent } from './view/advanced/advanced.component';
import { GeneralComponent } from './view/general/general.component';

@NgModule({
  declarations: [
    ProcessComponent,
    CreateComponent,
    ListComponent,
    DeployComponent,
    ViewComponent,
    AdvancedComponent,
    GeneralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartModule,
    FeatherModule.pick(allIcons)
  ],
  exports: [
    ProcessComponent,
    CreateComponent,
    ListComponent
  ],
  providers: [],
  entryComponents: [CreateComponent]
})
export class ProcessModule { }
