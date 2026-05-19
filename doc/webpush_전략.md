대만 기준으로 다시 보면 **한국보다 iOS 비중이 훨씬 높아서 웹푸시 실패 리스크가 더 큽니다.**

## 1. 대만 모바일 OS 점유율 기준

2026년 4월 StatCounter 기준 대만 모바일 OS 점유율은 다음과 같습니다.

| OS           |      대만 점유율 |
| ------------ | ----------: |
| iOS          |  **56.78%** |
| Android      |  **43.03%** |
| Samsung / 기타 | **약 0.17%** |

즉, 대만은 한국과 달리 **iPhone 사용자가 과반**입니다. 한국 기준에서는 iOS 제약이 약 30%대 사용자 문제였지만, 대만에서는 **전체 사용자의 절반 이상이 iOS PWA 제약 영향권**에 들어갑니다. ([StatCounter Global Stats][1])

---

## 2. iOS 웹푸시 조건 재확인

iOS에서 웹푸시는 일반 Safari 접속만으로는 앱푸시처럼 동작하지 않습니다. 핵심 조건은 다음입니다.

| 조건     | 내용                                  |
| ------ | ----------------------------------- |
| iOS 버전 | iOS/iPadOS 16.4 이상                  |
| 설치 상태  | 홈 화면에 추가된 PWA여야 함                   |
| 권한 요청  | 사용자 클릭/탭 같은 명시적 액션 이후 요청            |
| 실행 형태  | Safari 탭이 아니라 홈 화면 웹앱으로 실행되는 상태가 유리 |
| 개발자 계정 | 웹푸시만이면 Apple 개발자 계정 불필요             |

Apple/WebKit은 iOS/iPadOS 16.4부터 **홈 화면에 추가된 웹 앱**에서 Web Push를 지원한다고 안내합니다. ([The Times of India][2])

---

## 3. 대만 기준 iOS 버전 문제

대만 iOS 사용자 중 상당수는 이미 iOS 18 또는 iOS 26 계열로 보입니다. StatCounter의 2026년 4월 대만 iOS 버전 데이터에서도 iOS 26.3, iOS 26.4, iOS 26.2, iOS 18.7, iOS 18.6, iOS 18.5 등이 상위권으로 확인됩니다. ([StatCounter Global Stats][3])

따라서 대만에서도 **OS 버전 미지원 문제보다는 홈 화면 추가 여부가 핵심 병목**입니다.

---

# 4. 대만 기준 웹푸시 실패율 산정

대만 모바일 사용자 100명 기준으로 계산하면:

```txt
iOS 사용자: 56.78명
Android 사용자: 43.03명
기타: 0.17명
```

iOS Web Push 기술 호환률은 보수적으로 **95%**로 가정하겠습니다. 즉, iOS 사용자 중 버전상 가능한 사용자는:

```txt
56.78 × 95% = 약 53.94명
```

문제는 이 53.94명 중 실제로 **홈 화면에 추가하고 알림 권한까지 허용하는 사용자**가 얼마나 되느냐입니다.

---

## 5. iOS 홈 화면 추가율별 실패율

| iOS 홈 화면 추가율 |    iOS 중 푸시 가능 후보 | 전체 모바일 기준 iOS 푸시 가능 | 전체 모바일 기준 iOS 제약 실패 |
| -----------: | ----------------: | ------------------: | ------------------: |
|          10% | 56.78 × 95% × 10% |         약 **5.39%** |        약 **51.39%** |
|          20% | 56.78 × 95% × 20% |        약 **10.79%** |        약 **45.99%** |
|          30% | 56.78 × 95% × 30% |        약 **16.18%** |        약 **40.60%** |
|          50% | 56.78 × 95% × 50% |        약 **26.96%** |        약 **29.82%** |

### 핵심 해석

대만에서는 iOS 비중이 높기 때문에, iOS 사용자 중 **20%가 홈 화면에 추가한다는 낙관적 가정**을 해도 전체 사용자 기준으로 **약 46%는 iOS 웹푸시 제약 때문에 도달이 어렵다**고 볼 수 있습니다.

---

# 6. Android까지 포함한 전체 웹푸시 성공/실패 추정

Android는 iOS보다 PWA 설치와 웹푸시 경험이 좋지만, 여기도 모든 사용자가 알림을 허용하지는 않습니다.

아래는 실무 추정치입니다.

## 보수적 시나리오

| 구분      |    점유율 | 최종 푸시 가능률 가정 |      전체 기여 |
| ------- | -----: | -----------: | ---------: |
| Android | 43.03% |          40% |     17.21% |
| iOS     | 56.78% |          10% |      5.68% |
| 합계      |      - |            - | **22.89%** |

```txt
전체 웹푸시 성공 가능: 약 23%
전체 실패/미도달 가능: 약 77%
```

---

## 일반적 시나리오

| 구분      |    점유율 | 최종 푸시 가능률 가정 |      전체 기여 |
| ------- | -----: | -----------: | ---------: |
| Android | 43.03% |          55% |     23.67% |
| iOS     | 56.78% |          20% |     11.36% |
| 합계      |      - |            - | **35.03%** |

```txt
전체 웹푸시 성공 가능: 약 35%
전체 실패/미도달 가능: 약 65%
```

---

## 적극 유도 시나리오

홈 화면 추가 안내, 설치 유도 UI, 알림 혜택, 반복 안내를 잘 설계한 경우입니다.

| 구분      |    점유율 | 최종 푸시 가능률 가정 |      전체 기여 |
| ------- | -----: | -----------: | ---------: |
| Android | 43.03% |          70% |     30.12% |
| iOS     | 56.78% |          35% |     19.87% |
| 합계      |      - |            - | **49.99%** |

```txt
전체 웹푸시 성공 가능: 약 50%
전체 실패/미도달 가능: 약 50%
```

