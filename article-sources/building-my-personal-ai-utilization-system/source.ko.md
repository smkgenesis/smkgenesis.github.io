---
title: "나만의 AI 활용 시스템 구축하기"
date: 2026-03-12
description: "연구, 학습, 소프트웨어 개발에서 AI 도구를 함께 활용하기 위한 실용적인 아키텍처."
toc: true
---

<div class="language-toggle" role="group" aria-label="Language switch"><a class="language-toggle__link" href="/articles/building-my-personal-ai-utilization-system/en.html" lang="en">EN</a><a class="language-toggle__link is-active" href="/articles/building-my-personal-ai-utilization-system/ko.html" lang="ko">KO</a></div>

## 문제의식
::: {.section-lead}
AI 도구는 강력하지만, 각각을 따로 사용하면 워크플로우가 쉽게 흐트러진다.
:::

보통 이런 흐름이 반복된다.

::: {.workflow-pipeline}
<span class="workflow-pipeline__step">ChatGPT에 질문하기</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">Perplexity 열기</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">NotebookLM에 업로드</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">Drive에 복사</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">반복</span>
:::

::: {.symptom-block}
<p class="symptom-block__label">시간이 지나며 무너지는 것들</p>

- 컨텍스트가 파편화된다
- 지식이 여러 도구에 흩어진다
- AI를 오갈 때마다 마찰이 생긴다
- 장기 작업을 유지할 구조가 사라진다
:::

문제는 AI 모델의 성능 자체가 아니다.

::: {.section-conclusion}
진짜 문제는 여러 도구를 함께 쓰기 위한 명확한 아키텍처가 없다는 데 있다.
:::

## 목표
::: {.section-lead}
여러 AI 도구를 각각 따로 쓰는 대신, 서로 협업하는 시스템으로 설계하는 것이 목표다.
:::

이 시스템은 다음 작업을 지원해야 한다.

- 대학 수업 공부
- 연구 자료 관리
- 장문의 문서 작성
- 소프트웨어 프로젝트 개발
- 시간에 따라 축적되는 지식 정리

::: {.section-conclusion}
핵심은 이론적 설계가 아니라 실제로 굴러가는 워크플로우다.
:::

## 핵심 아이디어
::: {.section-lead}
하나의 AI 도구에 모든 역할을 몰아주지 않고, 각 도구에 가장 잘하는 일을 맡긴다.
:::

예시 역할 분담:

| 기능 | 도구 |
|---|---|
| 검색 | Perplexity |
| 저장 | Zotero |
| 분석 | NotebookLM |
| 정리 | Gemini |
| 설계 | Claude |
| 구현 | ChatGPT / Codex |
| 코드 상태 | GitHub |
| 메모리 | Google Drive |
| 제어 | gws CLI |

::: {.section-conclusion}
각 도구를 가장 잘하는 곳에 배치하면, 흩어진 AI 제품 묶음이 아니라 구조화된 작업 환경이 된다.
:::

## 철학
::: {.section-lead}
이 시스템은 세 가지 기본 원칙을 따른다.
:::

<ol class="ordered-list">
  <li>
    <span class="ordered-list__title">AI는 사고를 돕지만, 사고를 대체하지는 않는다</span>
    <span class="ordered-list__body">최종 판단의 중심은 항상 인간에게 남아 있어야 한다.</span>
  </li>
  <li>
    <span class="ordered-list__title">AI는 인지 도구다</span>
    <span class="ordered-list__body">AI는 연구, 코딩, 학습 과정 전체를 확장하는 도구로 사용되어야 한다.</span>
  </li>
  <li>
    <span class="ordered-list__title">완벽한 시스템보다 굴러가는 시스템이 낫다</span>
    <span class="ordered-list__body">한 번도 쓰이지 않는 완벽한 설계보다, 꾸준히 작동하는 단순한 시스템이 더 낫다.</span>
  </li>
</ol>

::: {.section-conclusion}
판단은 인간이 맡고, 각 도구에는 역할을 부여하며, 실제로 계속 쓸 수 있는 시스템을 우선한다.
:::

## 아키텍처 개요
::: {.section-lead}
Google Drive는 이 시스템의 공용 지식 계층이자 메모리 계층으로 동작한다.
:::

이 계층을 다루는 주된 인터페이스는 Gemini CLI이며, gws를 통해 Google Drive와 상호작용한다.

전체 아키텍처는 다음과 같은 단순한 패턴을 따른다.

::: {.workflow-pipeline}
<span class="workflow-pipeline__step">입력</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">Gemini CLI</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">Google Drive</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">AI 도구</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">출력</span>
:::

