import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  template: `
    <div>{{ id() }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignDetailComponent {
    id = input<string>();
}
