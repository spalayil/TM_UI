import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; 
import {Observable, of } from 'rxjs';
import {Task } from '../model/task';
import { CommonModule } from '@angular/common';   
import { HttpHeaders } from '@angular/common/http'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   private API_URL= "http://localhost:9000";
    task: Task  ;
    status:boolean;
    taskid :number;
    tasks : Task[];
  constructor(private http: HttpClient) { }

  getTasks():Observable<Task[]>{     
      let headers = new HttpHeaders();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      let options =  ({ headers: headers });  
     return this.http.get < Task[] > (this.API_URL+'/api/task' ,options);
  }

   getTaskByTaskId(id:number): any{ 
      let headers = new HttpHeaders();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Al low-Methods','GET,PUT,POST,DELETE');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      let options =  ({ headers: headers });  
    return this.http.get< Task>(this.API_URL+'/api/task/getTask/' + id,options);  
  }

  updateTask(task: Task): Observable<boolean> {  
      let headers = new HttpHeaders();
      headers.append('Content-Type','application/json');
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE, OPTIONS');
      headers.append('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token');
      let options =  ({ headers: headers });  
    return this.http.put<boolean>(this.API_URL+'/api/task/update/'+task.taskId,  
    task ,options);  
  }



  addTask(task: Task):Observable<boolean>{  
      return ( this.http.post<boolean>(this.API_URL+'/api/task/addTask',  task) ) ;
  } 

  deleteTask(id :number):Observable<boolean>{ 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return (this.http.delete<boolean>(this.API_URL+'/api/task/deletetask/' + id,  
    httpOptions))  ;

}

endTask(id :number):Observable<boolean>{ 
  alert("asdasd");  
  return (this.http.put<boolean>(this.API_URL+'/api/task/endtask/' + id, null))  ;

 } 
  updateTask1(task: Task):Observable<Task[]>{ 
    const httpOptions = { headers: new 
      HttpHeaders({ 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, OPTIONS'}) };  
   if( this.http.put<Task>(this.API_URL+'/api/task',  
    task, httpOptions) ){
      this.status=true;
    }
    else
    this.status=false;
    //.subscribe(task=>this.task=task); //
    //this.tasks.push(task);
   // this.getTasks();
    return of(this.tasks);
  } 
}