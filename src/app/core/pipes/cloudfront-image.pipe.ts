import { Pipe, PipeTransform } from '@angular/core';
import { CloudFrontImageService } from '../services/cloudfront-image.service';

@Pipe({
  name: 'cloudFrontImage',
  standalone: false
})
export class CloudFrontImagePipe implements PipeTransform {
  constructor(private cloudFrontImageService: CloudFrontImageService) {}

  transform(imageName: string): string {
    return this.cloudFrontImageService.getImageUrl(imageName);
  }
}
