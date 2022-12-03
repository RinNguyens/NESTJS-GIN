import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { Profile } from "../users/entities/profile.entity";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {
  }

  async create(id: number, createPostDto: CreatePostDto) {
    const user: any = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        "User not found. Cannot create profile.",
        HttpStatus.BAD_REQUEST
      );
    }
    const newPost = this.postRepository.create({
      ...createPostDto,
      user
    });

    return await this.postRepository.save(newPost);

  }

  findAll() {
    return this.postRepository.find({ relations: ["user"] });
  }

  findOne(id: number) {
    return this.postRepository.find({
      where: {id},
      relations: ['user']
    });
  }

  async update(id: number, user_id: number, updatePostDto: UpdatePostDto) {
    const user = await this.usersRepository.findOneBy({id: user_id});

    if (!user) {
      throw new HttpException(
        "User not found. Cannot create profile.",
        HttpStatus.BAD_REQUEST
      );
    }

    return this.postRepository.update({id}, {...updatePostDto, user});

  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
