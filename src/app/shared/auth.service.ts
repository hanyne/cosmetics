import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');
  
      // Vérifier dans quelle collection l'utilisateur se trouve
      this.firestore.collection('Users').doc(res.user?.uid).get().subscribe(userDoc => {
        if (userDoc.exists) {
          // Utilisateur trouvé dans la collection "Users"
          this.router.navigate(['admin/dash']);
        } else {
          // Utilisateur trouvé dans la collection "clients"
          this.router.navigate(['dashboard']);
        }
      }, err => {
        console.error(err);
        alert('Erreur lors de la vérification du type d\'utilisateur');
      });
  
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }
  


  register(user: User) {
    this.fireauth.createUserWithEmailAndPassword(user.email, user.password).then(res => {
      // Enregistrement dans Firestore
      this.firestore.collection('clients').doc(res.user?.uid).set({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }).then(() => {
        alert('Inscription réussie');
        this.sendEmailForVarification(res.user);
        this.router.navigate(['/login']);
      }).catch(err => {
        alert('Erreur lors de l\'enregistrement des informations utilisateur dans Firestore');
        console.error(err);
      });
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  // sign out
  logout(): Promise<void> {
    return this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

  // email varification
  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }
  isLoggedIn(): boolean {
    return !!this.fireauth.currentUser; // Vérifie si l'utilisateur actuel existe (c'est-à-dire s'il est connecté)
  }
 

}
