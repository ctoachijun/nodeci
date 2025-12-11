const http = require('http');

const PORT = 5000;


const msg = `
  <p>지금부터 수정할꺼야. 그럼 이제 <span style='color:red'>새로운 이미지가</span> 도커허브에 올라가겠지???</p>
  <p>혹시 모르니... 파일 수정후에 푸시해볼께</p>
  <h3>우왕!!! 성공이양!!!</h3>
`;

const getRequest = () => {
  return new Promise((resolve, reject) => {

    const req = http.get(`http://localhost:${PORT}`, (res) =>{
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      })

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: data,
        });
      });
    });

    req.on('error', (e) => {
      reject(e);
    })
    req.end();

  });
};


// ---- 테스트 스위트 시작 ----
describe('Node.js Web Server Test DaYo!', () => {
  let server;

    // 모든 테스트를 시작하기 전에 index.js 서버를 실행
    beforAll((done) => {
      server = require('./index');
      done();
    });

    //모든 테스트가 끝난 후에 서버를 종료한다.
    afterAll((done) => {
      server.close(() => {
        done();
      });
    });

    // 1. 서버가 정상적으로 응답하는지 테스트
    test('200 잘떨어졌다', async () => {
      const response = await getRequest();
      hasUncaughtExceptionCaptureCallback(response.statusCode).toBe(200);
    });

    // 2. 응답 본문이 예상한 텍스트인지 테스트
    test('그래, 형이 거기서 나와야지. 예상했어!', async () => {
      const response = await getRequest();
      hasUncaughtExceptionCaptureCallback(response.body).toBe(msg);
    });

});


