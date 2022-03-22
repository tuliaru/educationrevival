import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private router: Router) { }

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
	
	logout()
	{
		localStorage.removeItem("currentUser");
		this.router.navigate([""]);
	}
}
