import { Component, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-script-uploader',
  standalone: true,
  template: `<input type="file" accept=".txt" (change)="onFileSelected($event)">`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScriptUploaderComponent {
  fileSelected = output<File>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.fileSelected.emit(input.files[0]);
    }
  }
}
