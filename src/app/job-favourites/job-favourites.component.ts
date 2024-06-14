import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Jobs } from '../model/job-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-favourites.component.html',
  styleUrl: './job-favourites.component.css',
})
export class JobFavouritesComponent {
  favouriteJobs: Jobs[] | undefined;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getFavouriteJob();
  };

  //Fetches favourite jobs from dataService
  getFavouriteJob() {
    this.favouriteJobs = this.dataService.getFavouriteJobs();
  };

}
