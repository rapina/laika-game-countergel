# Game Art & Audio Provenance

- 날짜: 2026-07-17
- 게임: `countergel`

## 타이틀 키 이미지

- 원본: `art/source/countergel-key.png`, 1254×1254 PNG
- 공개 사본: `public/art/countergel-key.png`
- 프롬프트/기계 기록: `art/prompts/countergel-key.md`, `art/provenance/countergel-key.json`
- SHA-256: `152e35455abf3905e34aac699f923f89feadd6bb31a52cfe36fd1bed86cf29c7`
- 도구: OpenAI Codex 내장 `image_gen`, 단일 생성 원본.
- 프롬프트: “Create one square title key art image for a polished hyper-casual mobile game called Countergel. A single translucent citron-yellow gel block is suspended in a vertical cool-teal laboratory tower, split cleanly into two nearly equal wobbling halves above a minimal balance scale. Black citrus seeds and tiny bubbles inside the gel reveal a slightly shifted center of mass. The fresh torn cross-sections are bright and rough. Ink-black structural lines, cool teal shadows, dramatic centered composition, tactile glossy soft-body material, subtle refraction, clean editorial game key art, no characters, no text, no logos, no UI, no border, no currency, no photographic objects. High contrast, readable at small size, restrained palette, premium 2D/3D hybrid illustration.”
- 후가공: 픽셀 변경 없음. 생성 원본을 파일명만 정규화해 복사하고 CSS `object-fit: cover`, 둥근 마스크와 그림자로 타이틀에 합성.
- 사용 위치: 첫 타이틀 화면의 대표 이미지.

## 실시간 게임 아트

- 원본: 코드로 직접 제작한 Canvas 2D 도형과 그라디언트. 외부 이미지 없음.
- 방식: 반투명 선형 그라디언트, 하이라이트 윤곽, 결정론 씨앗/기포, 저울 기울기, 프레임 광선. 스와이프 선으로 젤 몸체 다각형을 두 반평면으로 클리핑하고 각 입자도 같은 선의 한쪽 조각에만 남긴다. 절단 경계에는 밝은 시트론 단면을 새로 그리며 두 조각은 서로 다른 방향과 회전으로 이동한다. 렌더러, 질량 판정, 화면 정보 기반 시뮬레이션이 같은 젤 경계와 입자 좌표를 사용한다.
- 사용 위치: 낙하 젤, 절단 후 조각, 판정 카드, 실험탑.

## 게임 사운드

- 원본/방식: `AudioContext` 오실레이터로 런타임 합성한 짧은 사인 톤. 절단 540Hz, Perfect 880Hz, Stable 660Hz, 실패 120Hz이며 지수 감쇠한다.
- 사용 위치: 첫 포인터/키 입력 뒤 절단과 판정. 이미지·음원 스톡 및 기존 mp3는 사용하지 않는다.

## 공개용 라이카 일러스트

- 캐릭터 기준: `laika-base-v1`
- 베이스 SHA-256: `820e6d43e915c4e9e32ddcd3cc14d0f2537d99f6d8d397bbd40fc416137a6712`
- 생성 원본: `art/source/laika-countergel.png`
- 재현용 아트 디렉션: `art/prompts/laika-countergel.md`
- 해시와 검수: `art/provenance/laika-countergel.json`
- 웹 카드: `public/art/laika-countergel-640.jpg`
- 웹 상세: `public/art/laika-countergel-1280.jpg`

잠긴 대표 행동과 도구만 가져온다. 베이스 그림의 캡슐, 창, 지구, 팔레트를 게임 UI나 플레이 아트에 반영하지 않는다. 얼굴 무늬, 귀, 하네스, 주황 연결구, 발의 골격, 생성 문자, 모바일 크롭을 확인한다.

- 생성 원본: `art/source/laika-countergel.png` (1536×1024, `2ee7fc931e4e2104eeb07c74017fe55adf0b2b6054abcfb9dba32630708dca86`)
- 웹 파생본: `public/art/laika-countergel-640.jpg`, `public/art/laika-countergel-1280.jpg`
- 직접 검수: 얼굴, 귀, 하네스, 연결구, 네 발 골격, 생성 문자 없음, 모바일 크롭 통과.
