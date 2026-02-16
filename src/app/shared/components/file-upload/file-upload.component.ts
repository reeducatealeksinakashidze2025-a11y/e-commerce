import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent {
  @Input() maxFiles: number = 5;
  @Input() maxFileSize: number = 5 * 1024 * 1024; // 5MB
  @Input() acceptedTypes: string = 'image/*';
  @Input() existingImages: string[] = []; // არსებული სურათები edit-ისთვის
  
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() fileRemoved = new EventEmitter<number>();
  @Output() existingImageRemoved = new EventEmitter<number>();

  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      
      // მაქსიმუმ ფაილების შემოწმება
      const totalFiles = this.selectedFiles.length + this.existingImages.length + files.length;
      if (totalFiles > this.maxFiles) {
        alert(`მაქსიმუმ ${this.maxFiles} სურათი შეგიძლია ატვირთო`);
        return;
      }

      files.forEach(file => {
        // ფაილის ტიპის შემოწმება
        if (!file.type.startsWith('image/')) {
          alert('მხოლოდ სურათების ატვირთვაა შესაძლებელი');
          return;
        }

        // ფაილის ზომის შემოწმება
        if (file.size > this.maxFileSize) {
          const maxSizeMB = this.maxFileSize / (1024 * 1024);
          alert(`ფაილის ზომა არ უნდა აღემატებოდეს ${maxSizeMB}MB-ს`);
          return;
        }

        this.selectedFiles.push(file);

        // შექმენი preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });

      this.filesSelected.emit(this.selectedFiles);
      
      // Clear input
      input.value = '';
    }
  }

  removeNewImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
    this.fileRemoved.emit(index);
    this.filesSelected.emit(this.selectedFiles);
  }

  removeExistingImage(index: number): void {
    this.existingImageRemoved.emit(index);
  }

  getFileCount(): number {
    return this.selectedFiles.length + this.existingImages.length;
  }
}
