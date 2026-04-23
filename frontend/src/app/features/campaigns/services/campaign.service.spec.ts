import { TestBed } from '@angular/core/testing';
import { CampaignService } from './campaign.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CampaignType, CreateCampaignDto, Campaign } from '../models/campaign.model';

describe('CampaignService', () => {
  let service: CampaignService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CampaignService],
    });
    service = TestBed.inject(CampaignService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a campaign', () => {
    const mockDto: CreateCampaignDto = {
      name: 'Test Campaign',
      description: 'Test Description',
      type: CampaignType.VOICE,
    };
    
    service.createCampaign(mockDto).subscribe((campaign: Campaign) => {
      expect(campaign.name).toBe('Test Campaign');
    });

    const req = httpMock.expectOne('/api/v1/campaigns');
    expect(req.request.method).toBe('POST');
    req.flush({ ...mockDto, id: '1', status: 'DRAFT', createdAt: '2026-04-22' });
  });
});
