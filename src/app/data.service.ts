import { Injectable } from '@angular/core';
import {TaskModel} from './shared/TaskModel';
import {ProjectModel} from './shared/ProjectModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  public loadDataNew(): ProjectModel[]{
    let jsonTasks = String(localStorage.getItem("Projects"));
    if (!jsonTasks)
    {
      return new Array<ProjectModel>();
    }
  
    try{
      let projects = JSON.parse(jsonTasks) as ProjectModel[];
      return projects;   
    }
    catch
    {
      return new Array<ProjectModel>();
    }
  }


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
    localStorage.setItem("Tasks", JSON.stringify(new Array<TaskModel>())); 
    localStorage.setItem("Projects", JSON.stringify(new Array<ProjectModel>())); 
  }

  public saveDataNew(projects?:ProjectModel[]){
    if (!projects){
      return;
    }

    localStorage.setItem("Projects", JSON.stringify(projects));  
  }

  public saveData(tasks?:TaskModel[]) {
    if (!tasks){
      return;
    }

    localStorage.setItem("Tasks", JSON.stringify(tasks));  
  }
}