GitHub는 병렬적으로 코드 상태를 관리하는 계층으로 분리된다.

::: {.section-conclusion}
원자료가 시스템으로 들어오고, Gemini가 정리하며, AI 도구가 그 상태를 소비하고, 결과물은 다시 같은 공유 계층으로 돌아간다.
:::

## 아키텍처 다이어그램
```{mermaid fig-cap="원자료가 공용 메모리와 전문화된 AI 도구를 거쳐 결과물로 이어지는 시스템 흐름."}
%%{init: {'theme': 'base', 'themeVariables': { 'darkMode': true, 'fontSize': '18px', 'fontFamily': 'IBM Plex Sans, sans-serif' }}}%%
flowchart TD
    classDef default fill:#1E293B,stroke:#475569,stroke-width:1px,color:#F8FAFC,rx:8px,ry:8px,font-size:16px;
    classDef coreBox fill:#0F172A,stroke:#94A3B8,stroke-width:2px,color:#FFFFFF,font-weight:bold,font-size:18px;
    classDef endPoint fill:none,stroke:none,color:#94A3B8,font-size:18px,font-weight:bold;

    INPUTS["<b>입력</b><br/><br/>LearnUS 파일 &nbsp;|&nbsp; 연구 논문 &nbsp;|&nbsp; 노트 &nbsp;|&nbsp; 매뉴얼<br/>수업 PDF &nbsp;|&nbsp; 프로젝트 문서 &nbsp;|&nbsp; 초안 &nbsp;|&nbsp; 결과물"]

    CLI["<b>Gemini CLI + gws 연동</b><br/><br/>- 파일 분류<br/>- 이름 변경<br/>- 폴더 라우팅<br/>- 컨텍스트 업데이트<br/>- 일정 추출"]:::coreBox

    DRIVE["<b>Google Drive</b><br/>(공유 메모리 계층)<br/><br/>University/<br/>Projects/<br/>Librarian/<br/>librarian_memory/"]:::coreBox

    INPUTS --> CLI
    CLI --> DRIVE

    subgraph K_Tools ["지식 도구"]
        direction TB
        N["NotebookLM"]
        P["Perplexity"]
        Z["Zotero - 수동 관리"]
    end

    subgraph E_Tools ["실행 도구"]
        direction TB
        C["Claude"]
        GPT["ChatGPT / Codex"]
        CC["Claude Code"]
    end

    DRIVE --> K_Tools
    DRIVE --> E_Tools

    RA["연구 및 분석"]:::endPoint
    DI["설계 및 구현"]:::endPoint

    K_Tools --> RA
    E_Tools --> DI

    style K_Tools fill:#1E293B,stroke:#475569,stroke-width:1px,stroke-dasharray: 5 5,color:#CBD5E1,rx:8px,ry:8px
    style E_Tools fill:#1E293B,stroke:#475569,stroke-width:1px,stroke-dasharray: 5 5,color:#CBD5E1,rx:8px,ry:8px
```

## 핵심 구조 원칙
::: {.section-lead}
이 시스템은 상태를 두 종류로 분리한다.
:::

### 지식 상태
Google Drive에 저장된다.

포함되는 것:

- 수업 자료
- 연구 요약
- 문서화 자료
- 프로젝트 노트
- AI 간 공유 컨텍스트

### 코드 상태
GitHub에 저장된다.

포함되는 것:

- 소스 코드
- 버전 히스토리
- 소프트웨어 프로젝트

::: {.section-conclusion}
이 분리는 연구 워크플로우와 개발 워크플로우를 서로 깔끔하게 유지해 준다.
:::

## Google Drive 폴더 아키텍처
::: {.section-lead}
Google Drive는 이 시스템의 공유 메모리 계층으로 동작한다.
:::

모든 AI 도구는 직접 또는 간접적으로 이 계층과 상호작용한다.

구조는 의도적으로 최소화되어 있다.

### 루트 구조
<div class="file-tree" aria-label="AI_OS root structure">
  <ul class="file-tree__root">
    <li class="file-tree__item">
      <div class="file-tree__folder is-open">
        <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">AI_OS</span></button>
        <ul class="file-tree__children">
          <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">University</span></div></li>
          <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">Projects</span></div></li>
          <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">Librarian</span></div></li>
        </ul>
      </div>
    </li>
  </ul>
</div>

각 폴더의 역할:

- University &rarr; 대학 수업 자료
- Projects &rarr; 개인 및 개발 프로젝트
- Librarian &rarr; 전역 AI 시스템 문서

### Librarian
Librarian 폴더는 AI 활용 시스템의 전역 컨텍스트를 담는다.

