import { Component } from '@angular/core';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
    standalone: false,
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  loading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loading$ = this.loadingService.loading$;
  }
}
