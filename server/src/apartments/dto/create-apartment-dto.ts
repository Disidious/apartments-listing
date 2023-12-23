import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    address: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @Type(() => Number)
    @IsPositive()
    @ApiProperty()
    price: number;
}