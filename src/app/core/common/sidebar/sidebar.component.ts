import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent implements OnInit {
	auth: AuthService;

	sidebarItems = [
		{ name: 'Dashboard', svgName: 'home.svg' },
		{ name: 'Clients', svgName: 'user-1.svg' },
		{ name: 'Vendors', svgName: 'user.svg' },
		{ name: 'Items', svgName: 'drug.svg' },
		{ name: 'Invoice', svgName: 'list.svg' },
		{ name: 'Bills', svgName: 'list.svg' },
		{ name: 'Reports', svgName: 'list-1.svg' },
		{ name: 'Users', svgName: 'user-1.svg' },
		{ name: 'Payments', svgName: 'money.svg' },
		{ name: 'Settings', svgName: 'gear.svg' }
	];

	constructor(public _authService: AuthService) {
		this.auth = _authService;
	}

	ngOnInit() {}
}
