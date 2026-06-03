---
description: Đóng việc hiện tại (đánh dấu done + sinh SUMMARY.md)
---

Người dùng muốn kết thúc epic đang mở.

Thực hiện:

1. Đóng epic bằng CLI:
   ```bash
   npx sdlc-workflow finish --module <module>
   # nếu chỉ có 1 epic active toàn project: npx sdlc-workflow finish
   ```
   (Trong repo sdlc-lean: `node bin/cli.js finish ...`.) Nếu nhiều module đang active, CLI sẽ liệt kê và yêu cầu `--module` — chọn đúng module của epic vừa làm.
2. Mở `SUMMARY.md` vừa sinh trong epic folder (`work/<module>/<id>/` hoặc `work/<id>/`) và **điền bằng chứng thật** của epic:
   - Modified files (danh sách file đã sửa)
   - Test status (PASS/FAIL + lệnh đã chạy)
   - Build / validation status
   - Skipped checks (nếu có, nêu lý do — không giấu)
   - Remaining risks + Rollback
3. Đối chiếu `docs/definition-of-done.md`: nếu còn tiêu chí chưa đạt, báo rõ cho người dùng.

Sau khi `/finish`, con trỏ active của module đó (`work/<module>/.active` hoặc `work/.active`) bị xóa. Việc mới → người dùng gõ lại `/sdlc-lean <yêu cầu>`.
