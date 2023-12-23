import { 
    Body, 
    Controller, 
    FileTypeValidator, 
    Get, 
    MaxFileSizeValidator, 
    Param, 
    ParseFilePipe, 
    ParseIntPipe, 
    Post, 
    UploadedFile, 
    UseInterceptors, 
    ValidationPipe 
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment-dto';
import { ApartmentListDto } from './dto/apartment-list-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApartmentDetailsDto } from './dto/apartment-details-dto';

@Controller('apartments')
export class ApartmentsController {
    constructor(private readonly apartmentsService: ApartmentsService) {}

    @ApiOkResponse({
        description: 'The user records',
        type: ApartmentListDto,
        isArray: true
    })
    @Get()
    getList(): ApartmentListDto[] {
        return this.apartmentsService.getList()
    }

    @Get(':id')
    getDetails(@Param('id', ParseIntPipe) id: number): ApartmentDetailsDto {
        return this.apartmentsService.getDetails(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor(
        'image',
        {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    cb(null, './images');
                },
                filename: function (req, file, cb) {
                    const uuid = crypto.randomUUID()
                    cb(null, `${uuid}.${file.originalname.split('.').pop()}`)
                }
            })
        }
    ))
    create(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1000000 }),
                    new FileTypeValidator({fileType: '.(png|jpeg|jpg)'}),
                ],
            })
        ) image: Express.Multer.File, 
        @Body(ValidationPipe) createApartmentDto: CreateApartmentDto) {
            return this.apartmentsService.create(createApartmentDto, image);
    }
}
