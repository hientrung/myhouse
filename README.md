# MyHouse Project Dashboard

Đây là một trang web tĩnh đơn giản được xây dựng để theo dõi và quản lý dự án xây dựng nhà cá nhân. Trang tổng quan này cung cấp một cái nhìn toàn diện về các khía cạnh khác nhau của dự án, từ ngân sách, tiến độ đến các chi tiết thiết kế.

## ✨ Tính năng

Trang web được tổ chức thành nhiều tab, mỗi tab tập trung vào một phần cụ thể của dự án:

*   **Tổng Quan**: Hiển thị thông số kỹ thuật chính của dự án, bao gồm kích thước, địa điểm, phong cách, và bố trí công năng chi tiết cho từng tầng.
*   **Dự Toán Tổng**: Trình bày phân bổ ngân sách tổng thể dưới dạng biểu đồ tròn (doughnut chart) và bảng chi tiết, giúp dễ dàng hình dung các khoản chi lớn.
*   **Dự Toán Vật tư Chi tiết**: Một bảng tính chi tiết các loại vật tư, chi phí, số lượng. Người dùng có thể lọc theo hạng mục và sắp xếp theo các cột khác nhau (tên, giá, tổng tiền, v.v.).
*   **Tiến Độ & Nghiệm Thu**: Một lộ trình thi công trực quan theo dạng timeline, chia thành các giai đoạn chính. Mỗi giai đoạn bao gồm các công việc của nhà thầu và các hạng mục chủ nhà cần nghiệm thu.
*   **Hướng Dẫn Giám Sát**: Cung cấp các danh sách kiểm tra (checklist) cho việc giám sát chất lượng vật tư và chất lượng thi công hoàn thiện.
*   **Thiết Kế & Vật Tư**: Trưng bày các lựa chọn thiết kế và vật liệu chính, kèm theo lý do lựa chọn để định hình phong cách cho ngôi nhà.

## 🚀 Công nghệ sử dụng

*   **HTML5**: Cấu trúc cơ bản của trang web.
*   **Bootstrap 5**: Framework CSS để tạo giao diện người dùng hiện đại và đáp ứng nhanh chóng.
*   **JavaScript (ES6)**: Xử lý toàn bộ logic của ứng dụng, bao gồm quản lý trạng thái, render nội dung động, và tương tác người dùng.
*   **Chart.js**: Thư viện để vẽ biểu đồ phân bổ ngân sách.

## 📂 Cấu trúc dự án

```
/
├── index.html      # Tệp HTML chính
├── data.js         # Chứa toàn bộ dữ liệu của dự án
├── script.js       # Toàn bộ mã JavaScript của ứng dụng
└── README.md       # Tệp tài liệu này
```

## 🛠️ Cách sử dụng

Chỉ cần mở tệp `index.html` trong trình duyệt web của bạn để xem và tương tác với trang tổng quan. Không cần cài đặt hay máy chủ.
