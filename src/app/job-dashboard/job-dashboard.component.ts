import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Jobs } from '../model/job-model';
import { Subscription } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-dashboard',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink],
  templateUrl: './job-dashboard.component.html',
  styleUrl: './job-dashboard.component.css',
})
export class JobDashboardComponent {
  jobs: Array<Jobs> = [];
  subscription: Subscription | undefined;
  favouriteJobs!: Jobs[];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getJobs();
    this.getFavouriteJobs();
  };

  //Fetches all jobs
  getJobs() {
    this.subscription = this.dataService.getAllJobs().subscribe(
      (data: Jobs[]) => {
        this.jobs = data;
      },
      (error) => {
        alert('Error while fetching job details,please try again:' + error.message);
      }
    );
  };

  //Toggle action when clicked on star it will be added or removed in favourite jobs
  favouriteJob(job: Jobs) {
    this.dataService.addOrRemoveFavouriteJob(job);
  };

  //returns boolean and based on this class will be applied to star icon
  changeFavourite(jobId: number): boolean {
    return this.favouriteJobs?.some((job) => job.id === jobId);
  };

  //Fetches all favourite jobs
  getFavouriteJobs() {
    this.favouriteJobs = this.dataService.getFavouriteJobs();
  };

  //Unsubscribing dataService when component unmount
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  };
}
