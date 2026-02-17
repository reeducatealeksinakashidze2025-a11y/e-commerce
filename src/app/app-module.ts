import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from './shared/shared-module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth/auth-interceptor';
import { LoadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { CoreModule } from './core/core-module';
import { FormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages-module';
import { CabinetModule } from './pages/cabinet/cabinet-module';
import { Observable } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    CoreModule,
    FormsModule,
    PagesModule,
    CabinetModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ka']);
    translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('language') || 'en';
    translate.use(savedLang);
  }
}
