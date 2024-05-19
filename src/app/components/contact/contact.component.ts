import { Component } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/shared/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactMessage: Contact = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  submitted = false;

  constructor(private contactService: ContactService) {}

  onSubmit() {
    this.contactService.sendMessage(this.contactMessage).then(() => {
      this.submitted = true;
      this.contactMessage = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
    });
  }
}
