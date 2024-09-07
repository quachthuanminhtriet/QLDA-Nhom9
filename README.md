
# QLDA Demo



## Tính năng đang phát triển

- Thêm chi tiết thông tin sản phẩm
- Sử dụng ReactJS + Ant Desgin
- Fix Bug Chart (chưa xong)

## Tài khoản đang nhập
- User : admin
- Password : 12345678

## Sử dụng

**Client:** React 18

**Server:** Django


## API Reference

#### Dữ liệu catalogs

```http
  /catalogs
```

#### Dữ liệu products

```http
  /products
```

#### Dữ liệu orders

```http
  /orders
```

#### Dữ liệu bảng

```http
  /charts
```
#### Dữ liệu details sản phẩm

```http
  /details
```

#### Dữ liệu đăng nhập đăng ký

```http
  /login
```
```http
  /signup
```

#### Dữ liệu profile
```http
  /profile
```

| Tính năng/Thành phần | Mô tả |
|----------------------|-------|
| Thông tin sản phẩm | Hiển thị thông số kỹ thuật chi tiết của sản phẩm |
| - Xem giới hạn | Hiển thị thông tin cơ bản (3 mục đầu tiên của thông số màn hình) |
| - Xem mở rộng | Nút "Xem thêm" hiển thị đầy đủ thông số kỹ thuật trong modal |
| - Thông tin phân loại | Tổ chức thông số theo danh mục (ví dụ: Màn hình, Camera, Bộ xử lý) |
| - Bố cục linh hoạt | Sử dụng Row và Col của Ant Design để có bố cục gọn gàng, linh hoạt |
| Đánh giá người dùng | Hiển thị đánh giá và xếp hạng của người dùng |
| - Đánh giá trung bình | Hiển thị xếp hạng tổng thể của sản phẩm |
| - Danh sách đánh giá | Hiển thị danh sách đánh giá của người dùng với số sao |
| - Phân trang | Thực hiện phân trang cho đánh giá (6 đánh giá mỗi trang) |
| - Lọc theo đánh giá | Cho phép lọc đánh giá theo số sao |
| Thẻ lợi ích | Nổi bật các lợi ích hoặc tính năng chính của sản phẩm |
| Tạo kiểu | Sử dụng Emotion cho CSS-in-JS styling |
| Tối ưu hóa hiệu suất | Sử dụng useMemo và useCallback để cải thiện hiệu suất render |
| Thiết kế linh hoạt | Đảm bảo hiển thị phù hợp trên các kích thước màn hình khác nhau |
| Đa ngôn ngữ | Hỗ trợ nhiều ngôn ngữ (đã triển khai tiếng Việt) |
| Xác thực | Triển khai hệ thống xác thực với JWT |
| Phân quyền | Triển khai kiểm soát truy cập dựa trên vai trò |
| Tích hợp API | Tích hợp với backend Django để truy xuất và thao tác dữ liệu |
| Quản lý trạng thái | Sử dụng React Context để quản lý trạng thái |
| Xử lý lỗi | Triển khai xử lý lỗi cho các yêu cầu API |
| Trạng thái tải | Triển khai trạng thái tải cho các yêu cầu API |
| Phân trang | Triển khai phân trang cho danh sách sản phẩm |