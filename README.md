<p>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Nest Papaparse

[Papaparse](https://github.com/mholt/PapaParse) wrapper provider for [Nest.js](https://github.com/nestjs/nest) with additional facilities

## Usage

All you need to do is import the [PapaparseModule](lib/papaparse.module.ts) into your module
and inject the [CsvExporterProvider](lib/csv-exporter.provider.ts) into your providers. See [samples](samples):
- Exporting plain objects [sample](samples/plain)
- Exporting dto using [Exportable](lib/exportable.decorator.ts) decorator [sample](samples/dto)

## Test

```bash
# unit tests
$ npm run test
```

## Stay in touch

- Author - [Michael Pacheco](https://www.linkedin.com/in/michaelpacheco95/)

## License

nest-papaparse is [MIT licensed](LICENSE).
