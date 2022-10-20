import { Component, OnInit } from '@angular/core';  
import { ConnectableObservable } from 'rxjs';

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

  saveTasksToStorage() {
    localStorage.setItem("Tasks", JSON.stringify(this.Tasks));  
  }

  deleteAllTasks() {
    this.Tasks = new Array<Task>();
    this.saveTasksToStorage();
  }

  deleteSelectedTasks() {

    let taskArray = this.Tasks;
    if (!taskArray){
      return;
    }

    const options = this.selectedTaskOptions;
    if (!options){
      return;
    }

    const selectedTasks:string[] = new Array<string>();
    for (const selectedTask of options){
      if(selectedTask && selectedTask.Description){
        selectedTasks.push(selectedTask.Description);
      }
    }

    for (const selectedTask of selectedTasks){
      const indexToRemove = taskArray.findIndex((element)=>{
        return element.Description == selectedTask;
      })

      taskArray.splice(indexToRemove, 1);
    }

    this.saveTasksToStorage();
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

  selectedTaskOptions?:Task[];
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
