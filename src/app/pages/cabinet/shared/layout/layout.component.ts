import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  currentLang = 'en';

  constructor(
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLang = savedLang;
    this.translate.use(savedLang);
  }

  switchLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
