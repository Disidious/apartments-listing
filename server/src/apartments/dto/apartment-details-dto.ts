import { ApiProperty } from '@nestjs/swagger';

export class ApartmentDetailsDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    image: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;
}