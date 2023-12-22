import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment-dto';

@Controller('apartments')
export class ApartmentsController {
    constructor(private readonly apartmentsService: ApartmentsService) {}

    @Get()
    getList() {
        return this.apartmentsService.getList()
    }

    @Get(':id')
    getDetails(@Param('id', ParseIntPipe) id: number){
        return this.apartmentsService.getDetails(id);
    }

    @Post()
    create(@Body(ValidationPipe) createApartmentDto: CreateApartmentDto) {
        return this.apartmentsService.create(createApartmentDto);
    }
}
