import { Component, OnInit, Inject } from '@angular/core';  
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Task} from '../shared/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(public dialog: MatDialog) {
    let jsonTasks = String(localStorage.getItem("Tasks"));
    let tasks = JSON.parse(jsonTasks) as Task[];
    this.Tasks = tasks;
  }

  public Tasks?:Task[];

  saveTasksToStorage() {
    localStorage.setItem("Tasks", JSON.stringify(this.Tasks));  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {taskName: ""},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || result == ""){
        return;
      }

      const newTask = new Task();
      newTask.Name = result;
  
      if (!this.Tasks){
        this.Tasks = new Array<Task>();
      }
  
      const previousTask = this.Tasks.find((element,index)=>{
        return element.Name == result;
      })
  
      if (!previousTask){
        this.Tasks.push(newTask);
        this.saveTasksToStorage();
      }
    });
  }

  deleteAllTasks() {
    this.Tasks = new Array<Task>();
    this.saveTasksToStorage();
  }

  deleteSelectedTasks() {
    let taskArray = this.Tasks;
    if (!taskArray){
      return;
    }

    const options = this.selectedTaskOptions;
    if (!options){
      return;
    }

    const selectedTasks:string[] = new Array<string>();
    for (const selectedTask of options){
      if(selectedTask && selectedTask.Name){
        selectedTasks.push(selectedTask.Name);
      }
    }

    for (const selectedTask of selectedTasks){
      const indexToRemove = taskArray.findIndex((element)=>{
        return element.Name == selectedTask;
      })

      taskArray.splice(indexToRemove, 1);
    }

    this.saveTasksToStorage();
  }

  ngOnInit(): void {
  }

  selectedTaskOptions?:Task[];
}

export interface DialogData {
  taskName: string
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}