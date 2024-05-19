import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../shared/contact.service';
import { Contact } from '../../model/contact';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css']
})
export class ListMessageComponent implements OnInit {
  messages: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

  deleteMessage(id: string) {
    this.contactService.deleteMessage(id).then(() => {
      this.messages = this.messages.filter(message => message.id !== id);
    });
  }

  markAsProcessed(id: string) {
    this.contactService.updateMessage(id, { processed: true }).then(() => {
      const message = this.messages.find(message => message.id === id);
      if (message) {
        message.processed = true;
      }
    });
  }

  markAsUnprocessed(id: string) {
    this.contactService.updateMessage(id, { processed: false }).then(() => {
      const message = this.messages.find(message => message.id === id);
      if (message) {
        message.processed = false;
      }
    });
  }
}
