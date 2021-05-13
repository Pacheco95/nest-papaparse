import { Module } from '@nestjs/common';
import { CsvExporterProvider } from './csv-exporter.provider';

@Module({
  providers: [CsvExporterProvider],
  exports: [CsvExporterProvider],
})
export class PapaparseModule {}
