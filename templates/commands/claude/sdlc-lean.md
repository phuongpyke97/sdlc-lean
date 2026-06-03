---
description: Bắt đầu một việc mới theo Lean SDLC (tạo epic + chạy vòng 6 bước)
argument-hint: Tôi muốn <mục tiêu> | Input <dữ liệu> | Output <kết quả>
---

Người dùng muốn bắt đầu một việc mới: **$ARGUMENTS**

Thực hiện:

1. Tạo epic mới bằng CLI:
   ```bash
   npx sdlc-workflow new "$ARGUMENTS"
   ```
   (Nếu chạy trong chính repo sdlc-lean: `node bin/cli.js new "$ARGUMENTS"`.)
2. Đọc `work/.active` để biết epic đang mở, mở `work/<id>/epic-brief.md`.
3. Điền `epic-brief.md` 3 trường: **Tôi muốn / Dữ liệu đầu vào / Kết quả mong muốn** từ yêu cầu người dùng. Hỏi 1-3 câu nếu thiếu.
4. Chạy **vòng 6 bước** Lean (xem `docs/workflow.md`), ghi kết quả vào đúng các file trong `work/<id>/`:
   - Search → `impact-analysis.md` (Graphify/search results, Files to change)
   - **Bước 4 Approval gate: DỪNG, chờ người dùng duyệt trước khi sửa code.**
   - Code+test+build → `build-evidence.md`, `test-evidence.md`
   - Review → `review-evidence.md`; rollback → `rollback-plan.md`

Từ giờ trong cùng epic này, người dùng **không cần gõ lại** `/sdlc-lean`. Khi xong, người dùng gõ `/finish`.
