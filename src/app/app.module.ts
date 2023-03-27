import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './nav/nav.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { ArmoryComponent } from './armory/armory.component';
import { DownloadComponent } from './download/download.component';
import { StatusComponent } from './status/status.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ArenaLadderComponent } from './arena-ladder/arena-ladder.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CharacterViewComponent } from './character-view/character-view.component';
import { HomeComponent } from './home/home.component';
import { AzerothAPI } from "./shared/api.client.gen";
import { environment } from './../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatStepperModule } from '@angular/material/stepper'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AutofocusDirective } from './shared/autoFocus';
import { ProfileComponent } from './profile/profile.component'
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { BlogComponent } from './blog/blog.component';
import { NgxEditorModule } from 'ngx-editor';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MyCharactersComponent } from './my-characters/my-characters.component';
import { CharacterRowComponent } from './character-row/character-row.component';
import { AccountManagmentComponent } from './account-managment/account-managment.component';
import { UpdateUsernameComponent } from './account-managment/update-username/update-username.component';
import { UpdatePasswordComponent } from './account-managment/update-password/update-password.component';
import { UpdateEmailComponent } from './account-managment/update-email/update-email.component';
import { StatsComponent } from './stats/stats.component';


@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        AccountCreateComponent,
        ArmoryComponent,
        DownloadComponent,
        StatusComponent,
        FooterComponent,
        LoginComponent,
        ArenaLadderComponent,
        CharacterViewComponent,
        HomeComponent,
        AutofocusDirective,
        ProfileComponent,
        BlogComponent,
        ConfirmDialogComponent,
        MyCharactersComponent,
        CharacterRowComponent,
        AccountManagmentComponent,
        UpdateUsernameComponent,
        UpdatePasswordComponent,
        UpdateEmailComponent,
        StatsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatSnackBarModule,
        NgxEditorModule,
        MatDialogModule,
        MatChipsModule
    ],
    providers: [
        AzerothAPI.Client,
        {
            provide: AzerothAPI.API_BASE_URL,
            useValue: environment.API_BASE_URL
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
