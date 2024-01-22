// contact-form.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  formData: any = {}; // Object to store form data

  submitForm() {
    // Implement form submission logic here
    console.log('Form submitted:', this.formData);
  }
}
