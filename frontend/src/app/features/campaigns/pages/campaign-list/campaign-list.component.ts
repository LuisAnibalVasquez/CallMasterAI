import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  template: `
    @for (campaign of campaigns(); track campaign.id) {
        <div>{{ campaign.name }}</div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignListComponent {
    campaigns = signal<any[]>([{ id: '1', name: 'Campaign 1' }]);
}
