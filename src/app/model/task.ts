export class Task {
    taskId :  number;
    parentId :number;
    parentName:string;
    taskName:string="";
    startDate:Date = new Date();
    endDate:Date = new Date();
    priority:number;
    status:string
}