대표 파일 예시:

<div class="file-tree" aria-label="Librarian folder structure">
  <ul class="file-tree__root">
    <li class="file-tree__item">
      <div class="file-tree__folder is-open">
        <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">Librarian</span></button>
        <ul class="file-tree__children">
          <li class="file-tree__item file-tree__item--file"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--file" aria-hidden="true"></span><span class="file-tree__label">architecture.md</span></div></li>
          <li class="file-tree__item file-tree__item--file"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--file" aria-hidden="true"></span><span class="file-tree__label">routing.md</span></div></li>
          <li class="file-tree__item file-tree__item--file"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--file" aria-hidden="true"></span><span class="file-tree__label">decisions.md</span></div></li>
        </ul>
      </div>
    </li>
  </ul>
</div>

파일 역할:

- architecture.md &rarr; AI 시스템 아키텍처 설명
- routing.md &rarr; 적절한 AI 도구를 고르는 규칙
- decisions.md &rarr; 중요한 시스템 규칙과 설계 결정

이 폴더는 시스템 전체의 전역 참조 계층으로 작동한다.

### 로컬 librarian_memory
Librarian과 달리, 로컬 `librarian_memory` 폴더는 각 수업 또는 프로젝트 내부에 존재한다.

예시:

<div class="file-tree" aria-label="Local librarian memory examples">
  <ul class="file-tree__root">
    <li class="file-tree__item">
      <div class="file-tree__folder is-open">
        <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">University</span></button>
        <ul class="file-tree__children">
          <li class="file-tree__item">
            <div class="file-tree__folder is-open">
              <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">2026_Spring</span></button>
              <ul class="file-tree__children">
                <li class="file-tree__item">
                  <div class="file-tree__folder is-open">
                    <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">CAS2101_Discrete_Mathematics</span></button>
                    <ul class="file-tree__children">
                      <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">librarian_memory</span></div></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </li>
    <li class="file-tree__item">
      <div class="file-tree__folder is-open">
        <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">Projects</span></button>
        <ul class="file-tree__children">
          <li class="file-tree__item">
            <div class="file-tree__folder is-open">
              <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">Personal_Website</span></button>
              <ul class="file-tree__children">
                <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">librarian_memory</span></div></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>

이 폴더들은 로컬 작업 컨텍스트를 저장한다.

대표 내용:

- 현재 작업
- 진행 상태
- 중요한 메모
- AI 간 handoff 정보

메모리 분리:

- 전역 컨텍스트 &rarr; Librarian/
- 로컬 컨텍스트 &rarr; librarian_memory/

## Gemini가 관리하는 메모리
::: {.section-lead}
`Librarian/`와 각 로컬 `librarian_memory/` 폴더는 Gemini가 자동으로 관리하는 것을 권장한다.
:::

Gemini CLI + gws를 통해 Gemini는 다음 작업을 수행할 수 있다.

- 파일 정리
- 작업 컨텍스트 유지
- 문서 요약
- 작업 메모리 갱신
- 세션 간 연속성 보존

::: {.section-conclusion}
이 아키텍처에서 Gemini는 시스템의 사서 역할을 한다.
:::

## University 워크스페이스
::: {.section-lead}
수업 자료는 `University` 디렉터리 아래에 저장된다.
:::

예시 구조:

<div class="file-tree" aria-label="University workspace structure">
  <ul class="file-tree__root">
    <li class="file-tree__item">
      <div class="file-tree__folder is-open">
        <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">University</span></button>
        <ul class="file-tree__children">
          <li class="file-tree__item">
            <div class="file-tree__folder is-open">
              <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">2026_Spring</span></button>
              <ul class="file-tree__children">
                <li class="file-tree__item">
                  <div class="file-tree__folder is-open">
                    <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">CAS2101_Discrete_Mathematics</span></button>
                    <ul class="file-tree__children">
                      <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">lectures</span></div></li>
                      <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">assignments</span></div></li>
                      <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">announcements</span></div></li>
                      <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">outputs</span></div></li>
                      <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">librarian_memory</span></div></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>

폴더 역할:

- lectures &rarr; 강의 슬라이드와 수업 자료
- assignments &rarr; 과제와 문제지
- announcements &rarr; 행정 공지
- outputs &rarr; 완료한 결과물
- librarian_memory &rarr; 로컬 AI 컨텍스트

::: {.section-conclusion}
각 과목은 하나의 독립된 작업 공간이 된다.
:::

## Project 워크스페이스
::: {.section-lead}
프로젝트는 `Projects` 디렉터리 아래에 저장된다.
:::

