import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import * as UI from '../../shared/store/actions/ui.actions';
import * as fromRoot from '../../app.reducer';

import { OriginalItem } from 'src/app/core/interfaces/Item.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dialogBox',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogContent {

  @Output() dialogFormEmmiter = new EventEmitter();

  dialogForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    store: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    delivery: ['', [Validators.required]],
  });

  constructor(
    public fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private apiService: ApiService,
    public dialog: MatDialog,
    ){}

  newItemSubmitFromDialog(item: OriginalItem) {
    if(this.dialogForm.valid){
      this.apiService.addNewItemToDeliveryList(item)
      this.dialog.closeAll()
    }
  }

  closeAfterSubmit() {
    if(this.dialogForm.valid){
      this.dialog.closeAll()
    }
  }
}
