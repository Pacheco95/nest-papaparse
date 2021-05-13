export const CSVColumnMetadataKey = Symbol('CSVColumn');

export interface CSVColumnDecoratedPropertyMap {
  [propertyName: string]: CSVColumnOptions;
}

export interface CSVColumnOptions {
  name?: string;
}

export function Exportable(options: CSVColumnOptions = {}) {
  return (target: Record<string, any>, propertyKey: string) => {
    const decoratedPropertiesMap: CSVColumnDecoratedPropertyMap =
      Reflect.getMetadata(CSVColumnMetadataKey, target) ?? {};

    decoratedPropertiesMap[propertyKey] = {
      ...options,
      name: options.name ?? propertyKey,
    };

    Reflect.defineMetadata(
      CSVColumnMetadataKey,
      decoratedPropertiesMap,
      target,
    );
  };
}
