import { Test, TestingModule } from '@nestjs/testing';
import { CsvExporterProvider, Exportable, PapaparseModule } from '../lib';

class TestDTO {
  constructor(name: string, phone: string) {
    this.name = name;
    this.phone = phone;
  }

  @Exportable({ name: 'fullName' })
  private name: string;

  @Exportable()
  private phone: string;
}

describe('Exportable decorator', () => {
  let module: TestingModule;
  let csvExporter: CsvExporterProvider;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PapaparseModule],
    }).compile();

    csvExporter = module.get(CsvExporterProvider);
  });

  it('should succeed to export plain objects', () => {
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

  it('should succeed to export a DTO', () => {
    const objects = [
      new TestDTO('John', '(99) 99999-9999'),
      new TestDTO('Ana', '(88) 88888-8888'),
    ];
    const expectedCsv =
      'fullName,phone\r\n' + 'John,(99) 99999-9999\r\n' + 'Ana,(88) 88888-8888';
    expect(csvExporter.exportDto(objects)).toBe(expectedCsv);
  });
});
