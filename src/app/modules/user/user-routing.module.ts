import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
	{
		path: 'Users',
		component: UserDetailsComponent
	},
	{
		path: 'Users/New User',
		component: NewUserComponent
	},
	{
		path: 'Users/New User/:id',
		component: NewUserComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class UserRoutingModule {}
