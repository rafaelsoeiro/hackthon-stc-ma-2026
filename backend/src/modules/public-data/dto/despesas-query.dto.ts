import { IsOptional, IsString } from 'class-validator';
import { ListQueryDto } from './list-query.dto';

export class DespesasQueryDto extends ListQueryDto {
  @IsOptional()
  @IsString()
  funcao?: string;

  @IsOptional()
  @IsString()
  programa?: string;

  @IsOptional()
  @IsString()
  fonte?: string;
}
