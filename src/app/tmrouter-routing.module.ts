import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
const routes: Routes = [
  {
    path :'',
    //component:ViewComponent
    redirectTo:'/viewTask',
    pathMatch:'full'
  },
  {
    path :'viewTask',
    component:ViewTaskComponent
  },
  {
    path :'addTask', 
    component: AddTaskComponent
  },
  {
    path :'edit',
    component:EditTaskComponent,
    outlet:'popup'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TmrouterRoutingModule { }
