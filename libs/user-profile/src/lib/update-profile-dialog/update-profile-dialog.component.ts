import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  UserProfile,
  XdkUserProfile,
  XdkUserProfileFacade
} from '@xpdo/core/xdk';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'update-profile-dialog.component.html',
  styleUrls: ['./update-profile-dialog.component.scss']
})
export class UpdateProfileDialogComponent extends XdkUserProfile
  implements OnDestroy {
  userProfileForm: FormGroup;
  profile: UserProfile;
  profileSub: Subscription;
  constructor(facade: XdkUserProfileFacade, private fb: FormBuilder) {
    super(facade);
    this.profileSub = this.profile$.subscribe(p => {
      this.profile = p;
      this.createUserProfileForm();
    });
  }

  createUserProfileForm(): void {
    this.userProfileForm = this.fb.group({
      firstname: [this.profile.firstname, Validators.required],
      lastname: [this.profile.lastname, Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: [''],
      birthDate: [new Date()],
      street: [''],
      postCode: [''],
      place: ['']
    });
  }

  ngOnDestroy(): void {
    this.profileSub.unsubscribe();
  }
}
