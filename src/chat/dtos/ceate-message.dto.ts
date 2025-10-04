import { IsNotEmpty, IsString } from 'class-validator';



export class CreateMessageDtos {

    @IsNotEmpty()
    msg: string

    @IsNotEmpty()
    roomID: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    profileImage: string

}