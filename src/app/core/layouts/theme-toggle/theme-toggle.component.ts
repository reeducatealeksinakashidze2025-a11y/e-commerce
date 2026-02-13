import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: false,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: 'light' | 'dark' = 'light';
  constructor(private translate: TranslateService) {

  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    this.currentTheme = savedTheme ?? 'light';
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
}