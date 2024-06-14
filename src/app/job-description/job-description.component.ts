import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobDetails } from '../model/job-model';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css',
})
export class JobDescriptionComponent {
  jobId: number | undefined;
  jobDetails: JobDetails | undefined;

  constructor(private router: Router,private route: ActivatedRoute,private dataService: DataService) {}
 
  ngOnInit() {
    //Retrieves the id from the path and assigns to jobId property
    this.route.params.subscribe((params) => {
      this.jobId = +params['id'];
      this.getJobDetailsById(this.jobId);
    });
  };

  //fetches job details based on id requested
  getJobDetailsById(id: number) {
    this.dataService.fetchJobDetailsById(id).subscribe(
      (data) => {
        this.jobDetails = data;
      },
      (error) => {
        alert('Error while fetching job details,please try again:' + error.message);
        this.backToHomePage();
      }
    );
  };

  //Used to navigate to job-dashboard component
  backToHomePage() {
    this.router.navigate(['/job-dashboard']);
  };
  
}
