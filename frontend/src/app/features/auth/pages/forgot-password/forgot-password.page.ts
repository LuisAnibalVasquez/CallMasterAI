import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/infrastructure/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.page.html',
  styleUrl: './forgot-password.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  // Fallback: use window.alert instead of MatSnackBar

  readonly isLoading = signal(false);
  readonly sent = signal(false);

  readonly forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.isLoading.set(true);
    const dto = this.forgotForm.getRawValue() as any;

    this.authService.forgotPassword(dto).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.sent.set(true);
        window.alert('Si el correo existe, recibirá instrucciones en unos momentos.');
      },
      error: () => {
        this.isLoading.set(false);
        // RF-1.04: Incluso en error (excepto red), mostrar mensaje genérico
        this.sent.set(true);
        window.alert('Si el correo existe, recibirá instrucciones en unos momentos.');
      },
    });
  }
}
