import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScriptUploaderComponent } from './script-uploader.component';
import { By } from '@angular/platform-browser';

describe('ScriptUploaderComponent', () => {
  let component: ScriptUploaderComponent;
  let fixture: ComponentFixture<ScriptUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScriptUploaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScriptUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit file on change', () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    const spy = vi.spyOn(component.fileSelected, 'emit');
    
    const input = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement;
    
    Object.defineProperty(input, 'files', {
        value: [file]
    });
    
    input.dispatchEvent(new Event('change'));
    
    expect(spy).toHaveBeenCalledWith(file);
  });
});
