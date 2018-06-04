import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importo los componentes..
import { UserEditComponent } from './components/userEdit.component';
import { UsersComponent } from './components/users.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ToolsComponent } from './components/tools.component';
import { ProjectComponent } from './components/project.component';
import { TeamComponent } from './components/team.component';
import { SearchComponent } from './components/search.component';
import { ProjectEditComponent } from './components/projectEdit.component';

// Defino el arreglo de rutas
const appRutes: Routes = [
    { path: 'login', component: AppComponent },
    { path: 'home', component: HomeComponent },
    { path: 'tools', component: ToolsComponent },
    { path: 'project', component: ProjectComponent },
    { path: 'project/:id', component: ProjectEditComponent},
    { path: 'teams', component: TeamComponent },
    { path: 'users', component: UsersComponent },
    { path: 'edit-user/:id', component: UserEditComponent },
    { path: 'search', component: SearchComponent }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRutes);