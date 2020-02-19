import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { XdkIntroGuard, XdkAcceptInvitation, XdkPolicyGuard } from '@xpdo/core/xdk';
import { IntroComponent } from '@msft-aiala/intro';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'schedule' },
      {
        path: 'tasks',
        loadChildren: '@msft-aiala/tasks#TasksModule',
        canActivate: [XdkPolicyGuard],
        data: {
          policies: ['ScheduleManagementPolicy']
        }
      },
      {
        path: 'user-management',
        loadChildren: '@msft-aiala/user-management#UserManagementModule',
        canActivate: [XdkPolicyGuard],
        data: {
          policies: ['UserManagementFeaturePolicy']
        }
      },
      {
        path: 'schedule',
        loadChildren: '@msft-aiala/schedule#ScheduleModule',
        canActivate: [XdkPolicyGuard],
        data: {
          policies: ['ScheduleManagementPolicy']
        }
      },
      {
        path: 'places',
        loadChildren: '@msft-aiala/places#PlacesModule',
        canActivate: [XdkPolicyGuard],
        data: {
          policies: ['ScheduleManagementPolicy']
        }
      },
      {
        path: 'gallery',
        loadChildren: '@msft-aiala/gallery#GalleryModule',
        canActivate: [XdkPolicyGuard],
        data: {
          policies: ['ScheduleManagementPolicy']
        }
      },
      {
        path: 'settings',
        loadChildren: '@msft-aiala/settings/tenant#TenantSettingsModule',
        canActivate: [XdkPolicyGuard],
        data: {
          policies: [
            'ManageUsersPolicy',
            'ManageTenantSettingsPolicy'
          ]
        }
      },
      {
        path: 'profile',
        loadChildren: '@msft-aiala/user-profile#UserProfileModule'
      },
      {
        path: 'reports',
        loadChildren: '@msft-aiala/reports#ReportsModule',
        canActivate: [XdkPolicyGuard],
        data: {
          policies: [
            'ManageUsersPolicy',
            'ManageTenantSettingsPolicy'
          ]
        }
      },
    ],
    canActivate: [ XdkIntroGuard ]
  },
  { path: 'intro', component: IntroComponent },
  { path: 'invitation/accept/:id', component: XdkAcceptInvitation },
  { path: 'user-management', loadChildren: '@msft-aiala/user-management#UserManagementModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {}
