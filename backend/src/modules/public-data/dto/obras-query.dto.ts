import { IsIn, IsOptional, IsString } from 'class-validator';
import { ListQueryDto } from './list-query.dto';

export class ObrasQueryDto extends ListQueryDto {
  @IsOptional()
  @IsIn(['todas', 'em_andamento', 'concluida', 'paralisada'])
  status?: 'todas' | 'em_andamento' | 'concluida' | 'paralisada';

  @IsOptional()
  @IsString()
  municipio?: string;
}
