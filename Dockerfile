FROM acr.ops.yunlizhi.cn/private-img/devops/config-management.git/ylz-runtime-nginx:1.19.1
ARG SRC
ARG TARGET
ADD $SRC $TARGET	
