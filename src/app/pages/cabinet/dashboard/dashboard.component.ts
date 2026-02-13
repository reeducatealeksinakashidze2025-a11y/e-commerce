import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResponseBase } from '../../../shared/models/base/response-base.model';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PagedResult } from '../../../shared/models/base/paged-result.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})

export class DashboardComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  // blogs: Blog[] = [];
  page = 1;
  pageSize = 5;
  totalCount = 0;

  private searchSubject: Subject<string> = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    // private blogService: BlogService,
     private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // subscribe search input with debounce
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(2000),        // 500ms დაელოდება შეჩერებას
        distinctUntilChanged()    // იგივე ტექსტისთვის არ გაიშვას მეორე მოთხოვნა
      )
      .subscribe((searchText: string) => {
        this.loadBlogs(searchText);
      });

    // αρχική φόρτωση ბლოგები
    this.loadBlogs('');
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  loadBlogs(search: string): void {
    // this.blogService.getAll(this.page, this.pageSize, search).subscribe({
    //   next: (data) => {
    //     this.blogs = data.value?.items || [];
    //     this.totalCount = data.value?.totalCount || 0;
    //   },
    //   error: (err) => {
    //     console.error('Error loading blogs:', err);
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadBlogs(this.searchTerm);
  }
}