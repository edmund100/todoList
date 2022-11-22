import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';  
import { MatDialog } from '@angular/material/dialog';
import {DataService} from '../data.service';
import {Task} from '../shared/Task';
import {EditDialog} from '../edit-dialog/edit-dialog.component';
import {TaskModel} from '../shared/TaskModel';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(public dialog: MatDialog, private Data: DataService) {

    // Get models.
    let taskModels = this.DataService.loadData();  

    // Map TaskModel to Task.
    let tasks = new Array<Task>();
    taskModels.forEach(taskModel => {
      const task = new Task();
      task.TaskModel.Name = taskModel.Name;
      tasks.push(task);
    });

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

    const elementsList = new Array<Task>();

    options.filter(element => element.Selected).forEach(
        element => {elementsList.push(element)});

    elementsList.forEach(element => {element.Selected = false;  });
  }

  editSelectedTask(){
    // Get selected task.
    const options = this.selectedTaskOptions;
    if (!options || options.length != 1){
      return;
    }

    let oldTaskName: string = options[0].TaskModel.Name || '';
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
        return element.TaskModel.Name == oldTaskName;
      })
  
      if (previousTask){
        previousTask.TaskModel.Name = result;
        this.saveTasksToTaskModels();  
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
      newTask.TaskModel.Name = result;
  
      if (!this.Tasks){
        this.Tasks = new Array<Task>();
      }
  
      const previousTask = this.Tasks.find((element,index)=>{
        return element.TaskModel.Name == result;
      })
  
      if (!previousTask){
        this.Tasks.push(newTask);
        this.saveTasksToTaskModels();  
      }

      Task.sort(this.Tasks);
    });
  }

  deleteAllTasks() {
    this.Tasks = new Array<Task>();
    this.DataService.clearData();
  }

  deleteSelectedTasks() {
    let taskArray = this.Tasks;
    const options = this.selectedTaskOptions;
    if (!taskArray || !options){
      return;
    }

    const selectedTasks:string[] = new Array<string>();

    options.filter(element => element.TaskModel.Name && element.Selected).forEach(
      element => {selectedTasks.push(element.TaskModel.Name ?? "")});

    for (const selectedTask of selectedTasks){
      const indexToRemove = taskArray.findIndex((element)=>{
        return element.TaskModel.Name == selectedTask;
      })

      taskArray.splice(indexToRemove, 1);
    }

    this.saveTasksToTaskModels();  
  }

  ngOnInit(): void {
  }

  selectedTaskOptions?:Task[];

  saveTasksToTaskModels(){

    const taskModels = new Array<TaskModel>();

    if (!this.Tasks) {
      return;
    }

    this.Tasks.forEach(task => {
      taskModels.push(task.TaskModel);
    });

    this.DataService.saveData(taskModels);
  }

}
