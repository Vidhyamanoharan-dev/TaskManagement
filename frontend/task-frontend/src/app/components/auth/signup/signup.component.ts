import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup({ email: this.email, password: this.password }).subscribe({
      next: () => {
        alert('Registered. Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => alert(err?.error || 'Signup failed')
    });
  }
}
