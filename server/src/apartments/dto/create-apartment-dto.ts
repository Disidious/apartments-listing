import { IsString, IsNotEmpty, IsPositive } from "class-validator";

export class CreateApartmentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsPositive()
    price: number;
}