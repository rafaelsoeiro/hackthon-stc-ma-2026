import { IsIn, IsOptional, IsString } from 'class-validator';
import { ListQueryDto } from './list-query.dto';

export class ProgramasQueryDto extends ListQueryDto {
  @IsOptional()
  @IsIn(['Licitacao', 'Emenda', 'Transferencia', 'RecursoProprio'])
  origem?: 'Licitacao' | 'Emenda' | 'Transferencia' | 'RecursoProprio';

  @IsOptional()
  @IsString()
  status?: string;
}
