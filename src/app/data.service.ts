import { Injectable } from '@angular/core';
import {TaskModel} from './shared/TaskModel';
import {ProjectModel} from './shared/ProjectModel';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  public loadDataNew(): ProjectModel[]{

    let jsonData = localStorage.getItem("Projects");
    if (!jsonData){
      return new Array<ProjectModel>();
    }

    let jsonString = String(localStorage.getItem("Projects"));
    if (!jsonString)
    {
      return new Array<ProjectModel>();
    }

    try{
      let projects = JSON.parse(jsonString) as ProjectModel[];
      return projects;   
    }
    catch
    {
      return new Array<ProjectModel>();
    }
  }

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
