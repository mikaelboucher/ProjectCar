import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { OptionService } from './services/optionservice';
import { ClassifiedComponent } from './components/centercomponents/primarycomponents/classified/classifieds.component';
import { SingleClassified } from './components/centercomponents/primarycomponents/classified/singleclassified.component';
import { ListeClassified } from './components/centercomponents/primarycomponents/classified/listeclassifieds.component';
import { ClassifiedPageComponent } from './components/centercomponents/primarycomponents/classified/classifiedpage.component';
import { TwitterComponent } from './components/twitter.component';
import { PostAdComponent } from './components/centercomponents/primarycomponents/postad.component';
import { ImgCropperComponent } from './components/centercomponents/primarycomponents/imgcropper.component';

@NgModule({
    imports: [ BrowserModule, HttpModule, FormsModule, ModalModule.forRoot(), BrowserAnimationsModule],

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
        TwitterComponent,
        ClassifiedComponent,
        SingleClassified,
        ListeClassified,
        ClassifiedPageComponent,
        PostAdComponent,
        ImgCropperComponent
    ],

    bootstrap: [ AppComponent ],
    providers: [
        OptionService
    ]
})
export class AppModule { }
