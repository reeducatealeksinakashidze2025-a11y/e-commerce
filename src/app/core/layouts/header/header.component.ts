import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

   isMenuOpen = false;
  
 constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ka']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  //  constructor(public router: Router) {}
  // onSearch(q: string) {
  //   if (!q) return;
  //   this.router.navigate(['/search'], { queryParams: { q }});
  // }

   // for responsive menu
 
}
