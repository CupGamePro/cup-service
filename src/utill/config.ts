// 服务名
const SERVICE_NAME = '/plat-service';

const jwtConstants = {
  secret: 'SICVNRNVB;/ZEP', // 密钥
  expiresIn: '6000s', // token有效时间
};

const JWT_CONSTANTS_REFRESH = {
  secret: 'SICVNRNVB;/ZEPiijj', // 密钥
  expiresIn: '2d', // token有效时间
};

export { SERVICE_NAME, jwtConstants, JWT_CONSTANTS_REFRESH };
