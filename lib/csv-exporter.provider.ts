import { Injectable } from '@nestjs/common';

import { unparse, UnparseConfig, UnparseObject } from 'papaparse';
import {
  CSVColumnDecoratedPropertyMap,
  CSVColumnMetadataKey,
} from './exportable.decorator';

export type ExportDtoConfig = Pick<
  UnparseConfig,
  | 'delimiter'
  | 'escapeChar'
  | 'quoteChar'
  | 'newline'
  | 'quotes'
  | 'skipEmptyLines'
  | 'header'
>;

export const defaultExportDtoConfig: Partial<ExportDtoConfig> = {
  header: true,
};

@Injectable()
export class CsvExporterProvider {
  public exportPlainObjects(
    records: Record<string, unknown>[],
    config?: UnparseConfig,
  ): string {
    return unparse(records, config);
  }

  public exportDto<T>(records: T[], config = defaultExportDtoConfig): string {
    if (records.length === 0) {
      return '';
    }

    const decoratedPropertiesMap: CSVColumnDecoratedPropertyMap =
      Reflect.getMetadata(CSVColumnMetadataKey, records[0]) ?? {};

    const propertyNamesMap = this.getPropertyNamesMap(decoratedPropertiesMap);

    const mappedPropertiesNames = Array.from(propertyNamesMap.values());

    const mappedRecords = this.getRecordsWithMappedPropertyNames(
      records,
      propertyNamesMap,
    );

    const objectsToParse: UnparseObject = {
      data: mappedRecords,
      fields: mappedPropertiesNames,
    };

    return unparse(objectsToParse, config);
  }

  private getRecordsWithMappedPropertyNames<T>(
    records: T[],
    propertyNamesMap: Map<string, string>,
  ) {
    return records.map((record) => {
      const mappedRecord: Record<string, unknown> = {};
      for (const [original, mapped] of propertyNamesMap.entries()) {
        mappedRecord[mapped] = (record as any)[original];
      }
      return mappedRecord;
    });
  }

  private getPropertyNamesMap(
    decoratedPropertiesMap: CSVColumnDecoratedPropertyMap,
  ) {
    const decoratedPropertiesNames = Object.keys(decoratedPropertiesMap);
    const propertyNamesMap = new Map<string, string>();

    for (const originalPropertyName of decoratedPropertiesNames) {
      const decorationOptions = decoratedPropertiesMap[originalPropertyName];
      const mappedPropertyName = decorationOptions.name ?? originalPropertyName;
      propertyNamesMap.set(originalPropertyName, mappedPropertyName);
    }

    return propertyNamesMap;
  }
}
