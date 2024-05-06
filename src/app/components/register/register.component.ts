import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = { email: '', password: '', firstName: '', lastName: '' };

  constructor(private auth: AuthService) { }

  ngOnInit(): void {}

  register() {
    if (!this.user.email || !this.user.password || !this.user.firstName || !this.user.lastName) {
      alert('Please fill in all fields');
      return;
    }

    this.auth.register(this.user);
    
    this.user = { email: '', password: '', firstName: '', lastName: '' }; // Clear the form after registration
  }
}
