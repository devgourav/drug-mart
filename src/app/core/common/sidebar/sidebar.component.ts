import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent implements OnInit {
	auth: AuthService;

	sidebarItems = [ 'Dashboard', 'Clients', 'Vendors', 'Items', 'Invoice', 'Bills', 'Reports', 'Users', 'Settings' ];

	constructor(public _authService: AuthService) {
		this.auth = _authService;
	}

	ngOnInit() {}
}
