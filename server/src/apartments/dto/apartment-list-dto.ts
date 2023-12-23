import { ApiProperty } from '@nestjs/swagger';

export class ApartmentListDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    image: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    price: number;
}