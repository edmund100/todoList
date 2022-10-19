import { Component, OnInit, Output, EventEmitter } from '@angular/core';  

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // create an internal variable (do not change manually)
  private _taskDescription?:string;

  // getter function, called whenever the value is accessed
  get taskDescription(){
    return this._taskDescription;
  }

  // setter function, called whenever the value is set
  set taskDescription(text){
    this._taskDescription = text;

    let newTask = new Task();
    newTask.Description = text;

    let newTasks = new Array<Task>();
    newTasks.push(newTask);

    localStorage.setItem("Tasks", JSON.stringify(newTasks));
  }

  constructor() {
    let jsonTasks = String(localStorage.getItem("Tasks"));

    let tasks = JSON.parse(jsonTasks) as Task[];
    if (tasks)
    {
      this._taskDescription = tasks[0].Description?.toString();  
    }
    else{
      this._taskDescription= "";
    }
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
