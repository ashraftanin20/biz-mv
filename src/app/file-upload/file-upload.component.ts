import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input()
    requiredFileType:string | undefined;

    fileName = '';
    uploadProgress:number | undefined;
    uploadSub: Subscription | undefined;

    constructor(private http: HttpClient) {}

    onFileSelected(event: any) {

        const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("thumbnail", file);

            const upload$ = this.http.post("http://localhost:8080/api/upload", formData, {
                reportProgress: true,
                observe: 'events'
            })
            .pipe(
              finalize(() => this.reset())
            );

            this.uploadSub = upload$.subscribe(event => {
              if (event.type == HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
              }
            })
        }
    }

    cancelUpload() {
      this.uploadSub?.unsubscribe();
      this.reset();
    }

    reset() {
      this.uploadProgress = 0;
      this.uploadSub?.unsubscribe();
    }

}
