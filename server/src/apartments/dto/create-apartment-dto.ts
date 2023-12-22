import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsPositive } from "class-validator";

export class CreateApartmentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @Type(() => Number)
    @IsPositive()
    price: number;
}