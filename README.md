# Mo Flow Studio

Ứng dụng tạo kịch bản video review sản phẩm và prompt Google Flow bằng mẫu cục bộ. React 19, TypeScript, Vite và Tailwind CSS 4. Không gọi API AI, không cần API key, không có backend.

## Chạy và xem trước

Yêu cầu Node.js 22 trở lên và npm.

```bash
cd /workspace/mo-flow-studio
npm ci
npm run dev -- --port 5173
```

Mở `http://localhost:5173` khi chạy trên máy của bạn. Nếu dùng workspace từ xa, chuyển tiếp cổng 5173 bằng công cụ Ports của IDE rồi mở địa chỉ được IDE cung cấp. Môi trường onboarding không cung cấp liên kết preview công khai.

```bash
npm test
npm run build
npm run preview -- --port 4173
```

Build xuất vào `dist/`, có thể triển khai lên hosting tĩnh. Preview bản build trên cổng 4173.

## Quy trình

1. Nhập tên, mô tả sản phẩm; thêm ảnh sản phẩm và nhân vật (JPG/PNG/WebP, tối đa 8 MB/ảnh và 12 ảnh/nhóm).
2. Ghi đặc điểm nhân vật cố định, chọn 3–4 cảnh, giọng nam/nữ/không lời, tỷ lệ 9:16/16:9.
3. Tạo kịch bản. Chỉnh tên, hành động và lời thoại từng cảnh; thêm ảnh đầu và cuối riêng.
4. Xem và copy prompt từng cảnh. Mở Google Flow, tự tải ảnh tham chiếu tương ứng và dán prompt. Copy prompt không chuyển ảnh sang Flow.
5. Dùng cùng nhân vật, sản phẩm, trang phục và ánh sáng giữa các cảnh; có thể dùng khung cuối cảnh trước làm ảnh đầu cảnh tiếp theo.
6. Nhấn **Lưu dự án** để lưu cả ảnh và kịch bản trong IndexedDB. Mở lại từ **Dự án đã lưu**.

Thay đổi không tự lưu. Tạo lại kịch bản sẽ thay thế các cảnh và ảnh đầu/cuối sau khi xác nhận. Dữ liệu gắn với trình duyệt và địa chỉ truy cập hiện tại; xóa dữ liệu trình duyệt sẽ xóa dự án. Không đồng bộ đám mây. Trình duyệt đầy bộ nhớ hoặc chặn IndexedDB sẽ hiển thị thông báo lỗi.

Prompt hướng dẫn khóa danh tính, khuôn mặt và hình dạng sản phẩm nhưng không bảo đảm mô hình sinh video tuân thủ hoàn toàn. Lời thoại có thể cần rút ngắn để phù hợp 8 giây. Google Flow là dịch vụ độc lập, có thể yêu cầu tài khoản, credit hoặc gói dịch vụ; ứng dụng không vượt hạn mức, tự động hóa Flow hay sử dụng API trả phí.

## Cấu trúc

- `src/main.tsx`: khởi động React.
- `src/App.tsx`: giao diện, tải ảnh, chỉnh cảnh và quản lý dự án.
- `src/model.ts`: mẫu kịch bản và prompt nhất quán.
- `src/storage.ts`: lưu trữ IndexedDB.
- `src/model.test.ts`: kiểm tra số cảnh, chế độ không lời và tham chiếu trong prompt.
- `src/App.test.tsx`: kiểm tra tải ảnh, tạo/chỉnh cảnh, copy prompt và lưu/mở lại dự án bằng DOM và IndexedDB mô phỏng.
- `src/style.css`: giao diện responsive, tích hợp Tailwind CSS.
