# 1. 사용할 Node.js 기반 이미지 지정 (안정적인 LTS 슬림 버전 사용 권장)
FROM node:lts-slim

# 2. 컨테이너 내부의 작업 디렉토리 설정
WORKDIR /usr/src/app

# 3. package.json과 package-lock.json 파일을 컨테이너 내부로 복사
COPY package*.json ./

# 4. 종속성(dependencies) 설치
RUN npm install

# 5. 나머지 모든 프로젝트 파일들을 작업 디렉토리로 복사
COPY . .

# 6. 애플리케이션이 사용할 포트 지정
EXPOSE 5000

# 7. 컨테이너가 시작될 때 실행할 명령어 지정
#CMD [ "node", "index.js" ]
CMD [ "npm", "run", "dev" ]
