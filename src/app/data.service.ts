import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Task} from './shared/Task';
import {TaskModel} from './shared/TaskModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  public loadData(): TaskModel[]{
    let jsonTasks = String(localStorage.getItem("Tasks"));
    if (!jsonTasks)
    {
      return new Array<TaskModel>();
    }
  
    try{
      let tasks = JSON.parse(jsonTasks) as TaskModel[];
      return tasks;   
    }
    catch
    {
      return new Array<TaskModel>();
    }
  }

  public clearData(){
    const tasks = new Array<Task>();
    localStorage.setItem("Tasks", JSON.stringify(tasks)); 
  }

  public saveData(tasks?:Task[]) {
    if (!tasks){
      return;
    }

    localStorage.setItem("Tasks", JSON.stringify(tasks));  
  }
}
