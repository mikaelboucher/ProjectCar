import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { PrincipalComponent } from './components/principal.component';
import { BottomComponent } from './components/bottom.component';
import { TopComponent } from './components/top.component';
import { RightComponent } from './components/right.component';
import { LeftComponent } from './components/left.component';
import { CenterComponent } from './components/center.component';
import { CenterOptions } from './components/centercomponents/centeroptions.component';
import { CenterPrimary } from './components/centercomponents/centerprimary.component';
import { CenterSecondary } from './components/centercomponents/centersecondary.component';

@NgModule({
    imports: [ BrowserModule, HttpModule],

    declarations: [ AppComponent,
    PrincipalComponent,
    BottomComponent,
    TopComponent,
    RightComponent,
    LeftComponent,
    CenterComponent,
    CenterOptions,
    CenterPrimary,
    CenterSecondary ],

    bootstrap: [ AppComponent ],
    providers: []
})
export class AppModule { }
