import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.page.html',
  styleUrl: './change-password.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  // Fallback: use window.alert

  readonly isLoading = signal(false);
  readonly hidePasswords = signal(true);

  readonly changeForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
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
    if (this.changeForm.invalid) return;

    this.isLoading.set(true);
    const { currentPassword, newPassword } = this.changeForm.getRawValue();

    this.authService.changePassword({ currentPassword: currentPassword!, newPassword: newPassword! }).subscribe({
      next: () => {
        this.isLoading.set(false);
        window.alert('Contraseña actualizada correctamente.');
        this.changeForm.reset();
      },
      error: (err) => {
        this.isLoading.set(false);
        window.alert(err.error?.message || 'Error al actualizar la contraseña.');
      },
    });
  }
}
