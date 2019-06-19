import {  Injectable,Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common'

@Pipe({
  name: 'filterdata'
})
export class FilterdataPipe implements PipeTransform {

  Status:boolean;
  //private datepipe: DatePipe
// constructor(private datepipe: DatePipe) {} 
transform(tasks: any[], taskSearch: string , ParentName: string
  //, companySearch: string
  ,priorityTo:number, priorityFrom: number ,StartDate:string, EndDate:string
):any[]{
  if (tasks && tasks.length){
      return tasks.filter(task =>{

             this.Status =true;
             if (taskSearch && task.TaskName.toLowerCase().indexOf(taskSearch.toLowerCase()) 
             === -1){
              this.Status =false;
             }
             if (ParentName && task.ParentName.toLowerCase().indexOf(ParentName.toLowerCase())
           === -1){
              this.Status =false;
          }
          if (priorityFrom &&  priorityFrom > task.Priority  ){
              this.Status =false;
          }
          if (priorityTo && priorityTo < task.Priority){
              this.Status =false;
          }  
          if(StartDate !=null && StartDate !=undefined){
              let startDatesArr=StartDate.split('/');
              let srchStartDate = new Date(startDatesArr[1]+'/'+startDatesArr[0]+'/'+startDatesArr[2]);
              let dbStartDate = new Date(task.StartDate);
              if(StartDate &&  srchStartDate > dbStartDate){
                  this.Status =false;
              }
          }
          if(EndDate !=null && EndDate !=undefined){
              let dbEndDate = new Date(task.EndDate);
              let endDateArr=EndDate.split('/');
              let srchEndDate = new Date(endDateArr[1]+'/'+endDateArr[0]+'/'+endDateArr[2]);
  
              if(EndDate &&  srchEndDate <  dbEndDate){
                  this.Status =false;
              }
          }          

          return this.Status; 
     })
  }
  else{
      return tasks;
  }
}

}
