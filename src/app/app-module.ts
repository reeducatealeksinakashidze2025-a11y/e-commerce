import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from './shared/shared-module';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth/auth-interceptor';
import { LoadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { CoreModule } from './core/core-module';
import { FormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages-module';
import { CabinetModule } from './pages/cabinet/cabinet-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    SharedModule,
    CoreModule,
    FormsModule,
    PagesModule,
    CabinetModule

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
      provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json',
    }),
      provideHttpClient(withInterceptorsFromDi()),
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
  }
}
