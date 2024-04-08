import { IsUUID } from 'class-validator';

export class GetCatDto {
  @IsUUID()
  id: string;
}
