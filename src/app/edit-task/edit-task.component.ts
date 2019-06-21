import { Inject } from '@angular/core';
import { Component, OnInit,HostBinding , Input, Output  } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../service/shared.service';
import {Task} from '../model/task';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { DatePipe } from '@angular/common'
import { ViewTaskComponent } from '../view-task/view-task.component';
import { EventEmitter } from 'events';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material'
@Component({
  providers:[ViewTaskComponent],
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  submitted = false;
  task :Task;
  formGroup: FormGroup = null; 
  priorityOutputId :string;
  datePipe :DatePipe;
  //@Input()   tasks :Task[];
 // @Output() tasksChange = new EventEmitter();


constructor(private comp: ViewTaskComponent,private sharedService:SharedService,private router : Router,
 private activatedRoute :ActivatedRoute,private formBuilder: FormBuilder,private datePipeRaw: DatePipe,public dialogRef :MatDialogRef<EditTaskComponent>,
 @Inject(MAT_DIALOG_DATA) public data:Task)
{  
  
  this.task = new  Task();  
  var _builder = new FormBuilder();
  this.formGroup = _builder.group({}); 
  this.id=this.sharedService.taskid;
  this.datePipe=datePipeRaw;
}
  parents :Task[]; 
  parentid :number;
  title = 'Edit Task';  
  id:number;

ngOnInit() { 
       console.log("Inside edit Task!!");
       // the form object
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
         
      this.formGroup.addControl('startdatecontrol', new
        FormControl('', Validators.compose(validationcollection)));
      this.formGroup.addControl('enddatecontrol', new
          FormControl('', Validators.compose(validationcollection))); 
            this.sharedService.getTaskByTaskId(this.id).subscribe(task=>{
            this.task= new Task();
            this.task.taskName= task.TaskName;
            this.task.priority=task.Priority;
            this.task.startDate=task.StartDate;
            this.task.endDate=task.EndDate;  
            this.parentid=task.parentName; 
            this.sharedService.getTasks().subscribe(tasks=>this.parents=tasks);  
        if(this.task !=null){
          this.formGroup.controls['taskcontrol'].setValue(this.task.taskName);
          this.formGroup.controls['prioritycontrol'].setValue(this.task.priority);
          let latest_date =this.datePipe.transform(this.task.startDate, 'MM/dd/yyyy'); 
          this.formGroup.controls['startdatecontrol'].setValue(latest_date);
          latest_date =this.datePipe.transform(this.task.endDate, 'MM/dd/yyyy');
          this.formGroup.controls['enddatecontrol'].setValue(latest_date); 
         // this.parentid=this.task.parentName;  
        }        
          });//,5000
       // });         
  
 }
 Cancel(){
  this.router.navigate([{outlets:{popup:null}}])
}

onSubmit() {
  this.submitted = true; 
  let val =this.formGroup.value;
  // stop here if form is invalid
  if (this.formGroup.invalid) {
    alert('fail!! :-)')
      return;
  }
  else{ 

    this.sharedService.updateTask(this.task).subscribe( status => {  
    this.sharedService.status = status;  
    if(status ==true){
      alert('Record updated successfully'); 
     // this.sharedService.getTasks().subscribe(tasks=>this.comp.tasks=tasks);
      //this.router.navigate([this.comp.);
    this.router.routeReuseStrategy.shouldReuseRoute=function(){
     return false;
           }; 
           this.comp.ngOnInit();
    /*this.router.navigateByUrl('view.component.html',{skipLocationChange:true}).then(
       ()=>this.router.navigate(["ViewComponent"]));*/ 
               // y
      window.location.reload(); 
      
    }
      else
      alert('Task could not be updated.'); 
     // this.comp.ngOnInit();
    }); 

   //this.router.navigate([{outlets:{popup:null}}]); 
    this.router.navigate([{outlets:{popup:null}}],
      {
        relativeTo:this.activatedRoute.parent
      });
  }

}




}

