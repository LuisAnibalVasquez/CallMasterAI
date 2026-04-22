import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CsvUploaderComponent } from './csv-uploader.component';
import { By } from '@angular/platform-browser';

describe('CsvUploaderComponent', () => {
  let component: CsvUploaderComponent;
  let fixture: ComponentFixture<CsvUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvUploaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CsvUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit file on change', () => {
    const file = new File([''], 'test.csv', { type: 'text/csv' });
    const spy = vi.spyOn(component.fileSelected, 'emit');
    
    const input = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement;
    
    // Mock the files
    Object.defineProperty(input, 'files', {
        value: [file]
    });
    
    input.dispatchEvent(new Event('change'));
    
    expect(spy).toHaveBeenCalledWith(file);
  });
});
