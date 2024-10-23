import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsLetterResponse } from '../interfaces/newsletter.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  private endpointUrl = 'http://localhost:3000/response';

  constructor(private httpClient: HttpClient) {}

  sendData(name: string, email: string): Observable<NewsLetterResponse> {
    const data = { name, email };

    // return this.httpClient.post<NewsLetterResponse>(this.endpointUrl, data);
    //json-server --watch db.json
    return this.httpClient.get<NewsLetterResponse>(this.endpointUrl);
  }
}
