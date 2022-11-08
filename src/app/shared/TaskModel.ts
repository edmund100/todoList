export class Task
{
   Name?:string;

   static sort(tasks:Task[]){
      tasks = tasks.sort((n1,n2) => {
  
        if (n1 && n1.Name && n2 && n2.Name){
          if (n1.Name > n2.Name)
            return 1;
        
          if (n1.Name < n2.Name)
            return -1;
        }      
  
        return 0;
      });;
    }  
}