import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentLang = 'en';

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    translate.addLangs(['en', 'ka']);
    translate.setDefaultLang('en');
  }

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

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
