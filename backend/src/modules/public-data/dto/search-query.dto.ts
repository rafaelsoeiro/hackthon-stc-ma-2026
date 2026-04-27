import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ListQueryDto } from './list-query.dto';

export class SearchQueryDto extends ListQueryDto {
  @IsOptional()
  @Transform(({ value }: TransformFnParams): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  types?: string;

  @IsOptional()
  @IsString()
  municipio?: string;
}
