import { BooleanInput } from "@angular/cdk/coercion";
import { TaskModel } from "./TaskModel";
import {Item } from "./Item";

export class Task implements Item
{
   TaskModel:TaskModel;
   Selected?:BooleanInput;

   constructor(){
    this.TaskModel = new TaskModel();
   }

   static sort(tasks:Task[]){
      tasks = tasks.sort((n1,n2) => {

        if (!n1 || !n2 || !n1.TaskModel || !n2.TaskModel)
        {
          return 0;
        }
  
        if (n1.TaskModel.Name && n2.TaskModel.Name){
          if (n1.TaskModel.Name > n2.TaskModel.Name)
            return 1;
        
          if (n1.TaskModel.Name < n2.TaskModel.Name)
            return -1;
        }      
  
        return 0;
      });;
    }  
}