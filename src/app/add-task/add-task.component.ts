import { Component, OnInit,HostBinding } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../service/shared.service';
import {Task} from '../model/task';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  submitted = false;
  task :Task;
  formGroup: FormGroup = null; // Create object of FormGroup
  priorityOutputId :string;
  constructor(private sharedService:SharedService,private router : Router,
    private activatedRoute :ActivatedRoute,private formBuilder: FormBuilder) 
  {
     this.task = new  Task(); 
     this.task.priority = 0;
     var _builder = new FormBuilder();
      this.formGroup = _builder.group({}); // Use the builder to create object
  }
parents :Task[];
 
selectedLevel :Task;
  title = 'Add Task'; 
  parentid :number;
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
  }

  onClose(){
    this.router.navigate([{outlets:{popup:null}}])
  }
  Reset(){
  this.task.priority=0;
   this.ngOnInit(); 

  }

  closeAddViaParent(){
   //this.router.navigate([{outlets:{popup:null}}])
  } 

  onSubmit() {
      this.submitted = true; 
      let val =this.formGroup.value;
      // stop here if form is invalid
      if (this.formGroup.invalid) {
        alert('Validation error.')
          return;
      }
      alert(this.task.taskName);
      this.sharedService.addTask(this.task).subscribe( status => {  
        alert(status);
      this.sharedService.status = status;  
        if(status ==true)
          alert('Record added successfully'); 
          else
          alert('Task could not be added.'); 
          this.router.navigate([{outlets:{popup:null}}]);
          window.location.reload(); 
        }); 
 
  }
}
