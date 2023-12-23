import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaginationDto } from 'src/dto/common/pagination-dto';
import { PlatformApiService } from 'src/service/platformApi.service';
import { SERVICE_NAME } from 'src/utill/config';
import { Public } from 'src/utill/public.decorator';

@ApiTags('三方平台接口')
@Controller(SERVICE_NAME + '/plat')
export class PlatformApiController {
  constructor(private readonly platformApiService: PlatformApiService) {}

  @ApiOperation({
    summary: '获取服务列表',
  })
  @Post('list')
  async findAll(@Body() query: PaginationDto) {
    return await this.platformApiService.findAll(query);
  }

  @ApiOperation({
    summary: '删除服务',
  })
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.platformApiService.remove(uuid);
  }

  @ApiOperation({
    summary: 'Git Hub获取组织下的仓库列表',
  })
  @Get('/github/org/:org/repos')
  @Public()
  getGitHubOrgRepos(@Param('org') org: string) {
    return this.platformApiService.getRepositoriesForOrg(org);
  }

  @ApiOperation({
    summary: 'Git Hub获取用户下的仓库列表',
  })
  @Get('/github/user/:user/repos')
  @Public()
  getGitHubUserRepos(@Param('user') user: string) {
    return this.platformApiService.getRepositoriesForUser(user);
  }

  @ApiOperation({
    summary: 'Git Hub获取分支',
  })
  @Get('/github/:type/repos/:repos')
  @Public()
  getReposBranchs(@Param('type') type: string, @Param('repos') repos: string) {
    return this.platformApiService.getBranchForRepo(type, repos);
  }

  @ApiOperation({
    summary: 'Git Hub获取commit信息',
  })
  @Get('/github/:type/repos/:repos/branch/:branch')
  @Public()
  getReposCommits(@Param('type') type: string, @Param('repos') repos: string) {
    return this.platformApiService.getReposCommits(type, repos);
  }
}
