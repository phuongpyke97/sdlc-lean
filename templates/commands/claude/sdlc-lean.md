---
description: Bắt đầu một việc mới theo Lean SDLC (tạo epic + chạy vòng 6 bước)
argument-hint: Tôi muốn <mục tiêu> | Input <dữ liệu> | Output <kết quả>
---

Người dùng muốn bắt đầu một việc mới: **$ARGUMENTS**

Thực hiện:

0. **Xác định module** (nếu có). Nếu yêu cầu nhắc tới một module/folder cụ thể (vd "tại module elcom.vms.ups", "module billing"), tách tên module đó ra. Nếu không có module rõ ràng, bỏ qua `--module`.
1. Tạo epic mới bằng CLI:
   ```bash
   npx sdlc-workflow new --module <module> "<phần yêu cầu còn lại>"
   # không có module: npx sdlc-workflow new "$ARGUMENTS"
   ```
   (Nếu chạy trong chính repo sdlc-lean: `node bin/cli.js new ...`.)
2. Đọc con trỏ active để biết epic đang mở: `work/<module>/.active` (có module) hoặc `work/.active` (không module). Mở `epic-brief.md` trong epic đó (`work/<module>/<id>/` hoặc `work/<id>/`).
3. Điền `epic-brief.md` 3 trường: **Tôi muốn / Dữ liệu đầu vào / Kết quả mong muốn** từ yêu cầu người dùng. Hỏi 1-3 câu nếu thiếu.
4. Chạy **vòng 6 bước** Lean (xem `docs/workflow.md`), ghi kết quả vào đúng các file trong epic folder (`work/<module>/<id>/` hoặc `work/<id>/`):
   - Search → `impact-analysis.md` (Graphify/search results, Files to change)
   - **Bước 4 Approval gate: DỪNG, chờ người dùng duyệt trước khi sửa code.**
   - Code+test+build → `build-evidence.md`, `test-evidence.md`
   - Review → `review-evidence.md`; rollback → `rollback-plan.md`

Từ giờ trong cùng epic này, người dùng **không cần gõ lại** `/sdlc-lean`. Khi xong, người dùng gõ `/finish` (nếu nhiều module đang mở, nhắc kèm module: `/finish` → CLI `finish --module <module>`).
