import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {

  constructor() { }

  @Input() itemsCount:number = 0;
  @Input() createMessage:string ="";
  @Input() deleteAllMessage:string="";
  @Input() deleteSelectedMessage:string="";
  @Input() editSelectedMessage:string="";
  @Input() clearSelectedMessage:string="";

  @Output() createItemMethod = new EventEmitter();
  @Output() deleteAllItemsMethod = new EventEmitter();
  @Output() deleteSelectedItemMethod = new EventEmitter();
  @Output() editSelectedItemMethod = new EventEmitter();
  @Output() clearSelectedItemsMethod = new EventEmitter();

  ngOnInit(): void {
  }

  createItem(){
    this.createItemMethod.emit();
  }

  deleteAllItems(){
    this.deleteAllItemsMethod.emit();
  }

  deleteSelectedItems(){
    this.deleteSelectedItemMethod.emit();
  }

  editSelectedItem(){
    this.editSelectedItemMethod.emit();
  }

  clearSelectedItems(){
    this.clearSelectedItemsMethod.emit();
  }

}
