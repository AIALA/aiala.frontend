import { Component, OnInit, Input } from '@angular/core';
import { XpdoIconService } from '@xpdo/components';
import { faCircleNotch } from '@fortawesome/pro-regular-svg-icons';

@Component({
  selector: 'msft-aiala-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() loading: boolean;

  constructor(
    iconService: XpdoIconService
  ) {
    iconService.addIcons(
      faCircleNotch
    )
  }

  ngOnInit() {
  }

}
