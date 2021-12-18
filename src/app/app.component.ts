import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  page: number = 1;
  size: number = 3;
  title: string = "";

  public books: any = [];

  constructor(public http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('/api/books').subscribe((result) => {
      this.books = result;
    });
  }

  onNxt() {
    this.page = this.page + 1;
    this.callBook();
    
  }

  onPrev() {
    this.page = this.page - 1;
    this.callBook();
  }

  callBook() {
    this.http.get('/api/books?page='+this.page+'&size='+this.size+'&title='+this.title).subscribe((result) => {
      this.books = result;
    });
  }

  changeEvent() {
    this.callBook();
  }

  onFirst() {
    this.page = 1;
    this.callBook();
  }

  onLast() {
    this.page = Math.ceil(16 / this.size) ;
    this.callBook();
  }


}
