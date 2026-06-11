# Hướng dẫn cài đặt và sử dụng SDLC Lean

Tài liệu này hướng dẫn từng bước từ lúc clone/pull repo, cài `sdlc-workflow`, init vào project mới, rồi tạo và hoàn tất một task cụ thể.

## 1. SDLC Lean là gì?

SDLC Lean là bộ khung làm việc cho AI-assisted development:
- chia việc thành từng **epic** nhỏ
- mỗi epic có folder riêng trong `work/`
- có bước **Clarify → Search → Impact plan → Approval → Code/Test/Build → Report**
- hỗ trợ nhiều agent: **Claude Code**, **Cursor**, **Antigravity/Codex**
- có hỗ trợ UI qua folder `figma/` trong từng epic

## 2. Yêu cầu trước khi bắt đầu

Bạn cần:
- Node.js >= 18
- Git
- quyền chạy lệnh trong terminal
- 1 project thật để áp dụng workflow

Nếu đang dùng Windows:
- nên dùng PowerShell
- có thể dùng `claude` hoặc mở project bằng Cursor/Antigravity

## 3. Lấy code về từ Git

### Cách 1: clone lần đầu

```powershell
git clone https://github.com/phuongpyke97/sdlc-lean.git
cd sdlc-lean
```

### Cách 2: pull bản mới nhất

Nếu đã có repo rồi:

```powershell
cd D:\AI\sdlc-lean
git pull
```

## 4. Cài `sdlc-workflow` để dùng như lệnh global

Trong repo `sdlc-lean`, chạy:

```powershell
npm link
```

Sau đó kiểm tra:

```powershell
sdlc-workflow version
```

Kỳ vọng thấy version hiện tại, ví dụ `1.6.0`.

## 5. Cấu trúc sau khi cài xong

`npm link` xong, bạn có command:

```powershell
sdlc-workflow
```

Các lệnh chính:
- `sdlc-workflow init`
- `sdlc-workflow new [--module <name>] "<request>"`
- `sdlc-workflow finish [--module <name>]`
- `sdlc-workflow version`

## 6. Init vào project mới

### Bước 1 — vào đúng project

Đi tới folder project thật bạn muốn áp dụng workflow:

```powershell
cd D:\path\to\your-project
```

> Quan trọng: `sdlc-workflow` luôn chạy theo **thư mục hiện tại**. Đứng ở project nào thì init / new / finish sẽ ghi vào project đó.

### Bước 2 — init workflow

Chạy:

```powershell
sdlc-workflow init
```

Lệnh này sẽ tạo vào project hiện tại:
- `docs/`
- `templates/`
- `adr/`
- `.github/`
- `scripts/`
- `.claude/`
- `.cursor/`
- `.agents/`
- `AGENTS.md`
- `README.md` / rule / command template tương ứng

### Bước 3 — kiểm tra nhanh

Bạn có thể kiểm tra:

```powershell
Get-ChildItem
```

Kỳ vọng thấy các folder workflow vừa sinh.

## 7. Mở project bằng AI agent

### Claude Code

- Mở terminal tại đúng project
- gõ:

```powershell
claude
```

- sau đó dùng slash command:

```text
/sdlc-lean <yêu cầu của bạn>
```

### Cursor

- mở đúng folder project trong Cursor
- dùng `/sdlc-lean` hoặc `/finish`

### Antigravity / Codex

- không có slash command
- nói bằng lời, ví dụ:

```text
Chạy sdlc-workflow new --module elcom.vms.ups "them tab ABC vao man hinh XYZ"
```

hoặc nếu bạn muốn tự chạy CLI trong terminal rồi để agent code tiếp:

```powershell
sdlc-workflow new --module elcom.vms.ups "them tab ABC vao man hinh XYZ"
```

## 8. Tạo task / epic mới

### Cách chuẩn

Nếu task thuộc 1 module cụ thể, dùng `--module`:

```powershell
sdlc-workflow new --module elcom.vms.ups "them tab ABC vao man hinh XYZ"
```

Nếu không muốn gắn module:

```powershell
sdlc-workflow new "tao api login"
```

### Kết quả sau khi chạy

- tạo folder epic mới trong `work/`
- tạo `epic-brief.md`
- tạo các file evidence template
- tạo folder `figma/` cho epic đó
- set con trỏ active:
  - `work/<module>/.active` nếu có module
  - `work/.active` nếu không có module

## 9. Cấu trúc folder task

### Có module

Ví dụ:

```text
work/elcom.vms.ups/
├── .active
└── 001-tim-component-a/
    ├── epic-brief.md
    ├── requirement-brief.md
    ├── impact-analysis.md
    ├── agent-impact-plan.md
    ├── build-evidence.md
    ├── test-evidence.md
    ├── review-evidence.md
    ├── rollback-plan.md
    ├── adr.md
    └── figma/
        ├── README.md
        └── .gitkeep
```

### Không có module

Ví dụ:

```text
work/
├── .active
└── 001-legacy-task/
    ├── epic-brief.md
    └── ...
```

