# 인공지능 기반의 챗봇 서비스 바오

![cute_bao](bao.png)

## 배포 방법

Dockerfile이 있으니, 도커로 말아서 배포하면 됩니다. (참고로 레디스도 필요합니다.)

`.env` 파일을 만들어서 환경변수를 설정해주세요.

```
OPENAI_API_KEY=openai_api_key
ASST_ID=openai_assistatnt_id
THREAD_ID=openai_assistant_thread_id
REDIS_PORT=레디스_포트
REDIS_HOST=레디스_URL
MASTER_NAME=당신_이름
```
