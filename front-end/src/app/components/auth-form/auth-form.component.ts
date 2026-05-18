import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-form.component.html'
})
export class AuthFormComponent {
  @Input() logoSrc?: string;
  @Input() companyName = 'Sua Empresa';
  @Output() submitForm = new EventEmitter<any>();

  isLogin = true;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;

  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.formData = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.submitForm.emit({
        type: this.isLogin ? 'login' : 'register',
        data: this.formData
      });
    }, 1500);
  }

  handleSocialLogin(provider: string) {
    console.log(`Login com ${provider}`);
  }
}
