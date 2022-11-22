import { BooleanInput } from "@angular/cdk/coercion";
import { ProjectModel } from "./ProjectModel";
import {Item } from "./Item";

export class Project implements Item
{
   ProjectModel:ProjectModel;
   Selected?:BooleanInput;

   constructor(){
      this.ProjectModel = new ProjectModel();
   }

   static sort(projects:Project[]){
      projects = projects.sort((n1,n2) => {

        if (!n1 || !n2 || !n1.ProjectModel || !n2.ProjectModel)
        {
          return 0;
        }
  
        if (n1.ProjectModel.Name && n2.ProjectModel.Name){
          if (n1.ProjectModel.Name > n2.ProjectModel.Name)
            return 1;
        
          if (n1.ProjectModel.Name < n2.ProjectModel.Name)
            return -1;
        }      
  
        return 0;
      });;
    }  
}