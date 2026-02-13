import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Blog } from '../../shared/models/blog/blog.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // blogs: Blog[] = [];

  constructor(
    // private blogService: BlogService,
     private router: Router) {}

  ngOnInit() {
    // this.loadLatestBlogs();
  }

  // loadLatestBlogs() {
  //   this.blogService.getAll().subscribe(res => {
  //     this.blogs = (res.value?.items || [])
  //      .sort((a, b) => {
  //   const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  //   const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  //   return dateB - dateA;
  // })
  //       .slice(0, 10);
  //   });
  // }

  // goToBlog(blogId: string) {
  //   this.router.navigate(['/blog', blogId]);
  // }
}
