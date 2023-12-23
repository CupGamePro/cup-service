流水线：

流水线名称  name

UUID uuid

执行服务uuid  service

当前状态

触发人 

创建人

创建时间

最近一次触发时间


模块表

模块名称  uuid  命令集（暂时只做命令， 后续打包多个命令集合）参数（做一个参数表去存储）



流水线-模块关联表

流水线uuid 模块uuid 





安装node --> 拉取代码(git  需要服务基础信息) --> 安装依赖（npm install）--> 构建代码（npm run build）--> 上传打包产物 --> 启动程序
