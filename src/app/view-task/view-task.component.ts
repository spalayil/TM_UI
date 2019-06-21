import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms'; 
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
      }, error => {
      alert("Task could not deleted.");  
      this.getTasks(); 
  } );
   }

   closeModalDialog()
   {
    this.display='none';
   }
   

  ngOnInit() { 
             // use the builder to create the  the form object
             var _builder = new FormBuilder();
             this.formGroup = _builder.group({});
             // Adding a simple validation
             this.formGroup.addControl('taskcontrol', new
                 FormControl('',Validators.required)); 
            this.formGroup.addControl('prioritycontrol', new
                            FormControl('',Validators.required));        
             // Adding a composite validation
             var validationcollection = [];
             validationcollection.push(Validators.required);
             // validationcollection.push(Validators.pattern
             // ('^(?:(?:10|12|0?[13578])/(?:3[01]|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$'));
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
