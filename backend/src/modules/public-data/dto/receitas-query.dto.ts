import { IsOptional, IsString } from 'class-validator';
import { ListQueryDto } from './list-query.dto';

export class ReceitasQueryDto extends ListQueryDto {
  @IsOptional()
  @IsString()
  naturezaReceita?: string;

  @IsOptional()
  @IsString()
  fonte?: string;
}
