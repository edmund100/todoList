import { Component, OnInit, Output, EventEmitter } from '@angular/core';  

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // create an internal variable (do not change manually)
  private _taskDescription?:string;

  public Tasks?:Task[];

  // getter function, called whenever the value is accessed
  get taskDescription(){
    return this._taskDescription;
  }

  deleteAllTasks() {
    this.Tasks = new Array<Task>();
    localStorage.setItem("Tasks", JSON.stringify(this.Tasks));
  }

  createTask(){
    const taskDescription = this._taskDescription;
    const newTask = new Task();
    newTask.Description = taskDescription;

    if (!this.Tasks){
      this.Tasks = new Array<Task>();
    }

    const previousTask = this.Tasks.find((element,index)=>{
      return element.Description == taskDescription;
    })

    if (!previousTask){
      this.Tasks.push(newTask);
      localStorage.setItem("Tasks", JSON.stringify(this.Tasks));  
    }
  }

  // setter function, called whenever the value is set
  set taskDescription(text){
    this._taskDescription = text;
  }

  constructor() {
    let jsonTasks = String(localStorage.getItem("Tasks"));

    let tasks = JSON.parse(jsonTasks) as Task[];

    this.Tasks = tasks;
   }

  ngOnInit(): void {
  }

  public dtoTasks: Task[] =
  [
    {"Description":""}
  ];

}

class Task
{
   Description?:string;
}

class Project
{
  constructor(){
    this.Name ="";
  }

  Name:string;
  Tasks?:Task[];
}
