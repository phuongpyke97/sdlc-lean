---
description: Bắt đầu một việc mới theo Lean SDLC (tạo epic + chạy vòng 6 bước)
argument-hint: Tôi muốn <mục tiêu> | Input <dữ liệu> | Output <kết quả>
---

Người dùng muốn bắt đầu một việc mới: **$ARGUMENTS**

Thực hiện:

1. Tạo epic mới:
   ```bash
   node bin/cli.js new "$ARGUMENTS"
   ```
2. Đọc `work/.active` để biết epic đang mở, mở `work/<id>/epic-brief.md`.
3. Điền `epic-brief.md` 3 trường: **Tôi muốn / Dữ liệu đầu vào / Kết quả mong muốn**. Hỏi 1-3 câu nếu thiếu.
4. Chạy **vòng 6 bước** Lean (`docs/workflow.md`), ghi kết quả vào các file trong `work/<id>/`:
   - Search → `impact-analysis.md`
   - **Bước 4 Approval gate: DỪNG, chờ người dùng duyệt trước khi sửa code.**
   - Code+test+build → `build-evidence.md`, `test-evidence.md`; review → `review-evidence.md`; rollback → `rollback-plan.md`

Trong cùng epic này, người dùng **không cần gõ lại** `/sdlc-lean`. Khi xong, gõ `/finish`.
