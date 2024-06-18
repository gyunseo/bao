# 인공지능 기반의 챗봇 서비스 바오

![cute_bao](bao.png)

## dev mode

먼저 레디스를 실행해주세요. (굳이 foreground로 실행할 필요는 없습니다.)

```zsh
redis-server
```

```zsh
npm ci
npm run start:dev

project root에 `.env` 파일을 만들어서 환경변수를 설정해주세요.
```

```plaintext
OPENAI*API_KEY=openai_api_key
ASST_ID=openai_assistatnt_id
THREAD_ID=openai_assistant_thread_id
REDIS_PORT=레디스*포트
REDIS*HOST=레디스\_URL
MASTER_NAME=당신*이름
```

## 배포 방법

Dockerfile이 있으니, 도커로 말아서 배포하면 됩니다. (참고로 레디스도 필요합니다.)

`.env` 파일을 만들어서 환경변수를 설정해주세요.

```plaintext
OPENAI*API_KEY=openai_api_key
ASST_ID=openai_assistatnt_id
THREAD_ID=openai_assistant_thread_id
REDIS_PORT=레디스*포트
REDIS*HOST=레디스\_URL
MASTER_NAME=당신*이름
```
