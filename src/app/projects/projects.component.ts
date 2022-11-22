import { Component, OnInit } from '@angular/core';
import {Project} from '../shared/Project';
import {DataService} from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import {EditDialog} from '../edit-dialog/edit-dialog.component';

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
      //  this.saveTasksToTaskModels();  
      }

      Project.sort(this.Projects);
    });
  }

  editSelectedProject() {

  }

  clearSelectedProjects() {

  }

  deleteAllProjects() {
    this.Projects = new Array<Project>();
  }

  deleteSelectedProjects(){

  }
}
