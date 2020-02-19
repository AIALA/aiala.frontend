import { distinctUntilChanged, filter, map, take, takeUntil } from 'rxjs/operators';

import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelectionList } from '@angular/material';
import { filterPredicate } from '@xpdo/common/rx';
import { UserPermissionGroupFacade, XdkUserPermissionGroup } from '@xpdo/core/xdk';

@Component({
  selector: 'msft-aiala-permission-group-edit',
  templateUrl: './permission-group-edit.component.html',
  styleUrls: ['./permission-group-edit.component.scss']
})
export class PermissionGroupEditComponent extends XdkUserPermissionGroup {
  filter = new FormControl('');
  filteredUserPermissionGroups$ = this.userPermissionGroups$.pipe(
    filterPredicate(this.filter.valueChanges)
  );
  @ViewChild(MatSelectionList) selectionList: MatSelectionList;

  constructor(
    userPermissionGroupFacade: UserPermissionGroupFacade,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    super(userPermissionGroupFacade);
  }

  save(): void {
    const selection = this.selectionList.selectedOptions.selected.map(v => v.value);

    this.userPermissionGroups$.pipe(
      take(1),
      map(permissionGroups => permissionGroups.map(p => ({ ...p, isAssigned: selection.some(s => s.id === p.id) })))
    ).subscribe(permissionGroups => {
      this.userPermissionGroupFacade.save(this.data.userId, permissionGroups);

      this.isSaving$.pipe(
        distinctUntilChanged(),
        filter(s => !s),
        takeUntil(this.error$.pipe(filter(e => Boolean(e)))),
        take(1),
      ).subscribe(() => {
        this.dialogRef.close();
      });
    });
  }
}
