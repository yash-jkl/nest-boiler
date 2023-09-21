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
import { Serialize } from '../utils/loaders/SerializeDto';
import { AuthType } from '../utils/token/types';
import { Auth } from '../utils/decorators/auth.decorator';
import { AdminService } from './services/admin.service';
import {
  AdminCreateReqDto,
  AdminLoginReqDto,
  AdminLoginResDto,
  AdminHeaderReqDto,
  AdminProfileResDto,
} from './dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Auth(AuthType.None)
  @Serialize(AdminLoginResDto)
  @ApiResponse({
    description: 'for more information please check AdminCreateReqDto schema',
  })
  @ApiOkResponse({
    description:
      'When user registration successfully then this response will receive',
    type: AdminLoginResDto,
  })
  @ApiBadRequestResponse({
    description: 'when user email is already taken',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signUp(@Body() body: AdminCreateReqDto) {
    return this.adminService.createAdmin(body);
  }

  @Auth(AuthType.None)
  @Serialize(AdminLoginResDto)
  @ApiResponse({
    description: 'for more information please check AdminLoginReqDto schema',
  })
  @ApiOkResponse({
    description:
      'When admin login successfully then this response will receive',
    type: AdminLoginResDto,
  })
  @ApiBadRequestResponse({
    description: 'when admin email or password is wrong',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: AdminLoginReqDto) {
    return this.adminService.loginAdmin(body);
  }

  @Auth(AuthType.AdminBearer)
  @Serialize(AdminProfileResDto)
  @ApiBearerAuth()
  @ApiResponse({
    description: 'for more information please check AdminLoginReqDto schema',
  })
  @ApiOkResponse({
    description:
      'When user profile is successfully retrived then this response will receive',
    type: AdminProfileResDto,
  })
  @ApiBadRequestResponse({
    description: 'when user not found',
  })
  @Get('/profile')
  async profile(@Headers('user') user: AdminHeaderReqDto) {
    return this.adminService.profile(user);
  }
}
