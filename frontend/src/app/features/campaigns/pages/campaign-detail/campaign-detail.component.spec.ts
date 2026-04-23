import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignDetailComponent } from './campaign-detail.component';

describe('CampaignDetailComponent', () => {
  let component: CampaignDetailComponent;
  let fixture: ComponentFixture<CampaignDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignDetailComponent);
    component = fixture.componentInstance;
    
    // Set input
    fixture.componentRef.setInput('id', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display id', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('1');
  });
});
