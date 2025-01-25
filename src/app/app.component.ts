import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet,CommonModule],
})
export class AppComponent {
  constructor() {}
}
