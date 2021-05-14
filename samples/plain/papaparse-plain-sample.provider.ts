import { Injectable } from '@nestjs/common';
import { CsvExporterProvider } from '../../lib';

@Injectable()
export class PapaparsePlainSampleProvider {
  constructor(private readonly csvExporter: CsvExporterProvider) {}

  exportPlainObjectsSample(): string {
    const plainObjects = [
      {
        name: 'John',
        phone: '(99) 99999-9999',
      },
      {
        name: 'Ana',
        phone: '(88) 88888-8888',
      },
    ];
    const exportedCSV = this.csvExporter.exportPlainObjects(plainObjects);
    console.log(exportedCSV);
    return exportedCSV;
  }
}
