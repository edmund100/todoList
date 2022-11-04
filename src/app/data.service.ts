import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  public Tasks?:Task[];

  public loadData(): Task[]{
    let jsonTasks = String(localStorage.getItem("Tasks"));
    let tasks = JSON.parse(jsonTasks) as Task[];
    return tasks;
  }
}
