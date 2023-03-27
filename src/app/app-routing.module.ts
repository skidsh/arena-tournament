import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreateComponent } from './account-create/account-create.component';
import { ArenaLadderComponent } from './arena-ladder/arena-ladder.component';
import { ArmoryComponent } from './armory/armory.component';
import { CharacterViewComponent } from './character-view/character-view.component';
import { DownloadComponent } from './download/download.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/auth.guard';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: AccountCreateComponent },
  { path: 'help', component: DownloadComponent },
  { path: 'status', component: StatusComponent },
  { path: 'armory', component: ArmoryComponent },
  { path: 'armory/:name', component: CharacterViewComponent },
  { path: 'ladder', component: ArenaLadderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
