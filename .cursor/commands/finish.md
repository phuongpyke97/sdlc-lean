# /finish — Đóng việc hiện tại

Khi nhận lệnh này, hãy:

1. Chạy `node bin/cli.js finish`.
2. Mở `work/<id>/SUMMARY.md` vừa sinh, điền bằng chứng thật: modified files, test status, build status, skipped checks (kèm lý do), remaining risks, rollback.
3. Đối chiếu `docs/definition-of-done.md`; báo rõ tiêu chí nào chưa đạt.

Sau `/finish`, `work/.active` bị xóa. Việc mới → gõ lại `/sdlc-lean <yêu cầu>`.
