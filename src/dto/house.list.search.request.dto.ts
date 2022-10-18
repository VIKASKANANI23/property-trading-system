import { ApiPropertyOptional } from '@nestjs/swagger';
// import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationRequestDto } from './pagination.request.dto';

export class HouseListSearchRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional({ example: '' })
  //   @Transform((value) => value.trim())
  @IsOptional()
  readonly searchData: string;
}
