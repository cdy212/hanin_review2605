"""Create an offline HTML reader, machine-readable cases, and verify local evidence links."""
import base64
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FILES = ["운영자_매뉴얼.md", "QA_CASES.md", "BROWSER_QA_REPORT.md", "FINDINGS.md",
         "AI_QA_WORKFLOW.md", "E2E_RETEST_GUIDE.md", "SOURCE_MAP.md", "00_progress.md"]


def local_path(value):
    # Windows markdown /C:/ and C:/ refer to the same local file in this package.
    value = value.strip("<>")
    value = value.lstrip("/") if re.match(r"^/[A-Za-z]:/", value) else value
    value = re.sub(r":\d+$", "", value)
    return Path(value)


def inline(text):
    code_parts = []
    def code(match):
        code_parts.append("<code>" + html.escape(match[1]) + "</code>")
        return f"\x00{len(code_parts)-1}\x00"
    text = re.sub(r"`([^`]+)`", code, text)
    text = html.escape(text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    def link(match):
        label, target = match[1], html.unescape(match[2]).strip("<>")
        if re.match(r"^/?[A-Za-z]:/", target):
            target = local_path(target).as_uri()
        return '<a href="' + html.escape(target, quote=True) + '">' + label + '</a>'
    text = re.sub(r"\[([^\]]+)\]\((&lt;.*?&gt;|[^)]+)\)", link, text)
    for i, fragment in enumerate(code_parts):
        text = text.replace(f"\x00{i}\x00", fragment)
    return text


def render(markdown):
    lines = markdown.splitlines()
    output, index = [], 0
    while index < len(lines):
        line = lines[index]
        if not line.strip():
            index += 1
            continue
        if line.startswith("```"):
            code, index = [], index + 1
            while index < len(lines) and not lines[index].startswith("```"):
                code.append(lines[index]); index += 1
            output.append("<pre><code>" + html.escape("\n".join(code)) + "</code></pre>")
        elif line.startswith("|"):
            rows = []
            while index < len(lines) and lines[index].startswith("|"):
                cells = [cell.strip() for cell in lines[index].strip().strip("|").split("|")]
                if not all(re.fullmatch(r"[:\- ]+", cell) for cell in cells):
                    rows.append(cells)
                index += 1
            body = []
            for n, row in enumerate(rows):
                tag = "th" if n == 0 else "td"
                body.append("<tr>" + "".join(f"<{tag}>{inline(c)}</{tag}>" for c in row) + "</tr>")
            output.append('<div class="table-wrap"><table>' + "".join(body) + "</table></div>")
            continue
        elif match := re.match(r"^!\[([^\]]*)\]\(([^)]+)\)$", line):
            path = local_path(match[2])
            if not path.is_absolute():
                path = ROOT / path
            data = base64.b64encode(path.read_bytes()).decode("ascii")
            mime = "image/jpeg" if path.suffix.lower() in (".jpg", ".jpeg") else "image/png"
            output.append(f'<figure><img src="data:{mime};base64,{data}" alt="{html.escape(match[1])}"><figcaption>{html.escape(match[1])}</figcaption></figure>')
        elif match := re.match(r"^(#{1,6})\s+(.+)$", line):
            level = len(match[1])
            output.append(f"<h{level}>{inline(match[2])}</h{level}>")
        elif re.match(r"^(\d+\. |\- )", line):
            ordered = bool(re.match(r"^\d+\. ", line))
            pattern = r"^\d+\. " if ordered else r"^\- "
            items = []
            while index < len(lines) and re.match(pattern, lines[index]):
                items.append("<li>" + inline(re.sub(pattern, "", lines[index])) + "</li>"); index += 1
            tag = "ol" if ordered else "ul"
            output.append(f"<{tag}>" + "".join(items) + f"</{tag}>")
            continue
        else:
            output.append("<p>" + inline(line) + "</p>")
        index += 1
    return "\n".join(output)


def main():
    broken = []
    for path in ROOT.glob("*.md"):
        text = path.read_text(encoding="utf-8")
        for target in re.findall(r"!?\[[^\]]*\]\((<[^>]+>|[^)]+)\)", text):
            target = target.strip("<>")
            if re.match(r"^/?[A-Za-z]:/", target) and not local_path(target).exists():
                broken.append({"document": path.name, "target": target})
    if broken:
        raise SystemExit(json.dumps(broken, ensure_ascii=False))
    cases = []
    for line in (ROOT / "QA_CASES.md").read_text(encoding="utf-8").splitlines():
        if line.startswith("| TC-"):
            cells = [c.strip() for c in line.strip("|").split("|")]
            cases.append({"id": cells[0], "preconditionAndUrl": cells[1], "steps": cells[2],
                          "expected": cells[3], "status": cells[4].split(",")[0], "actual": cells[4],
                          "analysisLevel": "SOURCE_CONFIRMED", "evidence": [],
                          "executionRecord": "See BROWSER_QA_REPORT.md for public checks; authenticated cycles need a new run"})
    ids = [c["id"] for c in cases]
    if len(ids) != len(set(ids)):
        raise SystemExit("Duplicate case IDs")
    public_evidence = {
        "TC-AUTH-01": ["01-user-login.jpg"],
        "TC-AUTH-02": ["02-user-register.jpg"],
        "TC-AUTH-03": ["04-membership-auth-guard.jpg", "05-main-auth-guard.jpg"],
    }
    for case in cases:
        case["evidence"] = ["screenshots/" + name for name in public_evidence.get(case["id"], [])]
        if case["status"] == "BLOCKED":
            case["actual"] = "미실행: 테스트 대상·역할별 계정 미확정, 백엔드 7777 미기동"
    (ROOT / "qa_cases.json").write_text(json.dumps({"date": "2026-10-06", "cases": cases}, ensure_ascii=False, indent=2), encoding="utf-8")
    sections = []
    nav = []
    for number, name in enumerate(FILES):
        title = name.removesuffix(".md")
        nav.append(f'<a href="#doc-{number}">{html.escape(title)}</a>')
        sections.append(f'<section id="doc-{number}">{render((ROOT / name).read_text(encoding="utf-8"))}</section>')
    css = '''
body{margin:0;background:#f4f6fa;color:#1b2a40;font:15px/1.75 "Segoe UI","Malgun Gothic",sans-serif}
header{background:#17375c;color:white;padding:36px max(24px,calc((100vw - 1220px)/2))}
header h1{margin:0;font-size:30px}header p{color:#dce7f6;margin:8px 0}
.status{display:inline-block;padding:5px 12px;background:#fff0d0;color:#634a0b;border-radius:6px}
nav{padding:16px 24px;position:sticky;top:0;background:white;border-bottom:1px solid #d9e1ec;z-index:2;display:flex;gap:12px;flex-wrap:wrap}
nav a{font-size:13px;color:#24588d;text-decoration:none}main{max-width:1220px;margin:auto;padding:24px}
section{background:white;padding:30px;margin-bottom:24px;border:1px solid #e0e7ef;border-radius:12px;scroll-margin-top:120px}
h1{font-size:25px}h2{font-size:21px;border-bottom:1px solid #e5eaf1;padding-bottom:8px;margin-top:30px}h3{font-size:17px}
a{color:#235b98}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;font-size:13px;margin:16px 0}
th,td{border:1px solid #dce4ef;padding:9px 12px;text-align:left;vertical-align:top}th{background:#edf3fa}tr:nth-child(even){background:#fafcff}
code{background:#eef2f7;padding:2px 4px;border-radius:3px;font-size:12px}pre{background:#12263e;color:#e8f0fc;padding:16px;overflow:auto;border-radius:8px}pre code{background:transparent}
figure{margin:20px 0;padding:12px;background:#f6f8fc;border-radius:8px}img{max-width:100%;height:auto;display:block;margin:auto}figcaption{font-size:13px;color:#536780;margin-top:8px}
@media print{nav{position:static}body{background:white}section{border:0;padding:0;page-break-before:always}header{background:white;color:black}header p{color:#333}table{font-size:10px}figure{break-inside:avoid}}
'''
    page = '<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>한인회 최종 QA · 운영 매뉴얼</title><style>' + css + '</style><header><h1>한인회 최종 QA · 운영 매뉴얼</h1><p>2026-10-04 · 실제 소스 근거 / 운영 절차 / AI 재개 워크플로우</p><span class="status">공개화면 6건 확인 · 인증 후 업무 사이클은 테스트 환경 대기</span></header><nav>' + ''.join(nav) + '</nav><main>' + ''.join(sections) + '</main></html>'
    page = page.replace("2026-10-04 · 실제 소스 근거", "2026-10-06 가입 검증 보완 · 실제 소스 근거")
    (ROOT / "한인회_최종QA_문서.html").write_text(page, encoding="utf-8")
    report = {"cases": len(cases), "uniqueCaseIds": True, "sourceAnchors": len(json.loads((ROOT / "source_inventory.json").read_text(encoding="utf-8"))["evidence"]),
              "screenshots": len(list((ROOT / "screenshots").glob("*.jpg"))), "brokenAbsoluteLinks": broken,
              "htmlBytes": len(page.encode("utf-8")), "htmlScreenshotEmbedding": True,
              "scope": "Document consistency only; authenticated E2E not executed"}
    (ROOT / "document_validation.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    main()
