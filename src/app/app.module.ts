import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BokehComponent } from './bokeh/bokeh.component';
import { CubeComponent } from './cube/cube.component';
import { CubeBComponent } from './cube-b/cube-b.component';
import { GameButtonComponent } from './game-button/game-button.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [					
    AppComponent,
      BokehComponent,
      CubeComponent,
      CubeBComponent,
      GameButtonComponent,
      DetailsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
