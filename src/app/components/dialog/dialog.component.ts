import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ItemModel } from 'src/app/core/interfaces/Item.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dialogBox',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContent implements OnInit {
  @Output() dialogFormEmmiter = new EventEmitter();
  @Input() storeNamesSummery!: string[];

  currentStoreName!: string;
  dialogForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    store: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    delivery: ['', [Validators.required]],
  });

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.storeNamesSummery = this.apiService.tablesOnlineStores;
  }

  newItemSubmitFromDialog(item: ItemModel) {
    if (this.dialogForm.valid) {
      this.apiService.addNewItemToDeliveryList(item);
      this.cd.markForCheck();
      this.dialog.closeAll();
    }
  }

  closeAfterSubmit() {
    if (this.dialogForm.valid) {
      this.dialog.closeAll();
    }
  }
}
