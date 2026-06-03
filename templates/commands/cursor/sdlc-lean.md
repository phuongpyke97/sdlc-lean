# /sdlc-lean — Bắt đầu một việc mới (Lean SDLC)

Cú pháp người dùng nên gõ:

```
/sdlc-lean Tôi muốn <mục tiêu> | Dữ liệu đầu vào <input> | Kết quả mong muốn <output>
```

Khi nhận lệnh này, hãy:

1. Tạo epic mới: chạy `npx sdlc-workflow new "<toàn bộ yêu cầu người dùng>"`
   (trong repo sdlc-lean dùng `node bin/cli.js new "..."`).
2. Đọc `work/.active`, mở `work/<id>/epic-brief.md`, điền 3 trường **Tôi muốn / Dữ liệu đầu vào / Kết quả mong muốn**. Hỏi 1-3 câu nếu thiếu.
3. Chạy **vòng 6 bước** trong `docs/workflow.md`, ghi bằng chứng vào các file trong `work/<id>/`.
   **Bước 4 (Approval gate): DỪNG, chờ người dùng duyệt trước khi sửa code.**

Trong cùng epic, người dùng không cần gõ lại `/sdlc-lean`. Khi xong, gõ `/finish`.
