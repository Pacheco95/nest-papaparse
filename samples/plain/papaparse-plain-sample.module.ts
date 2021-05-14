import { Module } from '@nestjs/common';
import { PapaparseModule } from '../../lib';
import { PapaparsePlainSampleProvider } from './papaparse-plain-sample.provider';

@Module({
  imports: [PapaparseModule],
  providers: [PapaparsePlainSampleProvider],
})
export class PapaparsePlainSampleModule {}
