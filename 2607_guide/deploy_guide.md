# 배포 가이드 (Deployment Guide)

본 문서는 `한인회리뷰_260526` 프로젝트 (특히 `2607_guide` 폴더)의 배포에 관한 가이드입니다. 

## 1. 현재 배포 환경
- **배포 플랫폼:** Cloudflare Pages
- **프로젝트 명:** `hanin-review2605`
- **배포 URL:** [https://hanin-review2605.pages.dev](https://hanin-review2605.pages.dev)
- **Git 연동 여부:** Yes (현재 GitHub와 연동되어 있음)

## 2. Push 후 실제 배포가 되지 않는 이유
현재 Cloudflare Pages 프로젝트는 GitHub 레포지토리 전체와 연동되어 있으나, 기본적으로 최상위 디렉터리(`/`)를 기준으로 빌드/배포하게끔 설정되어 있을 가능성이 높습니다.
따라서 `2607_guide` 폴더 내부의 HTML 파일들만 단독으로 배포하려면, 단순히 Push하는 것 외에 **배포할 디렉터리를 명시**하거나 **CLI를 통해 직접 해당 디렉터리를 배포**해야 합니다.

## 3. 수동 배포 방법 (CLI 기준)
가장 확실하게 `2607_guide` 폴더를 기준으로 사이트를 즉시 배포하는 방법은 `Wrangler CLI`를 사용하는 것입니다.

```bash
# 1. 터미널을 열고 프로젝트 최상위 폴더(한인회리뷰_260526)로 이동합니다.
cd c:\Users\dante\Desktop\core_project\대표님\한인회리뷰_260526

# 2. 아래 명령어를 실행하여 2607_guide 폴더를 hanin-review2605 프로젝트에 직접 배포합니다.
npx wrangler pages deploy ./2607_guide --project-name hanin-review2605
```

이 명령어는 로컬에 있는 `./2607_guide` 폴더의 상태를 읽고 Cloudflare Pages에 즉시 업로드 및 배포를 진행합니다.

## 4. 자동 배포 설정 방법 (참고)
GitHub에 Push할 때마다 `2607_guide` 내용이 자동으로 배포되게 하려면, Cloudflare Pages 대시보드에서 다음 설정을 변경해야 합니다.
1. Cloudflare 대시보드 로그인 > **Pages** 탭 이동
2. `hanin-review2605` 프로젝트 선택 > **Settings** (설정) > **Builds & deployments** (빌드 및 배포)
3. **Build configurations** 영역에서 Edit 클릭
4. **Build output directory** (빌드 출력 디렉터리)를 `/2607_guide` 또는 환경에 맞게 수정 후 저장
*(참고: 이 설정을 적용하면 앞으로 Push를 할 때마다 해당 폴더를 기준으로 배포가 일어납니다.)*
