import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Task} from './shared/Task';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  public loadData(): Task[]{
    let jsonTasks = String(localStorage.getItem("Tasks"));
    if (!jsonTasks)
    {
      return new Array<Task>();
    }
  
    try{
      let tasks = JSON.parse(jsonTasks) as Task[];
      return tasks;   
    }
    catch
    {
      return new Array<Task>();
    }
  }

  public saveData(tasks?:Task[]) {
    if (!tasks){
      return;
    }

    localStorage.setItem("Tasks", JSON.stringify(tasks));  
  }
}
