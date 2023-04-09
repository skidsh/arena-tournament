import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyInput as MatInput, MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { NavComponent } from './nav/nav.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { ArmoryComponent } from './armory/armory.component';
import { DownloadComponent } from './download/download.component';
import { StatusComponent } from './status/status.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ArenaLadderComponent } from './arena-ladder/arena-ladder.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { CharacterViewComponent } from './character-view/character-view.component';
import { HomeComponent } from './home/home.component';
import { AzerothAPI } from "./shared/api.client.gen";
import { environment } from './../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner'
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar'
import { MatStepperModule } from '@angular/material/stepper'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { AutofocusDirective } from './shared/autoFocus';
import { ProfileComponent } from './profile/profile.component'
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { BlogComponent } from './blog/blog.component';
import { NgxEditorModule } from 'ngx-editor';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
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
