import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingInterceptor } from './loading-interceptor';
import { LoadingService } from '../../services/loading/loading.service';

describe('LoadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let loadingService: LoadingService;
  let showSpy: jasmine.Spy;
  let hideSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoadingService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    loadingService = TestBed.inject(LoadingService);

    showSpy = spyOn(loadingService, 'show').and.callThrough();
    hideSpy = spyOn(loadingService, 'hide').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call show() on request', () => {
    http.get('/test').subscribe();
    httpMock.expectOne('/test').flush({});

    expect(showSpy).toHaveBeenCalled();
  });

  it('should call hide() after request completes', () => {
    http.get('/test').subscribe();
    httpMock.expectOne('/test').flush({});

    expect(hideSpy).toHaveBeenCalled();
  });
});
