import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  status: boolean = false;
  clickDashboardSidebar(){
      this.status = !this.status;        
  }
overlayIsVisited = false;
overlayCheckVisited() {
   // reverse the value of property
   this.overlayIsVisited = !this.overlayIsVisited;
   this.status = !this.status;
}
}
