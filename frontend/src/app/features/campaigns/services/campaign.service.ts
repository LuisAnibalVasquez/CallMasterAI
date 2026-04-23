import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign, CreateCampaignDto } from '../models/campaign.model';

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/v1/campaigns';

  createCampaign(dto: CreateCampaignDto): Observable<Campaign> {
    return this.http.post<Campaign>(this.baseUrl, dto);
  }

  uploadContacts(campaignId: string, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`${this.baseUrl}/${campaignId}/contacts`, formData);
  }

  uploadScript(campaignId: string, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`${this.baseUrl}/${campaignId}/script`, formData);
  }
}
