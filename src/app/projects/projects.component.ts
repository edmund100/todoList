import { Component, OnInit } from '@angular/core';
import {Project} from '../shared/Project';
import {DataService} from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import {EditDialog} from '../edit-dialog/edit-dialog.component';
import { ProjectModel } from '../shared/ProjectModel';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  selectedProjectOptions?:Project[];

  Projects?:Project[];

  private DataService:DataService = new DataService();

  constructor(public dialog: MatDialog, private Data: DataService) {

    // Get models.
    let models = this.DataService.loadDataNew();  

    // Map TaskModel to Task.
    let projects = new Array<Project>();
    models.forEach(model => {
      const project = new Project();
      project.ProjectModel.Name = model.Name;
      projects.push(project);
    });

    this.Projects = projects;
    Project.sort(projects);
  }
  
  ngOnInit(): void {
  }

  openDialog(taskName: string, title: string){
    const dialogRef = this.dialog.open(EditDialog, {
      width: '500px',
      data: {taskName: taskName, title:title}
    });

    return dialogRef;
  }

  createProject() {
    const dialogRef = this.openDialog("", "Create Project");

    dialogRef.afterClosed().subscribe(result => {
      if (!result || result == ""){
        return;
      }

      const newProject = new Project();
      newProject.ProjectModel.Name = result;
  
      if (!this.Projects){
        this.Projects = new Array<Project>();
      }
  
      const previousProject = this.Projects.find((element,index)=>{
        return element.ProjectModel.Name == result;
      })
  
      if (!previousProject){
        this.Projects.push(newProject);
        this.saveData();  
      }

      Project.sort(this.Projects);
    });
  }

  editSelectedProject() {
    // Get selected task.
    const options = this.selectedProjectOptions;
    if (!options || options.length != 1){
      return;
    }

    let oldTaskName: string = options[0].ProjectModel.Name || '';
    if (oldTaskName == '') {
      return;
    }

    // Put up dialog with taskn name.
    const dialogRef = this.openDialog(oldTaskName, "Edit Task");

    dialogRef.afterClosed().subscribe(result => {
      if (!result || result == ""){
        return;
      }
  
      if (!this.Projects){
        this.Projects = new Array<Project>();
      }
  
      const previousTask = this.Projects.find((element,index)=>{
        return element.ProjectModel.Name == oldTaskName;
      })
  
      if (previousTask){
        previousTask.ProjectModel.Name = result;
        this.saveData();  
      }

      Project.sort(this.Projects);
    });
  }

  clearSelectedProjects() {
    const options = this.selectedProjectOptions;
    if (!options){
      return;
    }

    const elementsList = new Array<Project>();

    options.filter(element => element.Selected).forEach(
        element => {elementsList.push(element)});

    elementsList.forEach(element => {element.Selected = false;  });
  }

  deleteAllProjects() {
    this.Projects = new Array<Project>();
    this.DataService.clearData();
  }

  deleteSelectedProjects(){
    let projectArray = this.Projects;
    const options = this.selectedProjectOptions;
    if (!projectArray || !options){
      return;
    }

    const selectedTasks:string[] = new Array<string>();

    options.filter(element => element.ProjectModel.Name && element.Selected).forEach(
      element => {selectedTasks.push(element.ProjectModel.Name ?? "")});

    for (const selectedTask of selectedTasks){
      const indexToRemove = projectArray.findIndex((element)=>{
        return element.ProjectModel.Name == selectedTask;
      })

      projectArray.splice(indexToRemove, 1);
    }

    this.saveData();  
  }

  saveData(){

    const projectModels = new Array<ProjectModel>();

    if (!this.Projects) {
      return;
    }

    this.Projects.forEach(project => {
      projectModels.push(project.ProjectModel);
    });

    this.DataService.saveDataNew(projectModels);
  }
}
