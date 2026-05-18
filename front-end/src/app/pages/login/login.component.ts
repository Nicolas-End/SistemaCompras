import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthSidebarComponent } from '../../components/auth-sidebar/auth-sidebar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthFormComponent, AuthSidebarComponent],
  template: `
    <main class="min-h-screen flex">
      <!-- Sidebar -->
      <div class="hidden lg:block lg:w-2/5 xl:w-1/3">
        <app-auth-sidebar
          [companyName]="companyName"
          [logoSrc]="logoSrc"
        ></app-auth-sidebar>
      </div>

      <!-- Form Container -->
      <div class="flex-1 flex items-center justify-center bg-card p-4">
        <app-auth-form
          [companyName]="companyName"
          [logoSrc]="logoSrc"
          (submitForm)="handleSubmit($event)"
        ></app-auth-form>
      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class LoginComponent {
  companyName = 'Sua Empresa';
  logoSrc?: string; // Descomente e adicione o caminho do logo: logoSrc = '/logo.png';

  handleSubmit(event: { type: string; data: any }) {
    console.log('Form submitted:', event);
    // Aqui você pode adicionar a lógica de autenticação
  }
}
