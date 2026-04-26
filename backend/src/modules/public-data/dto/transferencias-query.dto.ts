import { IsIn, IsOptional, IsString } from 'class-validator';
import { ListQueryDto } from './list-query.dto';

export class TransferenciasQueryDto extends ListQueryDto {
  @IsOptional()
  @IsIn(['recebida', 'realizada'])
  tipo?: 'recebida' | 'realizada';

  @IsOptional()
  @IsString()
  programa?: string;

  @IsOptional()
  @IsString()
  natureza?: string;
}
