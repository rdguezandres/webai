import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.css'],
})
export class SignInPage {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;

      this.authService
        .login({ email, password })
        .then(() => this.router.navigate(['/']))
        .catch((error: { message: any }) => alert(error.message));
    }
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .subscribe(() => this.router.navigate(['/']))
  }
}
