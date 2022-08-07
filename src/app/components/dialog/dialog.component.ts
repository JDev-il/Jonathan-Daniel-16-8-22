import {ChangeDetectionStrategy, Component, Output} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'dialogBox',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogContent {

  dialogForm: FormGroup = this.fb.group({
    itemName: (["", [Validators.required]]),
    store: (["", [Validators.required]]),
    price: (["", [Validators.required]]),
    reciveDateInformation: ([""])
  })

  constructor(public fb: FormBuilder){}


}
