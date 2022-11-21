import { BooleanInput } from "@angular/cdk/coercion";

export class Project
{
   Name?:string;
   Tasks?:Task[];
   Selected?:BooleanInput;
}