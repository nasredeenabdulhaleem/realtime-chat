import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUsersDto } from './dto/create-users.dto';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  //   @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post()
  addUser(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
  }
  @Roles('admin')
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  // @Roles('admin')
  @Get(':id/exists')
  async userExists(@Param('id') userId: string): Promise<boolean> {
    return this.userService.userExists(userId);
  }

  @Roles('admin')
  @Post()
  addUsers(@Body() createUsersDto: CreateUsersDto) {
    return this.userService.createUsers(createUsersDto.users);
  }
}
