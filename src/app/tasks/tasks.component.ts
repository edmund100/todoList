import { Component, OnInit, Output, EventEmitter } from '@angular/core';  

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // create an internal variable (do not change manually)
  private _taskDescription:string;

  // getter function, called whenever the value is accessed
  get taskDescription(){
    return this._taskDescription;
  }

  // setter function, called whenever the value is set
  set taskDescription(text){
    this._taskDescription = text;
    localStorage.setItem("TaskDescription", this._taskDescription);
  }

  constructor() {
    let taskDescriptionOld = localStorage.getItem("TaskDescription");
    this._taskDescription= String(taskDescriptionOld);
   }

  ngOnInit(): void {
  }

  public dtoTasks: Task[] =
  [
    {"Description":"Dust the shelves"},
    {"Description":"Take out the trash"},
    {"Description":"Buy some paper towels"}
  ];

}

class Task 
{
   Description?:string;
}