예시:

<div class="file-tree" aria-label="Project workspace examples">
  <ul class="file-tree__root">
    <li class="file-tree__item">
      <div class="file-tree__folder is-open">
        <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">Projects</span></button>
        <ul class="file-tree__children">
          <li class="file-tree__item">
            <div class="file-tree__folder is-open">
              <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">Personal_Website</span></button>
              <ul class="file-tree__children">
                <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">librarian_memory</span></div></li>
              </ul>
            </div>
          </li>
          <li class="file-tree__item">
            <div class="file-tree__folder is-open">
              <button class="file-tree__row file-tree__toggle" type="button" aria-expanded="true"><span class="file-tree__chevron" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">AI_Research_OS</span></button>
              <ul class="file-tree__children">
                <li class="file-tree__item file-tree__item--folder"><div class="file-tree__row"><span class="file-tree__chevron-spacer" aria-hidden="true"></span><span class="file-tree__icon file-tree__icon--folder" aria-hidden="true"></span><span class="file-tree__label">librarian_memory</span></div></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>

프로젝트 구조는 의도적으로 유연하게 둔다.

::: {.section-conclusion}
그럼에도 모든 프로젝트에는 `librarian_memory/`가 있어야 로컬 AI 컨텍스트를 유지할 수 있다.
:::

## 예시 워크플로우
::: {.section-lead}
이 아키텍처는 실제 시나리오에 적용했을 때 더 분명해진다.
:::

### 시나리오 1 - 수업 자료 자동 정리
LearnUS에서 내려받은 수업 파일은 바로 Gemini CLI에 넘길 수 있다.

Gemini는 자동으로 다음을 수행한다.

- 파일 읽기
- 과목 정보 감지
- 문서 이름 변경
- 올바른 폴더로 배치
- 수업 컨텍스트 갱신

예시 변환:

```{.text .file-tree-block}
00. Course Introduction.pdf
&rarr; CAS2101_L00_Course_Introduction.pdf
```

저장 위치:

```{.text .file-tree-block}
University/
2026_Spring/
CAS2101_Discrete_Mathematics/
lectures/
```

동시에 Gemini는 다음 파일도 갱신한다.

`librarian_memory/current_task.md`

### 시나리오 2 - 프로젝트 문서 관리
소프트웨어 프로젝트의 코드는 GitHub가 관리한다.

코드는 GitHub에 놓인다.

하지만 프로젝트는 다음과 같은 부가 자료를 많이 만들어낸다.

- 문서화 자료
- 설계 노트
- 아키텍처 다이어그램
- 매뉴얼

이 파일들은 다음 위치에 저장된다.

```{.text .file-tree-block}
Projects/
project_name/
```

Gemini는 이런 문서를 정리하고, GitHub는 코드를 관리한다.

### 시나리오 3 - 연구 워크플로우
학술 연구는 다음과 같은 구조적 파이프라인을 따른다.

::: {.workflow-pipeline}
<span class="workflow-pipeline__step">Perplexity</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">Zotero</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">NotebookLM</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">Claude</span>
:::

단계:

1. Perplexity로 논문 찾기
2. 원본 PDF를 Zotero에 저장하기
3. NotebookLM에서 문서 분석하기
4. Claude로 아이디어를 정리하고 추론하기

중요한 구분점:

`Zotero = 논문 원본 아카이브`

Zotero는 사용자가 직접 관리한다.

### 시나리오 4 - AI 도구 간 공유 컨텍스트
대부분의 AI 도구는 세션이 바뀌면 컨텍스트를 잃는다.

이 시스템은 컨텍스트를 Drive에 저장함으로써 그 문제를 해결한다.

예시:

```{.text .file-tree-block}
CAS2101_Discrete_Mathematics/
librarian_memory/
```

다음과 같은 파일들은:

- `current_task.md`
- `handoff.md`
- `brief.md`

여러 AI 도구가 함께 읽을 수 있다.

예:

- Claude
- ChatGPT
- Perplexity

이 도구들이 Drive 워크스페이스에 연결되어 있으면, 이런 파일을 읽고 다시 컨텍스트를 복원할 수 있다.

이렇게 해서 AI 간 지속적인 공용 메모리가 생긴다.

### 시나리오 5 - 일정 자동 추출
수업 문서에는 중요한 날짜가 자주 들어 있다.

예:

- 과제 마감일
- 시험 날짜
- 발표 일정

Gemini CLI는 다음과 같은 흐름으로 동작할 수 있다.

::: {.workflow-pipeline}
<span class="workflow-pipeline__step">문서 읽기</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">날짜 추출</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">Google Calendar 업데이트</span>
:::

