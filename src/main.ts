
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules, withHashLocation, } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular,  } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, cameraOutline, clipboardOutline, sendOutline } from 'ionicons/icons';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';import { HashLocationStrategy } from '@angular/common';
addIcons({
   'clipboard-outline' : clipboardOutline,
   'camera-outline':cameraOutline,
   'send-outline':sendOutline,
   'add-outline':addOutline,
})

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   
    provideIonicAngular(),
    provideRouter(routes , withHashLocation()),
    
],
});