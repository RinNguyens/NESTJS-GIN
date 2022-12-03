import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':user_id')
  create(@Param('user_id') user_id: string, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(+user_id, createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id/user_id/:user_id')
  update(@Param('id') id: string, @Param('user_id') user_id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id , +user_id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
