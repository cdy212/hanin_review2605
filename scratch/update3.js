const fs = require('fs');
const path = 'c:/Users/dante/Desktop/2026_new_project/대표님/한인회리뷰_260526/260519_review.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Update Section 1 - 구글 지도
content = content.replace(
    /<p class="text-xs text-slate-600 leading-relaxed pl-5 font-medium">구글맵 무료 사용 혹은 제한 사용 방법 체크\s*및 발생할 수 있는 대안 비용 확인이 필요합니다\.<\/p>/g,
    `<div class="text-xs text-slate-600 leading-relaxed pl-5 font-medium space-y-2">
                                <p>구글맵 무료 사용 혹은 제한 사용 방법 체크 및 발생할 수 있는 대안 비용 확인이 필요합니다.</p>
                                <ul class="list-disc pl-4 space-y-1 text-slate-600">
                                    <li>웹에서는 view 당 비용 발생으로 대체 맵 사용</li>
                                    <li>웹앱 모두 업체 정보 및 이미지 등 유료</li>
                                    <li>구글 API 호출 후 저장 시 법적 문제 발생</li>
                                    <li>대안으로 업체 정보 및 사진은 제휴 업체에서 직접 올리는 방향으로 진행
                                        <p class="text-slate-400 mt-0.5 text-[11px] font-normal">ex) 업체 검색 후 기본 업체 정보 등은 자동 입력되게 하고, 수정하여 입력하는 방향</p>
                                    </li>
                                </ul>
                            </div>`
);

// 2. Update Section 2 - 플랫폼 의사결정
content = content.replace(
    /<p class="text-xs text-slate-600 leading-relaxed pl-5 font-medium">오픈 시 Mobile web 출시 후\s*순차적으로 APP 출시를 할지, 혹은 APP부터 동시 출시할 지에 대한 확고한 의사 결정이 필요합니다\.<\/p>/g,
    `<p class="text-xs text-slate-600 leading-relaxed pl-5 font-medium mb-3">오픈 시 Mobile web 출시 후
                                순차적으로 APP 출시를 할지, 혹은 APP부터 동시 출시할 지에 대한 확고한 의사 결정이 필요합니다.</p>
                            <div class="pl-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div class="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm">
                                    <p class="font-bold text-slate-900 text-xs mb-1.5">■ 모바일 웹 진행 시</p>
                                    <p class="text-[11px] text-slate-600 leading-relaxed font-normal">오픈 이후 운영 개선에 대한 실시간 업데이트 및 피드백 처리가 매우 신속하나, 모바일 전용 네이티브 PUSH 발송 등에 기술적인 제한이 따릅니다.</p>
                                </div>
                                <div class="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm">
                                    <p class="font-bold text-slate-900 text-xs mb-1.5">■ 앱 [IOS, 안드로이드] 진행 시</p>
                                    <p class="text-[11px] text-slate-600 leading-relaxed font-normal">네이티브 푸시 적용은 원활하나, 까다로운 IOS 앱스토어 심사 프로세스 및 개발팀 내 테스팅 장비 부재로 인해 배포 QA 일정 지연 및 수정 패치 개선 작업이 크게 더딜 수 있습니다.</p>
                                </div>
                            </div>`
);

// 3. Add Web Push section at the end of Section 4 risks list
const webPushHTML = `
                        <!-- 4. 웹 푸시 알림 도입 검토 -->
                        <div class="border border-sky-100 rounded-lg p-5 bg-sky-50/40">
                            <div class="flex items-center space-x-3 text-sky-800 font-bold text-sm mb-2">
                                <span class="w-2 h-2 bg-sky-500 rounded-full"></span>
                                <span>4. 웹 푸시 알림 도입 검토</span>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed pl-5 font-medium">
                                [웹 푸시] Web Push 알림 도입 검토<br>
                                <span class="text-rose-600 text-[11px] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100 inline-block mt-1 font-bold">※ iOS는 보안 이슈로 웹앱을 수동 설치해야 지원 가능</span>
                            </p>
                        </div>
`;

content = content.replace(
    /마스터 소셜 계정 전달 \[ Line-naver, 카카오톡, 구글 \]이 필수적으로 선행되어야 합니다\.<\/p>\s*<\/div>/g,
    `마스터 소셜 계정 전달 [ Line-naver, 카카오톡, 구글 ]이 필수적으로 선행되어야 합니다.</p>
                        </div>
${webPushHTML}`
);

fs.writeFileSync(path, content, 'utf8');
console.log("File updated successfully.");
