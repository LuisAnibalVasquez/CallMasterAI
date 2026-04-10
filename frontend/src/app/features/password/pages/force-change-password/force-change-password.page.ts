import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-force-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './force-change-password.page.html',
  styleUrl: './force-change-password.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForceChangePasswordPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  // Fallback: use window.alert instead of MatSnackBar

  readonly isLoading = signal(false);
  readonly hidePasswords = signal(true);

  readonly forceForm = this.fb.group({
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
    if (this.forceForm.invalid) return;

    this.isLoading.set(true);
    const dto = this.forceForm.getRawValue() as any;

    this.authService.changePassword(dto).subscribe({
      next: () => {
        this.isLoading.set(false);
        window.alert('Contraseña actualizada. Inicie sesión con sus nuevas credenciales.');
        // RF-1.06: Tras el cambio forzado, cerramos sesión para obtener un token nuevo sin el flag
        this.authService.logout();
      },
      error: (err) => {
        this.isLoading.set(false);
        window.alert(err.error?.message || 'Error al actualizar la contraseña.');
      },
    });
  }
}
