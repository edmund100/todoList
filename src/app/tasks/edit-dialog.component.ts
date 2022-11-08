import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, Inject } from '@angular/core';  
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'edit-dialog',
    templateUrl: 'edit-dialog.component.html',
  })
  export class EditDialog {
    constructor(
      public dialogRef: MatDialogRef<EditDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
  }

  export interface DialogData {
    taskName: string,
    title: string
  }