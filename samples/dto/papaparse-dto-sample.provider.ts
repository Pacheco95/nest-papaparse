import { Injectable } from '@nestjs/common';
import { CsvExporterProvider, Exportable } from '../../lib';

class SampleDTO {
  constructor(name: string, phone: string) {
    this.name = name;
    this.phone = phone;
  }

  @Exportable({
    /** Replace csv column name to fullName instead of name */
    name: 'fullName',
  })
  private name: string;

  @Exportable()
  private phone: string;
}

@Injectable()
export class PapaparseDtoSampleProvider {
  constructor(private readonly csvExporter: CsvExporterProvider) {}

  public exportPlainObjectsSample(): string {
    const dtos = [
      new SampleDTO('John', '(99) 99999-9999'),
      new SampleDTO('Ana', '(88) 88888-8888'),
    ];
    const exportedCSV = this.csvExporter.exportDto(dtos);
    console.log(exportedCSV);
    return exportedCSV;
  }
}
