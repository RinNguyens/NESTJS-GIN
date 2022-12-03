import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from "./entities/profile.entity";
import { createUserProfileDto } from "./dto/create-profile.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['profile', 'posts']});
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ id }, {...updateUserDto});
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async createUserProfile(id: number, createUserProfileDto: createUserProfileDto) {
    const user: any = await this.usersRepository.findOneBy({id});
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create profile.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProfile = this.profileRepository.create(createUserProfileDto);
    const saveProfile = await this.profileRepository.save(newProfile);

    user.profile = saveProfile;

    return this.usersRepository.save(user);

  }
}
