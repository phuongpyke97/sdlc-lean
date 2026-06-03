---
description: Đóng việc hiện tại (đánh dấu done + sinh SUMMARY.md)
---

Người dùng muốn kết thúc epic đang mở.

Thực hiện:

1. Đóng epic bằng CLI:
   ```bash
   npx sdlc-workflow finish
   ```
   (Trong repo sdlc-lean: `node bin/cli.js finish`.)
2. Mở `work/<id>/SUMMARY.md` vừa sinh và **điền bằng chứng thật** của epic:
   - Modified files (danh sách file đã sửa)
   - Test status (PASS/FAIL + lệnh đã chạy)
   - Build / validation status
   - Skipped checks (nếu có, nêu lý do — không giấu)
   - Remaining risks + Rollback
3. Đối chiếu `docs/definition-of-done.md`: nếu còn tiêu chí chưa đạt, báo rõ cho người dùng.

Sau khi `/finish`, con trỏ `work/.active` bị xóa. Việc mới → người dùng gõ lại `/sdlc-lean <yêu cầu>`.
