import { Component, Input, OnInit } from '@angular/core';
import { UserOverviewFacade } from '@xpdo/core/xdk';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'msft-aiala-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {
  users$ = this.facade.users$;

  @Input() placeholder: string;
  @Input() appFormGroup: FormGroup;
  @Input() appFormControlName: string;

  constructor(
    private facade: UserOverviewFacade
  ) { }

  ngOnInit() {
    this.facade.load();
  }
}
