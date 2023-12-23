import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment-dto';
import './data.json';

import * as fs from 'fs';
import * as path from 'path';
import { ApartmentListDto } from './dto/apartment-list-dto';
import { ApartmentDetailsDto } from './dto/apartment-details-dto';

@Injectable()
export class ApartmentsService {
    private apartments = []

    constructor() {
        const stringData = fs.readFileSync(
            path.join(__dirname, "/data.json"),
            { encoding: 'utf8', flag: 'r' }
        );

        this.apartments = JSON.parse(stringData)
    }

    getList(): ApartmentListDto[] {
        const list = this.apartments.map(apartment => {
            return {
                id: apartment.id,
                image: apartment.image,
                title: apartment.title,
                price: apartment.price
            }
        });

        return list;
    }

    getDetails(id: number): ApartmentDetailsDto {
        const apartment = this.apartments.find(apartment => apartment.id === id)
        if (!apartment) {
            throw new NotFoundException('Apartment not found.')
        }

        return apartment
    }

    create(createApartmentDto: CreateApartmentDto, image: Express.Multer.File) {
        const newAppartment = {
            ...createApartmentDto,
            id: (new Date()).getTime(),
            image: image.filename,
        }
        
        this.apartments.push(newAppartment)

        fs.writeFileSync(
            path.join(__dirname, "/data.json"),
            JSON.stringify(this.apartments),
            'utf-8'
        )

        return newAppartment;
    }
}
