import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-details',
  templateUrl: './setting-details.component.html',
  styleUrls: ['./setting-details.component.scss']
})
export class SettingDetailsComponent implements OnInit {

  constructor() { }

   settingItems = ['Company Details','Tax Details','Discounts'];

  ngOnInit() {
  }

}
