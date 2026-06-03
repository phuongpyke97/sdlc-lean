# /sdlc-lean — Bắt đầu một việc mới (Lean SDLC)

Cú pháp người dùng nên gõ:

```
/sdlc-lean Tôi muốn <mục tiêu> | Dữ liệu đầu vào <input> | Kết quả mong muốn <output>
```

Khi nhận lệnh này, hãy:

0. **Xác định module** nếu yêu cầu nhắc tới module/folder cụ thể (vd "tại module elcom.vms.ups"); nếu không có thì bỏ qua `--module`.
1. Tạo epic mới: chạy `npx sdlc-workflow new --module <module> "<phần yêu cầu còn lại>"`
   (không module: `npx sdlc-workflow new "<yêu cầu>"`; trong repo sdlc-lean dùng `node bin/cli.js new ...`).
2. Đọc con trỏ active `work/<module>/.active` (hoặc `work/.active`), mở `epic-brief.md` trong epic đó, điền 3 trường **Tôi muốn / Dữ liệu đầu vào / Kết quả mong muốn**. Hỏi 1-3 câu nếu thiếu.
3. Chạy **vòng 6 bước** trong `docs/workflow.md`, ghi bằng chứng vào các file trong epic folder (`work/<module>/<id>/` hoặc `work/<id>/`).
   **Bước 4 (Approval gate): DỪNG, chờ người dùng duyệt trước khi sửa code.**

Trong cùng epic, người dùng không cần gõ lại `/sdlc-lean`. Khi xong, gõ `/finish` (kèm `--module <module>` nếu nhiều module đang mở).
