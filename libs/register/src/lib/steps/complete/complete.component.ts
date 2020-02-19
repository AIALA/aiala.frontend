import { Component, OnInit } from '@angular/core';
import { RegistrationSuccess } from '../../models/RegistrationSuccess';
import { Observable } from 'rxjs';
import { RegisterFacade } from '../../+state/register.facade';

@Component({
  selector: 'msft-aiala-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {
  registeredUser$: Observable<RegistrationSuccess> = this.facade
    .registeredUser$;

  constructor(private facade: RegisterFacade) {}

  ngOnInit() {}
}
