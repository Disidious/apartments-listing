import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment-dto';
import data from './data.json';

import * as fs from 'fs';
import * as path from 'path';

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

    getList() {
        const list = this.apartments.map(apartment => {
            return {
                id: apartment.id,
                title: apartment.title,
                price: apartment.price
            }
        });

        return list;
    }

    getDetails(id: number) {
        const apartment = this.apartments.find(apartment => apartment.id === id)
        console.log(apartment)
        if (!apartment) {
            throw new NotFoundException('Apartment not found.')
        }

        return apartment
    }

    create(createApartmentDto: CreateApartmentDto) {
        const newAppartment = {
            id: (new Date()).getTime(),
            ...createApartmentDto
        }
        this.apartments.push(newAppartment)

        fs.writeFileSync(
            path.join(__dirname, "/data2.json"),
            JSON.stringify(this.apartments),
            'utf-8'
        )

        return newAppartment;
    }
}
