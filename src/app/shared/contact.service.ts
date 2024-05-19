import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private messagesCollection: AngularFirestoreCollection<Contact>;

  constructor(private firestore: AngularFirestore) {
    this.messagesCollection = firestore.collection<Contact>('messages');
  }

  sendMessage(message: Contact) {
    return this.messagesCollection.add(message);
  }

  getMessages(): Observable<Contact[]> {
    return this.messagesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Contact;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  updateMessage(id: string, data: Partial<Contact>) {
    return this.messagesCollection.doc(id).update(data);
  }

  deleteMessage(id: string) {
    return this.messagesCollection.doc(id).delete();
  }
}
