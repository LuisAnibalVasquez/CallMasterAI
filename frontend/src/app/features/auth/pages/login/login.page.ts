import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly isLoading = signal(false);
  readonly hidePassword = signal(true);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  /**
   * Maneja el submit del formulario de login.
   * Valida el formulario, llama a `AuthService.login` y redirige al dashboard
   * correspondiente si la autenticación es exitosa.
   */
  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    const dto = this.loginForm.getRawValue() as any;

    this.authService.login(dto).subscribe({
      next: (result) => {
        this.isLoading.set(false);
        if (result.success) {
          this.authService.redirectToDashboard();
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.snackBar.open(err.error?.message || 'Error al iniciar sesión. Verifique sus credenciales.', 'Cerrar', { duration: 5000 });
      },
    });
  }
}
