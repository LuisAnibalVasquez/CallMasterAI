import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignCreateComponent } from './campaign-create.component';
import { CampaignService } from '../../services/campaign.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('CampaignCreateComponent', () => {
  let component: CampaignCreateComponent;
  let fixture: ComponentFixture<CampaignCreateComponent>;
  let campaignServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    campaignServiceSpy = { createCampaign: vi.fn() };
    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [CampaignCreateComponent, ReactiveFormsModule],
      providers: [
        { provide: CampaignService, useValue: campaignServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createCampaign on submit', () => {
    campaignServiceSpy.createCampaign.mockReturnValue(of({ id: '1', name: 'Test', description: 'Desc', type: 'VOICE', status: 'DRAFT', createdAt: '2026-04-22' }));
    
    component.form.patchValue({
        name: 'Test',
        description: 'Desc',
        type: 'VOICE' as any
    });
    
    component.onSubmit();
    
    expect(campaignServiceSpy.createCampaign).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/campaigns', '1']);
  });
});
