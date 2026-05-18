import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-sidebar.component.html'
})
export class AuthSidebarComponent {
  @Input() logoSrc?: string;
  @Input() companyName = 'Sua Empresa';

  currentYear = new Date().getFullYear();

  features = [
    {
      icon: 'shield',
      title: 'Segurança Avançada',
      description: 'Seus dados protegidos com criptografia de ponta'
    },
    {
      icon: 'zap',
      title: 'Rápido e Eficiente',
      description: 'Interface otimizada para máxima produtividade'
    },
    {
      icon: 'users',
      title: 'Colaboração em Equipe',
      description: 'Trabalhe em conjunto com sua equipe em tempo real'
    }
  ];
}
