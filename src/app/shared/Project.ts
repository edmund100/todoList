import { BooleanInput } from "@angular/cdk/coercion";
import { ProjectModel } from "./ProjectModel";

export class Project
{
   ProjectModel:ProjectModel;
   Selected?:BooleanInput;

   constructor(){
      this.ProjectModel = new ProjectModel();
   }
}