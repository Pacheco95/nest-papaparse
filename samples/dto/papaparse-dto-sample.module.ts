import { Module } from '@nestjs/common';
import { PapaparseModule } from '../../lib';
import { PapaparseDtoSampleProvider } from './papaparse-dto-sample.provider';

@Module({
  imports: [PapaparseModule],
  providers: [PapaparseDtoSampleProvider],
})
export class PapaparseDtoSampleModule {}
