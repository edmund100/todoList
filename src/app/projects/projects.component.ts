import { Component, OnInit } from '@angular/core';
import {Project} from '../shared/Project';
import {DataService} from '../data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  selectedProjectOptions?:Project[];

  Projects?:Project[];

  private DataService:DataService = new DataService();

  ngOnInit(): void {
  }

  createProject() {

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
