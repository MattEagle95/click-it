import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './modules/process/list/list.component';
import { ProcessComponent } from './modules/process/process.component';
import { GeneralComponent } from './modules/process/view/general/general.component';
import { ViewComponent } from './modules/process/view/view.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { SystemComponent } from './modules/system/system.component';
import { UserComponent } from './modules/user/user.component';


const routes: Routes = [
  {
    path: 'process',
    component: ProcessComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: ':id',
        component: ViewComponent,
        children: [
          {
            path: 'general',
            component: GeneralComponent,
          },
        ]
      },
    ]
  },
  { path: 'users', component: UserComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'system', component: SystemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
