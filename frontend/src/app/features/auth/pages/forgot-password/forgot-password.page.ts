import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-forgot-password',
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
  templateUrl: './forgot-password.page.html',
  styleUrl: '../login/login.page.css', // Reusing the login styles
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);

  readonly isLoading = signal(false);
  readonly sent = signal(false);

  readonly forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  /**
   * Envía una solicitud de recuperación de contraseña para el email proporcionado.
   * Muestra feedback visual en `sent` cuando la petición fue aceptada.
   */
  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.isLoading.set(true);
    const dto = this.forgotForm.getRawValue() as any;

    this.authService.forgotPassword(dto).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.sent.set(true);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.snackBar.open(err.error?.message || 'Error al solicitar recuperación.', 'Cerrar', { duration: 5000 });
      },
    });
  }
}
