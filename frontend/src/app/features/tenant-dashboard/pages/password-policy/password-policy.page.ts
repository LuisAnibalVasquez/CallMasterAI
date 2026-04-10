import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TenantService } from '../../../../core/infrastructure/services/tenant.service';

@Component({
  selector: 'app-password-policy',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password-policy.page.html',
  styleUrl: './password-policy.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordPolicyPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly tenantService = inject(TenantService);
  // Fallback: use window.alert instead of MatSnackBar

  readonly isLoading = signal(true);
  readonly isSaving = signal(false);

  readonly policyForm = this.fb.group({
    passwordExpiryDays: [90, [Validators.required]],
  });

  readonly expiryOptions = [
    { value: 30, label: '30 días' },
    { value: 60, label: '60 días' },
    { value: 90, label: '90 días' },
    { value: 180, label: '180 días' },
  ];

  ngOnInit() {
    this.loadPolicy();
  }

  loadPolicy() {
    this.tenantService.getPasswordPolicy().subscribe({
      next: (policy) => {
        this.policyForm.patchValue({ passwordExpiryDays: policy.passwordExpiryDays as any });
        this.isLoading.set(false);
      },
      error: () => {
        window.alert('Error al cargar la política actual.');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.policyForm.invalid) return;

    this.isSaving.set(true);
    const dto = this.policyForm.getRawValue() as any;

    this.tenantService.updatePasswordPolicy(dto).subscribe({
      next: () => {
        this.isSaving.set(false);
        window.alert('Política de seguridad actualizada correctamente.');
      },
      error: (err) => {
        this.isSaving.set(false);
        window.alert(err.error?.message || 'Error al guardar los cambios.');
      },
    });
  }
}
