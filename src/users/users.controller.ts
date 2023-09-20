import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  UserCreateReqDto,
  UserLoginReqDto,
  UserLoginResDto,
  UserHeaderReqDto,
  UserProfileResDto,
  UserPasswordReqDto,
} from './dto/index';
import { Serialize } from '../utils/loaders/SerializeDto';
import { UserService } from './services/users.service';
import { AuthType } from '../utils/token/types';
import { Auth } from '../utils/decorators/auth.decorator';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Auth(AuthType.None)
  @Serialize(UserLoginResDto)
  @ApiResponse({
    description: 'for more information please check UserCreateReqDto schema',
  })
  @ApiOkResponse({
    description:
      'When user registration successfully then this response will receive',
    type: UserLoginResDto,
  })
  @ApiBadRequestResponse({
    description: 'when user email is already taken',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signUp(@Body() body: UserCreateReqDto) {
    return this.userService.createUser(body);
  }

  @Auth(AuthType.None)
  @Serialize(UserLoginResDto)
  @ApiResponse({
    description: 'for more information please check UserLoginReqDto schema',
  })
  @ApiOkResponse({
    description: 'When user login successfully then this response will receive',
    type: UserLoginResDto,
  })
  @ApiBadRequestResponse({
    description:
      'when user email or password is wrong or user account is ban from admin',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: UserLoginReqDto) {
    return this.userService.loginUser(body);
  }

  @Serialize(UserProfileResDto)
  @ApiResponse({
    description: 'for more information please check UserHeaderReqDto schema',
  })
  @ApiOkResponse({
    description:
      'When user profile is successfully retrived then this response will receive',
    type: UserProfileResDto,
  })
  @ApiBadRequestResponse({
    description: 'when user not found',
  })
  @ApiBearerAuth()
  @Get('/profile')
  async profile(@Headers('user') user: UserHeaderReqDto) {
    return this.userService.profile(user);
  }

  @Serialize(UserProfileResDto)
  @ApiResponse({
    description: 'for more information please check UserHeaderReqDto schema',
  })
  @ApiOkResponse({
    description: 'When user change password request is successfull',
  })
  @ApiBadRequestResponse({
    description: 'when old password is incorrect',
  })
  @ApiBearerAuth()
  @Post('/change-password')
  async changePassword(
    @Headers('user') user: UserHeaderReqDto,
    @Body() body: UserPasswordReqDto,
  ) {
    return this.userService.changePassword(user, body);
  }
}
