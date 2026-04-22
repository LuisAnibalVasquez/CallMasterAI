import { Component, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-csv-uploader',
  standalone: true,
  template: `<input type="file" accept=".csv" (change)="onFileSelected($event)">`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsvUploaderComponent {
  fileSelected = output<File>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.fileSelected.emit(input.files[0]);
    }
  }
}
