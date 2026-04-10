import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.page.html',
  styleUrl: './reset-password.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPage {
  /** RF-1.04: El token se recibe de la URL vía input binding (configurado en appConfig) */
  readonly token = input.required<string>();

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  // Fallback: use window.alert instead of MatSnackBar

  readonly isLoading = signal(false);
  readonly hidePassword = signal(true);

  readonly resetForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: (group) => {
      const pass = group.get('newPassword')?.value;
      const confirm = group.get('confirmPassword')?.value;
      return pass === confirm ? null : { notSame: true };
    }
  });

  onSubmit() {
    if (this.resetForm.invalid) return;

    this.isLoading.set(true);
    const dto = {
      token: this.token(),
      newPassword: this.resetForm.value.newPassword!
    };

    this.authService.resetPassword(dto as any).subscribe({
      next: () => {
        this.isLoading.set(false);
        window.alert('Contraseña restablecida exitosamente.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isLoading.set(false);
        window.alert(err.error?.message || 'Error al restablecer la contraseña. El enlace puede haber expirado.');
      },
    });
  }
}
