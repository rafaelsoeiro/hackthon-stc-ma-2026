import { IsOptional, IsString } from 'class-validator';
import { ListQueryDto } from './list-query.dto';

export class ServidoresQueryDto extends ListQueryDto {
  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsString()
  naturezaCargo?: string;
}
