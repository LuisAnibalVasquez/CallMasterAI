import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  // Fallback: use window.alert for now instead of MatSnackBar

  readonly isLoading = signal(false);
  readonly hidePassword = signal(true);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    const dto = this.loginForm.getRawValue() as any;

    console.log(dto);
    console.log('paso 1');

    this.authService.login(dto).subscribe({
      next: (result) => {
        console.log('paso 2');
        console.log(result);
        this.isLoading.set(false);
        if (result.success) {
          console.log('paso 3');
          this.authService.redirectToDashboard();
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        window.alert(err.error?.message || 'Error al iniciar sesión. Verifique sus credenciales.');
      },
    });
    console.log('paso 4');
  }
}
