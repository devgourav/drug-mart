import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sidebar',
  	templateUrl: './sidebar.component.html',
  	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	sidebarItems = ['Dashboard', 'Clients', 'Vendors', 'Items', 'Invoice','Bills','Reports', 'Settings'];

	constructor() { }

	ngOnInit() {

	}

}
