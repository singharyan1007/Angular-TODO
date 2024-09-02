import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
export const routes: Routes = [
    {path:'',redirectTo:'tasks',pathMatch:'full'},
{path:'tasks',component:TaskListComponent,title:"Tasks List"},
{ path: 'tasks/edit/:id', component: TaskFormComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: '**', redirectTo: '/tasks' }
];
