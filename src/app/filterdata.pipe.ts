import {  Injectable,Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common'

@Pipe({
  name: 'filterdata'
})
export class FilterdataPipe implements PipeTransform {

transform(tasks: any[], taskSearch: any , ParentName: any ,priorityTo:number, priorityFrom: number 
    ,StartDate:any, EndDate:any):any[]{
  if (tasks && tasks.length){
      return tasks.filter(task =>{

           console.log("ParentName::("+StartDate+ ")"+task.startDate);
             if (taskSearch && task.taskName.toLowerCase().indexOf(taskSearch.toLowerCase())===-1)
            {                
              return false;
             }
             if (ParentName && task.parentName.indexOf(ParentName.toLowerCase())   === -1){
              return false;
          }
          if (priorityFrom &&  priorityFrom > task.priority  ){
            return false;
          }
          if (priorityTo && priorityTo < task.priority){
            return false;
          }  
          if(StartDate   && StartDate != task.startDate){
            return false;
          }
          if(EndDate  && EndDate != task.endDate){
            return false;
          }          

          return true; 
     })
  }
  else{
      return tasks;
  }
}

}
