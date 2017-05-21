import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app.component';
import { PrincipalComponent } from './components/principal.component';
import { BottomComponent } from './components/bottom.component';
import { TopComponent } from './components/top.component';
import { RightComponent } from './components/right.component';
import { LeftComponent } from './components/left.component';
import { CenterComponent } from './components/center.component';

@NgModule({
    imports: [ BrowserModule ],

    declarations: [ AppComponent,
    PrincipalComponent,
    BottomComponent,
    TopComponent,
    RightComponent,
    LeftComponent,
    CenterComponent ],

    bootstrap: [ AppComponent ],
    providers: []
})
export class AppModule { }
