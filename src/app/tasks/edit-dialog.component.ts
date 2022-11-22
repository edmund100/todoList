import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { Component, Inject } from '@angular/core';  
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'edit-dialog',
    templateUrl: 'edit-dialog.component.html',
  })
  export class EditDialog {
    constructor(
      public dialogRef: MatDialogRef<EditDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onEnter() {
      this.dialogRef.close();
    }
  }

  export interface DialogData {
    name: string,
    title: string
  }