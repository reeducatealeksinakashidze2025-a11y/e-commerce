import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudFrontImageService {
  private readonly cdnUrl = environment.cdnUrl;

  constructor() {}

  getImageUrl(imageName: string): string {
    if (!imageName) {
      return '';
    }
    if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
      return imageName;
    }
    return `${this.cdnUrl}/${imageName}`;
  }

  getImageUrls(imageNames: string[]): string[] {
    return imageNames.map(name => this.getImageUrl(name));
  }
}
