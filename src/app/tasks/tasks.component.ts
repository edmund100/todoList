import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';  
import { MatDialog } from '@angular/material/dialog';
import {DataService} from '../data.service';
import {Task} from '../shared/Task';
import {EditDialog} from '../tasks/edit-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(public dialog: MatDialog, private Data: DataService) {

    // how do we call the DataService? todo
    let tasks = this.DataService.loadData();
    this.Tasks = tasks;
    Task.sort(tasks);
  }

  private DataService:DataService = new DataService();

  public Tasks?:Task[];

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
        this.DataService.saveData(this.Tasks);
      }

      Task.sort(this.Tasks);
    });
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
        this.DataService.saveData(this.Tasks);
      }

      Task.sort(this.Tasks);
    });
  }

  deleteAllTasks() {
    this.Tasks = new Array<Task>();
    this.DataService.saveData(this.Tasks);
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

    this.DataService.saveData(this.Tasks);      
  }

  ngOnInit(): void {
  }

  selectedTaskOptions?:Task[];
}
