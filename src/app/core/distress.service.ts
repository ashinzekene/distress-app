import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Distress } from '../models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DistressService {
  constructor(private httpClient: HttpClient, private apiService: ApiService) { }
  
  getById(id): Observable<Distress> {
    return this.apiService.get(`/distress/${id}`)
  }

  create(distress: Distress): Observable<Distress> {
    return this.apiService.post("/distress/new", distress)
  }
  
  approve(id): Observable<Distress> {
    return this.apiService.post(`/distress/${id}/approve`, {})
  }
  
  search(body): Observable<Distress[]> {
    return this.apiService.post('/distress/search', body)
  }
  
  comment(body): Observable<Distress[]> {
    return this.apiService.post('/comments/new', body)
  }
  
  getComments(distressId): Observable<Distress[]> {
    return this.apiService.get(`/comments/${distressId}/comments`)
  }

  distressLength(): Observable<{result: number}> {
    return this.apiService.get('/distress/length')
  }
  
  commentLength(): Observable<{result: number}> {
    return this.apiService.get('/comments/length')
  }
  
}