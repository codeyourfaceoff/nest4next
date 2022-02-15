import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class Todo {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;

  @IsString()
  @ApiProperty({ type: String })
  text: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  completed: boolean;
}
