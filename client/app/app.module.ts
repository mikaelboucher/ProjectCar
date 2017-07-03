import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap';

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
import { Classfields } from './components/centercomponents/primarycomponents/classfields.component';
import { SingleClassfield } from './components/centercomponents/primarycomponents/singleclassfield.component';
import { ListeClassfields } from './components/centercomponents/primarycomponents/listeclassfields.component';
import { OptionService } from './services/optionservice';

@NgModule({
    imports: [ BrowserModule, HttpModule, ModalModule.forRoot(), BrowserAnimationsModule],

    declarations: [
        AppComponent,
        PrincipalComponent,
        BottomComponent,
        TopComponent,
        RightComponent,
        LeftComponent,
        CenterComponent,
        CenterOptions,
        CenterPrimary,
        CenterSecondary,
        Classfields,
        SingleClassfield,
        ListeClassfields
    ],

    bootstrap: [ AppComponent ],
    providers: [OptionService]
})
export class AppModule { }
