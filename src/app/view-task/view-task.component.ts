import { Component,NgModule, VERSION, OnInit } from '@angular/core';
import { Pipe } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../service/shared.service';
import {Task} from '../model/task';
import {FilterdataPipe} from '../filterdata.pipe';
// Observable class extensions 
import {BrowserModule} from '@angular/platform-browser'

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private sharedService:SharedService,private router : Router,
    private activatedRoute :ActivatedRoute) { 
      this.activatedRoute.params.subscribe(
              val=>{
              
               this.getTasks();
              }
      ); 
      this.getTasks();
      }
  tasks :Task[] ;
  task :Task;
  title = 'View Task';
  filterdata :FilterdataPipe;
  status:boolean;
  statusMessage:string;
  getTasks():void{
    this.sharedService.getTasks().subscribe(tasks=>this.tasks=tasks);  
  }
  
  endTask(id:number):void{ 
    alert("reached");
     this.sharedService.endTask(id).subscribe( 
      status => {  
        alert("Are you sure you want to end the task?");
        }, error => {
        alert("Task could not ended.");  
        this.getTasks(); 
   });
   }
   getTaskByTaskId(id:number):void{ 
     alert("asdas");
    this.router.navigate([{outlets:{popup:'edit'}}]);
    this.sharedService.taskid =id; 
    alert(id);
   }
     
   deleteTask(id:number):void{     
    this.sharedService.deleteTask(id).subscribe( 
      status => {  
      alert("Are you sure you want to delete?");
      }, error => {
      alert("Task could not deleted.");  
      this.getTasks(); 
  } );
   }
   

  ngOnInit() { 

     this.router.navigate([{outlets:{popup:null}}],
        {
          relativeTo:this.activatedRoute.parent
        });
     this.getTasks();
  }


}
