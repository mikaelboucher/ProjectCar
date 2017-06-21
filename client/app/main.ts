import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import * as io from 'socket.io-client';

platformBrowserDynamic().bootstrapModule(AppModule);
