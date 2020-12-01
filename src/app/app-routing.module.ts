import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessComponent } from './modules/process/process.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { SystemComponent } from './modules/system/system.component';
import { UserComponent } from './modules/user/user.component';


const routes: Routes = [
  { path: 'processes', component: ProcessComponent },
  { path: 'users', component: UserComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'system', component: SystemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
