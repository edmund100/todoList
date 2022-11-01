import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, OnInit, Inject } from '@angular/core';  
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
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
    this.updateSortedTasks();
  }

  public Tasks?:Task[];

  updateSortedTasks(){
    if (!this.Tasks){
      return;
    }

    this.Tasks = this.Tasks.sort((n1,n2) => {

      if (n1 && n1.Name && n2 && n2.Name){
        if (n1.Name > n2.Name)
          return 1;
      
        if (n1.Name < n2.Name)
          return -1;
      }      

      return 0;
    });;
  }

  // clear selected tasks
  clearSelectedTask() {    
    const options = this.selectedTaskOptions;
    if (!options){
      return;
    }

    options.filter(element => element.Selected).forEach(
        element => {element.Selected = false;});
  }

  editSelectedTask(){
    // Get selected task.
    const options = this.selectedTaskOptions;
    if (!options || options.length != 1){
      return;
    }

    let oldTaskName: string = options[0].Name || '';
    if (oldTaskName == '') {
      return;
    }

    // Put up dialog with taskn name.
    const dialogRef = this.openDialog(oldTaskName, "Edit Task");

    dialogRef.afterClosed().subscribe(result => {
      if (!result || result == ""){
        return;
      }
  
      if (!this.Tasks){
        this.Tasks = new Array<Task>();
      }
  
      const previousTask = this.Tasks.find((element,index)=>{
        return element.Name == oldTaskName;
      })
  
      if (previousTask){
        previousTask.Name = result;
        this.saveTasksToStorage();
      }

      this.updateSortedTasks();
    });
  }

  saveTasksToStorage() {
    localStorage.setItem("Tasks", JSON.stringify(this.Tasks));  
  }

  openDialog(taskName: string, title: string){
    const dialogRef = this.dialog.open(EditDialog, {
      width: '500px',
      data: {taskName: taskName, title:title}
    });

    return dialogRef;
  }

  createTask(): void {

    const dialogRef = this.openDialog("", "Create Task");

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

      this.updateSortedTasks();
    });
  }

  deleteAllTasks() {
    this.Tasks = new Array<Task>();

    this.saveTasksToStorage();
  }

  deleteSelectedTasks() {
    let taskArray = this.Tasks;
    const options = this.selectedTaskOptions;
    if (!taskArray || !options){
      return;
    }

    const selectedTasks:string[] = new Array<string>();

    options.filter(element => element.Name && element.Selected).forEach(
      element => {selectedTasks.push(element.Name ?? "")});

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
  taskName: string,
  title: string
}

@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.html',
})
export class EditDialog {
  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}