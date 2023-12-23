// 服务名
const SERVICE_NAME = '/plat-service';

const jwtConstants = {
  secret: 'SICVNRNVB;/ZEP', // 密钥
  expiresIn: '6000s', // token有效时间
};

const PLATFORM_CONFIG = {
  GIT_HUB_API_URL: 'https://api.github.com',
  GIT_HUB_ORGANIZATION: 'CupGamePro',
  GIT_HUB_USERNAME: 'changweicup',
  GIT_HUB_USER_API_TOKEN:
    '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',
  GIT_HUB_ORG_API_TOKEN:
    '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',
};

export { SERVICE_NAME, jwtConstants, PLATFORM_CONFIG };
