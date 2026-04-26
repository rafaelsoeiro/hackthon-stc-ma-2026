import { IsOptional, IsString } from 'class-validator';
import { ListQueryDto } from './list-query.dto';

export class EmendasQueryDto extends ListQueryDto {
  @IsOptional()
  @IsString()
  programa?: string;

  @IsOptional()
  @IsString()
  naturezaDespesa?: string;
}
