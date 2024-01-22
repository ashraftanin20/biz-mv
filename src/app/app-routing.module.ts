import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileHandlerComponent } from './file-handler/file-handler.component';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactFormComponent
  },
  {
    path: 'file',
    component: FileHandlerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
