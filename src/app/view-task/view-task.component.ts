import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Component,NgModule, VERSION, OnInit } from '@angular/core';
import { Pipe } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../service/shared.service';
import {Task} from '../model/task';
import {FilterdataPipe} from '../filterdata.pipe';
import {BrowserModule} from '@angular/platform-browser'

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  formGroup: FormGroup = null; 

  constructor(private sharedService:SharedService,private router : Router,
    private activatedRoute :ActivatedRoute,private formBuilder: FormBuilder) { 
      this.activatedRoute.params.subscribe(
              val=>{
              
               this.getTasks();
              }
      ); 
      this.getTasks();
      }
  tasks :Task[] ;
  display ='none';
  task :Task;
  taskEdit = new Task;
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
        this.ngOnInit();
        }, error => {
        alert("Task could not ended.");  
        this.getTasks(); 
   });
   }
   getTaskByTaskId(task:Task):void{ 
      this.taskEdit = task; 

    this.display='block'; //Set block css
   }

   EditFunction()
   {

    this.sharedService.updateTask(this.taskEdit).subscribe(
      data =>{
        console.log("edited");
        alert("Succesfully Edit");
        this.closeModalDialog();
      }
    )
   }
     
   deleteTask(id:number):void{     
    this.sharedService.deleteTask(id).subscribe( 
      status => {  
      alert("Are you sure you want to delete?");
      this.ngOnInit(); 
      }, error => {
      alert("Task could not deleted.");  
      this.getTasks(); 
  } );
   }

   closeModalDialog()
   {
    this.display='none';
   }
   parents :Task[];
   parentid :number;
  ngOnInit() { 
             var _builder = new FormBuilder();
             this.formGroup = _builder.group({});
             this.formGroup.addControl('taskcontrol', new
                 FormControl('',Validators.required)); 
            this.formGroup.addControl('prioritycontrol', new
                            FormControl('',Validators.required));        
             var validationcollection = [];
             validationcollection.push(Validators.required);
             this.formGroup.addControl('startdatecontrol', new
                 FormControl('', Validators.compose(validationcollection)));
             this.formGroup.addControl('enddatecontrol', new
                 FormControl('', Validators.compose(validationcollection)));
              this.sharedService.getTasks().subscribe(tasks=>this.parents=tasks);  
             this. parentid=1; 

     this.router.navigate([{outlets:{popup:null}}],
        {
          relativeTo:this.activatedRoute.parent
        });
     this.getTasks();
  }


}
