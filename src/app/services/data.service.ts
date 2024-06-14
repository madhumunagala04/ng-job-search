import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { JobDetails, Jobs } from '../model/job-model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private baseUrl = '/jobs';
  private favouriteJobs: Jobs[]=[];
  constructor(private http: HttpClient) {}

  //returns all the jobs
  getAllJobs(): Observable<Jobs[]> {
    return this.http.get<Jobs[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  //Adds or removes from favourite jobs based on its existence
  addOrRemoveFavouriteJob(job:Jobs){
    let index = this.favouriteJobs.findIndex(favouriteJob => favouriteJob.id === job.id);
    if(index === -1){
      this.favouriteJobs.push(job);
    }
    else{
      this.favouriteJobs.splice(index,1);
    }
    localStorage.setItem('favouriteJobs', JSON.stringify(this.favouriteJobs));
  };

  //returns favourite jobs and here we are storing favourite jobs in browser local storage and will exist even after page refresh
  getFavouriteJobs():Jobs[]{
    const storedFavourites = localStorage.getItem('favouriteJobs');
    if (storedFavourites) {
      this.favouriteJobs = JSON.parse(storedFavourites);
    }
    return this.favouriteJobs;
  };

  //returns job based on requested id
  fetchJobDetailsById(id:number): Observable<JobDetails> {
    return this.http.get<JobDetails>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  };

  //Throws error when api is not responding
  private handleError(error: HttpErrorResponse) {
    return throwError('Something went wrong,please try again later');
  };

  
}

