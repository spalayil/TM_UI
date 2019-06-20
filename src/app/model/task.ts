export class Task {
    taskId :  number;
    parentTask :number;
    parentName:string;
    task:string="";
    startDate:Date = new Date();
    endDate:Date = new Date();
    priority:number;
    status:string

}