## 10. Làm task cụ thể theo từng bước

Ví dụ: bạn muốn thêm 1 tab nhỏ vào màn hình có sẵn.

### Bước 1 — xác định project và module

Bạn đang ở đúng project.
Xác định màn hình đó thuộc module nào, ví dụ:
- `elcom.vms.ups`
- `billing`

### Bước 2 — mở epic mới

```powershell
sdlc-workflow new --module elcom.vms.ups "them tab ABC vao man hinh XYZ"
```

### Bước 3 — xem epic active là gì

Nếu cần kiểm tra:

```powershell
Get-Content work/elcom.vms.ups/.active
```

Sau đó mở folder:

```powershell
work/elcom.vms.ups/001-them-tab-abc/
```

### Bước 4 — điền `epic-brief.md`

Mở file `epic-brief.md` và điền rõ:
- **Tôi muốn**
- **Dữ liệu đầu vào**
- **Kết quả mong muốn**

### Bước 5 — nếu có UI, copy ảnh Figma vào `figma/`

Nếu thiết kế UI:
- export frame từ Figma ra PNG
- copy vào:

```text
work/elcom.vms.ups/001-them-tab-abc/figma/
```

Ví dụ:

```text
work/elcom.vms.ups/001-them-tab-abc/figma/tab-abc.png
```

Nếu chỉ có ảnh, vẫn dùng được. Không cần dev-mode HTML/CSS.

### Bước 6 — yêu cầu agent thiết kế / code

Ví dụ nói với agent:

```text
Thiết kế tab ABC theo ảnh trong figma của task này.
Tab này gắn vào màn hình XYZ đang có sẵn.
```

Agent sẽ:
1. Clarify
2. Search
3. Impact plan
4. Dừng ở Approval Gate
5. Code + test + build sau khi bạn duyệt
6. Report

### Bước 7 — duyệt impact plan

Khi agent đưa impact plan:
- đọc file nào sẽ đổi
- đọc side effects
- xem test/build nào sẽ chạy
- kiểm tra rollback path

Chỉ khi bạn đồng ý mới cho làm tiếp.

### Bước 8 — chạy `finish`

Khi xong:

```powershell
sdlc-workflow finish --module elcom.vms.ups
```

Nếu chỉ có 1 epic active thì có thể dùng:

```powershell
sdlc-workflow finish
```

Sau đó hệ thống sẽ:
- đánh dấu epic done
- sinh `SUMMARY.md`
- xóa con trỏ active của module đó

## 11. Dùng với Antigravity

Antigravity không có slash command.

Cách dùng:
1. `cd` vào đúng project
2. chạy `sdlc-workflow init`
3. mở project bằng Antigravity
4. nói bằng lời, ví dụ:

```text
Chạy sdlc-workflow new --module elcom.vms.ups "them tab ABC vao man hinh XYZ"
```

Khi xong:

```text
Chạy sdlc-workflow finish --module elcom.vms.ups
```

## 12. Dùng với Claude Code và Cursor

### Claude Code

- dùng `/sdlc-lean ...`
- dùng `/finish`

### Cursor

- dùng `/sdlc-lean ...`
- dùng `/finish`

Cả hai agent này đã được `init` sinh sẵn command và rule.

## 13. Khi nào dùng `figma/`

Dùng `figma/` khi task là UI/UX:
- redesign một màn hình
- thêm tab mới
- thêm popup/modal
- chỉnh layout

Bạn chỉ cần để ảnh vào `figma/` rồi nói agent làm theo ảnh đó.

## 14. Các lỗi hay gặp

### `sdlc-workflow: command not found`

Chạy lại trong repo `sdlc-lean`:

```powershell
npm link
```

### `no active epic`

Chưa chạy `new`, hoặc đã `finish` xong rồi.

### `multiple active epics`

Có nhiều module đang mở cùng lúc. Hãy dùng:

```powershell
sdlc-workflow finish --module <module>
```

### Chạy nhầm thư mục

`pwd` / `Get-Location` để kiểm tra đang ở đúng project chưa.

## 15. Tóm tắt luồng ngắn nhất

```powershell
cd D:\path\to\project
sdlc-workflow init
sdlc-workflow new --module elcom.vms.ups "them tab ABC vao man hinh XYZ"
# copy ảnh vào work/elcom.vms.ups/001-.../figma/
# ra lệnh agent thiết kế / code
sdlc-workflow finish --module elcom.vms.ups
```

## 16. Gợi ý vận hành thực tế

- Mỗi project thật nên init 1 lần
- Mỗi module có thể có epic active riêng
- UI task nên luôn có `figma/`
- Nếu không chắc task thuộc module nào, hãy hỏi lại trước khi `new`

## 17. Kết luận

Quy trình chuẩn là:
1. vào đúng project
2. `sdlc-workflow init`
3. mở epic bằng `new`
4. bỏ ảnh Figma vào `figma/` nếu có UI
5. để agent chạy 6 bước
6. duyệt impact plan
7. code/test/build
8. `finish`
