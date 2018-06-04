import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

//Componentes nuevos
import { UserEditComponent } from './components/userEdit.component';
import { UsersComponent  } from './components/users.component';
import { ToolsComponent } from './components/tools.component';
import { HomeComponent } from './components/home.component';
import { ProjectComponent } from './components/project.component';
import {ProjectEditComponent} from './components/projectEdit.component';
import { TeamComponent } from './components/team.component';
import { SearchComponent } from './components/search.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserEditComponent,
    ToolsComponent,
    HomeComponent,
    ProjectComponent,
    ProjectEditComponent,
    TeamComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }