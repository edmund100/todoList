import { Component, OnInit } from '@angular/core';
import {Project} from '../shared/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  selectedProjectOptions?:Project[];

  Projects?:Project[];

  ngOnInit(): void {
  }

  createProject() {

  }

  editSelectedProject() {

  }

  clearSelectedProjects() {

  }

  deleteAllProjects() {

  }

  deleteSelectedProjects(){

  }

}
