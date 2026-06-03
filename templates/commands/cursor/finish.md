# /finish — Đóng việc hiện tại

Khi nhận lệnh này, hãy:

1. Chạy `npx sdlc-workflow finish --module <module>` (chỉ 1 epic active toàn project thì `npx sdlc-workflow finish`; trong repo sdlc-lean: `node bin/cli.js finish ...`). Nếu nhiều module active, CLI liệt kê và yêu cầu `--module` — chọn đúng module.
2. Mở `SUMMARY.md` vừa sinh trong epic folder (`work/<module>/<id>/` hoặc `work/<id>/`), điền bằng chứng thật: modified files, test status, build status, skipped checks (kèm lý do), remaining risks, rollback.
3. Đối chiếu `docs/definition-of-done.md`; báo rõ tiêu chí nào chưa đạt.

Sau `/finish`, con trỏ active của module đó (`work/<module>/.active` hoặc `work/.active`) bị xóa. Việc mới → gõ lại `/sdlc-lean <yêu cầu>`.
