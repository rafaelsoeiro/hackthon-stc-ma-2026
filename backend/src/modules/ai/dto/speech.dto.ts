import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SpeechDto {
  @ApiProperty({
    description: 'Texto da resposta da IA a ser convertido em audio.',
    example:
      'O Maranhao executou despesas relevantes em saude em 2026, com destaque para custeio hospitalar.',
    maxLength: 4000,
  })
  @IsString()
  @IsNotEmpty({ message: 'O texto para audio nao pode estar vazio.' })
  @MaxLength(4000, {
    message: 'O texto para audio deve ter no maximo 4000 caracteres.',
  })
  text!: string;
}
