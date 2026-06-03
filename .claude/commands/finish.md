---
description: Đóng việc hiện tại (đánh dấu done + sinh SUMMARY.md)
---

Người dùng muốn kết thúc epic đang mở.

Thực hiện:

1. Đóng epic:
   ```bash
   node bin/cli.js finish
   ```
2. Mở `work/<id>/SUMMARY.md` vừa sinh và **điền bằng chứng thật**: modified files, test status, build/validation status, skipped checks (kèm lý do), remaining risks, rollback.
3. Đối chiếu `docs/definition-of-done.md`: nếu còn tiêu chí chưa đạt, báo rõ.

Sau `/finish`, `work/.active` bị xóa. Việc mới → gõ lại `/sdlc-lean <yêu cầu>`.
