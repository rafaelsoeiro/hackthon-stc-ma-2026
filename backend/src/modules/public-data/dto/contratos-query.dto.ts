import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ListQueryDto } from './list-query.dto';

export class ContratosQueryDto extends ListQueryDto {
  @IsOptional()
  @IsIn(['Todos', 'Licitacao', 'Dispensa', 'Inexigibilidade'])
  tipo?: 'Todos' | 'Licitacao' | 'Dispensa' | 'Inexigibilidade';

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valorMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valorMax?: number;

  @IsOptional()
  @Transform(({ value }: TransformFnParams): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  periodoInicio?: string;

  @IsOptional()
  @IsString()
  periodoFim?: string;
}
