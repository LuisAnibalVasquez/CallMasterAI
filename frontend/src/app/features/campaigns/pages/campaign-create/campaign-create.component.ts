import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { CampaignType } from '../../models/campaign.model';

@Component({
  selector: 'app-campaign-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Name">
      <input formControlName="description" placeholder="Description">
      <select formControlName="type">
        <option value="VOICE">Voice</option>
        <option value="SMS">SMS</option>
      </select>
      <button type="submit" [disabled]="form.invalid">Create</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly campaignService = inject(CampaignService);
  private readonly router = inject(Router);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    type: [CampaignType.VOICE, Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      this.campaignService.createCampaign(this.form.getRawValue()).subscribe(campaign => {
        this.router.navigate(['/campaigns', campaign.id]);
      });
    }
  }
}
