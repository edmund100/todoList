import { Injectable } from '@angular/core';
import {TaskModel} from './shared/TaskModel';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  public loadData(): TaskModel[]{

    let jsonData = localStorage.getItem("Tasks");
    if (!jsonData){
      return new Array<TaskModel>();
    }

    let jsonString = String(jsonData);
    if (!jsonString)
    {
      return new Array<TaskModel>();
    }
  
    try{
      let tasks = JSON.parse(jsonString) as TaskModel[];
      return tasks;   
    }
    catch
    {
      return new Array<TaskModel>();
    }
  }

  public clearData(){
    localStorage.setItem("Tasks", JSON.stringify(new Array<TaskModel>())); 
  }

  public saveData(tasks?:TaskModel[]) {
    if (!tasks){
      return;
    }

    localStorage.setItem("Tasks", JSON.stringify(tasks));  
  }
}
