import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/common/login.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/entities/user-role.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private readonly JwtService: JwtService,
  ) {}

  /**
   * 登录
   * @param user
   */
  async login(user: LoginDto) {
    const userEntity = await this.userRepository.findOne({
      where: {
        username: user.username,
        password: user.password,
      },
    });

    if (!userEntity) {
      throw new NotFoundException('用户名或密码错误');
    }
    return {
      message: '登录成功',
      token: this.JwtService.sign({
        userUuid: userEntity.uuid,
      }),
    };
  }

  /**
   * 获取用户信息
   * @param token token
   * @returns
   */
  async getUserInfo(token) {
    const { userUuid } = this.JwtService.decode(token);
    const userEntity = await this.userRepository.findOne({
      where: {
        uuid: userUuid,
      },
    });
    const userRoles = await this.userRoleRepository.find({
      where: { user: userEntity },
      relations: ['role'],
    });

    const user = {
      ...userEntity,
      roles: userRoles.map((userRole) => userRole.role),
      roleIds: userRoles.map((userRole) => userRole.role.uuid),
    };
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} common`;
  }

  update(id: number) {
    return `This action updates a #${id} common`;
  }

  remove(id: number) {
    return `This action removes a #${id} common`;
  }
}
