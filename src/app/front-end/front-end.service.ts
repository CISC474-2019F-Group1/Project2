import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Texts } from './front-end.module';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class TextsService {
  private texts: Texts[] = [];
  private textsUpdated = new Subject<Texts[]>();

  constructor(private http: HttpClient) {}
  
  getTexts() {
    // return [...this.texts];
    this.http.get<{message: string; texts: Texts[]}>('http://localhost:3000/api/text')
    .subscribe(Data => {
      this.texts = Data.texts;
      this.textsUpdated.next([...this.texts]);
    });
  }

  getTextUpdateListener() {
    return this.textsUpdated.asObservable();
  }

  addText( content: string) {
    const text: Texts = {content};
    this.texts.push(text);
    this.textsUpdated.next([...this.texts]);
  }
}