예시:

- Midterm: April 21
- Final: June 16

Gemini는 자동으로 다음과 같은 캘린더 이벤트를 만들 수 있다.

- CAS2101 Midterm
- CAS2101 Final Exam

동시에 로컬 컨텍스트도 갱신한다.

이 연결은 다음처럼 요약된다.

::: {.workflow-pipeline}
<span class="workflow-pipeline__step">문서</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">메모리</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">캘린더</span>
:::

## 환경 구성
::: {.section-lead}
이 시스템은 여러 도구가 함께 작동하는 환경을 전제로 한다.
:::

세부 설치 방법은 의도적으로 생략한다.

필요하다면 공식 문서를 참고하거나, 설치 과정에서 AI assistant의 도움을 받으면 된다.

### 1단계 - 계정 계층
시스템에서 사용하는 서비스의 계정을 만든다.

필수 서비스:

- Google
- GitHub
- OpenAI
- Anthropic
- Perplexity

강하게 권장하는 방식:

하나의 Google 계정을 기본 정체성 계층으로 삼는다.

많은 서비스가 Google OAuth 로그인을 지원하므로 인증 구성이 단순해진다.

장점:

- 자격 증명 수 감소
- 설치 속도 향상
- 서비스 간 연동 단순화

### 2단계 - 개발 환경
기본 개발 도구를 설치한다.

- Git
- VS Code
- Node.js 또는 Python
- 터미널 환경

### 3단계 - Gemini CLI와 Google Drive 연동
핵심 구성 요소:

- Google Cloud project
- gcloud CLI
- gws CLI
- Gemini CLI
- Google Drive for desktop

권장 설치 순서:

1. Google Drive for desktop 설치
2. gcloud CLI 설치
3. Google Cloud project 생성
4. gws CLI 설치 및 인증
5. Gemini CLI 설치

결과:

::: {.workflow-pipeline}
<span class="workflow-pipeline__step">Gemini CLI</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">gws</span>
<span class="workflow-pipeline__arrow" aria-hidden="true">&rarr;</span>
<span class="workflow-pipeline__step">Google Drive</span>
:::

이렇게 해서 AI가 관리하는 공유 메모리 계층이 만들어진다.

### 4단계 - AI 도구
도구는 여러 인터페이스를 통해 접근할 수 있다.

웹 도구

- Perplexity
- NotebookLM

CLI 도구

- Gemini CLI
- Codex CLI
- Claude Code

앱 / 웹 도구

- ChatGPT
- Claude

어떤 인터페이스를 주로 쓸지는 워크플로우 선호에 따라 달라진다.

### 5단계 - 선택적 인프라
선택 사항이지만 유용한 도구:

- Zotero
- Docker
- GoodNotes

대표 용도:

- Zotero &rarr; 논문 아카이브
- Docker &rarr; 재현 가능한 실행 환경
- GoodNotes &rarr; 손필기 노트

## 구성 철학
::: {.section-lead}
이 시스템은 모든 도구를 강하게 결합하지 않는다.
:::

대신 다음과 같은 공유 자원을 매개로 느슨하게 연결한다.

- Google Drive
- GitHub
- 로컬 파일

::: {.section-conclusion}
그래서 아키텍처를 유연하게 수정할 수 있고, 필요한 부분만 쉽게 바꿀 수 있다.
:::

## 결론
::: {.section-lead}
AI 도구는 강력하지만, 각각을 따로 쓰면 워크플로우가 파편화되고 컨텍스트를 잃기 쉽다.
:::

이 아키텍처는 AI 도구를 구조화된 시스템 안의 전문화된 구성 요소로 다룬다.

각 도구에 명확한 역할을 주고, Google Drive를 공유 메모리 계층으로 사용하면 다음이 가능해진다.

- 정리된 지식
- 지속적인 AI 컨텍스트
- 도구 간 협업 워크플로우

::: {.section-conclusion}
결과적으로 이것은 학습, 연구, 소프트웨어 개발을 위한 실용적인 작업 환경이 된다.
:::

## 저장소
이 아키텍처의 참고 구현은 GitHub에서 확인할 수 있다.

::: {.repository-card}
[ai-utilization-system](https://github.com/smkgenesis/ai-utilization-system)

이 저장소에는 환경 설정 가이드, 폴더 구조 예시, 그리고 AI 활용 아키텍처 문서가 포함되어 있다.
:::

::: {.section-conclusion}
흩어진 AI 도구 집합을 구조화된 작업 시스템으로 바꾸는 것이 이 프로젝트의 목표다.
:::