---

# 7. 한국 기준과 대만 기준 비교

| 항목                  |        한국 |           대만 |
| ------------------- | --------: | -----------: |
| iOS 점유율             |     약 32% |    **약 57%** |
| Android 점유율         |     약 68% |    **약 43%** |
| 웹푸시 리스크             |        중간 |       **높음** |
| iOS PWA 홈 화면 추가 의존도 |     영향 있음 |     **매우 큼** |
| 웹푸시만으로 운영 가능성       | 보조 채널로 가능 | **보조 채널 권장** |
| 앱 전환 필요성            |        중간 |       **높음** |

대만은 iOS 비중이 높기 때문에, **PWA 웹푸시를 메인 알림 채널로 쓰기에는 한국보다 더 위험**합니다.

---

# 8. 대만 서비스 기준 추천 전략

대만 한인회, 생활밀착형 플랫폼, 커뮤니티, 위치기반 업체정보 서비스라면 이렇게 가져가는 게 안전합니다.

## MVP 단계

```txt
PWA 웹 배포
+ 홈 화면 추가 기능
+ 웹푸시
+ 이메일 알림
+ LINE 공유/채널 연동 검토
```

대만에서는 카카오톡보다 **LINE 사용성이 훨씬 중요**할 가능성이 높습니다. 따라서 웹푸시만 믿기보다는 **LINE Official Account 또는 LINE Login/Message 연동 가능성**을 같이 보는 게 좋습니다.

---

## 운영 단계

```txt
공지사항 / 새 글 / 이벤트:
웹푸시 사용 가능

긴급 공지 / 예약 / 신청 결과:
웹푸시 + 이메일 + LINE 보조

회원 인증 / 결제 / 중요 안내:
웹푸시 단독 사용 비추천
```

---

## 앱 전환 단계

```txt
Expo Web/PWA로 초기 검증
→ Expo EAS Build로 iOS/Android 앱 포팅
→ 네이티브 앱푸시를 메인 알림으로 전환
→ PWA 웹푸시는 보조 채널 유지
```

Expo 네이티브 앱에서는 `expo-notifications`를 통해 iOS/Android 푸시 알림을 구성할 수 있습니다. Expo 문서에서도 Expo Push Service가 FCM/APNs 연동 복잡성을 줄여준다고 설명합니다. ([AppleInsider][4])

---

# 9. 비용 관점

## 웹푸시 자체 비용

| 항목                       |                  비용 |
| ------------------------ | ------------------: |
| Web Push API             |                  무료 |
| VAPID 키                  |                  무료 |
| Firebase Cloud Messaging |                  무료 |
| Apple iOS PWA Web Push   |    Apple 개발자 계정 불필요 |
| 서버/DB                    |          사용량에 따라 발생 |
| OneSignal 등 SaaS         | 무료 시작 가능, 규모 커지면 유료 |

웹푸시 자체는 저렴합니다. 문제는 비용보다 **도달률과 UX 제약**입니다.

---

## 앱으로 갈 경우 비용

| 항목                      |            비용 |
| ----------------------- | ------------: |
| Apple Developer Program |        연 99달러 |
| Google Play Developer   |       25달러 1회 |
| EAS Build               |   무료/유료 플랜 선택 |
| 푸시 발송                   | 대부분 무료 또는 저비용 |
| 운영/심사 대응                |  내부 리소스 비용 발생 |

Apple Developer Program은 앱스토어 배포 시 필요하며, 표준 비용은 연 99달러입니다. ([AppleInsider][4])

---

# 10. 최종 결론

대만 기준으로는 **웹푸시 실패율을 한국보다 훨씬 보수적으로 봐야 합니다.**

```txt
대만 iOS 점유율: 약 56.78%
iOS 웹푸시 핵심 병목: 홈 화면 추가
일반적 웹푸시 최종 성공 가능: 약 30~40%
실패/미도달 가능: 약 60~70%
적극 유도 UX 적용 시 성공 가능: 약 50% 내외
```

따라서 대만 서비스라면 최종 전략은 이게 좋습니다.

```txt
초기 MVP:
Expo Web + PWA + 웹푸시

실제 운영:
웹푸시 + 이메일 + LINE 채널 보조

핵심 사용자 확보 후:
Expo iOS/Android 앱 포팅

장기 운영:
네이티브 앱푸시를 메인 알림 채널로 사용
PWA 웹푸시는 보조 채널로 유지
```

**한 줄 판단:**
대만은 iPhone 비중이 높아서 **웹푸시만으로 알림 전략을 설계하면 위험**합니다. PWA는 MVP와 접근성 확보용으로 좋고, 중요한 알림은 **LINE/이메일/앱푸시와 병행**하는 구조가 더 안전합니다.

[1]: https://gs.statcounter.com/os-market-share/mobile/taiwan?utm_source=chatgpt.com "Mobile Operating System Market Share Taiwan"
[2]: https://timesofindia.indiatimes.com/technology/tech-news/apple-releases-ios-26-5-with-encrypted-rcs-messaging-pride-luminance-wallpaper-and-more-supported-iphones-how-to-download/articleshow/131028377.cms?utm_source=chatgpt.com "Apple releases iOS 26.5 with encrypted RCS messaging, Pride Luminance wallpaper and more: Supported iPhones, how to download"
[3]: https://gs.statcounter.com/ios-version-market-share/mobile-tablet/taiwan?utm_source=chatgpt.com "Mobile & Tablet iOS Version Market Share Taiwan"
[4]: https://appleinsider.com/articles/26/02/13/ios-26-adoption-rate-isnt-the-crisis-some-analysts-are-portraying?utm_source=chatgpt.com "iOS 26 adoption rate about the same as iOS 18 in early 2026"
