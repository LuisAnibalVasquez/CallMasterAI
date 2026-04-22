import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-force-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './force-change-password.page.html',
  styleUrl: '../../../auth/pages/login/login.page.css', // Reusing the login centered style
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForceChangePasswordPage {
  private readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);

  readonly isLoading = signal(false);
  readonly hideCurrent = signal(true);
  readonly hideNew = signal(true);
  readonly hideConfirm = signal(true);

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
    const { currentPassword, newPassword } = this.forceForm.getRawValue();

    this.authService.changePassword({ currentPassword: currentPassword!, newPassword: newPassword! }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.snackBar.open('Contraseña actualizada. Inicie sesión nuevamente.', 'Cerrar', { duration: 5000 });
        this.authService.logout();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.snackBar.open(err.error?.message || 'Error al actualizar la contraseña.', 'Cerrar', { duration: 5000 });
      },
    });
  }
}
