import {IsUUID} from 'class-validator';

export class AddFavoriteDto {
  @IsUUID()
  readonly cat_id: string;
}
