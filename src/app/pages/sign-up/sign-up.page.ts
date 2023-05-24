import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage {
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password, confirmPassword, firstName, lastName } = form.value;
  
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      this.authService.register({ email, password, firstName, lastName })
        .then(() => this.router.navigate(['/home']))
        .catch((error: { message: any; }) => alert(error.message));
    }
  }
  

  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .subscribe(() => this.router.navigate(['/home']))
  }
}
