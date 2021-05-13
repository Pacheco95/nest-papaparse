import { Test, TestingModule } from '@nestjs/testing';
import { CsvExporterProvider, PapaparseModule } from '../lib';

describe('Exportable decorator', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PapaparseModule],
    }).compile();
  });

  it('should succeed to export plain objects', function () {
    const csvExporter = module.get(CsvExporterProvider);
    const objects = [
      {
        name: 'John',
        phone: '(99) 99999-9999',
      },
      {
        name: 'Ana',
        phone: '(88) 88888-8888',
      },
    ];
    const expectedCsv =
      'name,phone\r\n' + 'John,(99) 99999-9999\r\n' + 'Ana,(88) 88888-8888';
    expect(csvExporter.exportPlainObjects(objects)).toBe(expectedCsv);
  });
});
