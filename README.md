# Blog Backend — Tài liệu phân tích & hướng triển khai

## 1. Giới thiệu ngắn
- Ứng dụng: Backend API cho Blog đơn giản (Node.js + Express + MSSQL)
- Entry point: `index.js`
- App chính: `src/app.js`

## 2. Xác định vấn đề
- **Đối tượng mục tiêu:** nhóm người muốn dùng blog để chia sẻ, đọc, bình luận bài viết của người khác.
- **Vấn đề cần giải quyết:** không có backend nhẹ, rõ ràng, có xác thực và dễ mở rộng cho demo hoặc tích hợp frontend.
- **Giá trị cốt lõi:** API RESTful đơn giản, bảo mật bằng JWT, kiến trúc module dễ bảo trì.
- **Thước đo thành công:** endpoints cơ bản hoàn chỉnh, dễ chạy bằng Postman, dễ mở rộng.

## 3. Hành trình người dùng (User journeys)

- **Guest**
    - Xem bài: `GET /api/posts/getAll` → `GET /api/posts/:id` → `GET /api/comments/:post_id`.

- **New user**
    - Register: `POST /api/users/register` → Login: `POST /api/users/login` → nhận `token`.

- **Authenticated user (author)**
    - Tạo bài: `POST /api/posts/create`.
    - Chỉnh sửa/xóa bài: `PUT/DELETE /api/posts/:id`.
    - Bình luận: `POST /api/comments/create` → xóa comment: `DELETE /api/comments/:id`.

- **Admin (tùy chọn)**
    - Xóa tất cả bài/bình luận, quản lý người dùng.

## 4. Phân tích yêu cầu 

### 4.1 Yêu cầu chức năng
- Đăng ký, đăng nhập (JWT).
- CRUD cho `posts` (chỉ user đăng nhập có quyền chỉnh sửa/xóa).
- Thêm/xóa bình luận (chỉ user đăng nhập comment có thể xóa).
- Xem tất cả bài viết, xem bình luận từng bài.

### 4.2 Yêu cầu phi chức năng
- Mật khẩu phải được hash (bcrypt).
- Xác thực token trong header `Authorization`.
- Trả response chuẩn, xử lý lỗi rõ ràng.

## 5. Tính năng chi tiết & tiêu chí 

- **Auth (Users)**
    - Chức năng: register/login, trả JWT.
    - Tiêu chí: register trả 201 không bao gồm password; login trả token và user info.

- **Posts**
    - Chức năng: tạo, sửa, xóa, lấy danh sách.
    - Tiêu chí: tạo trả 201 với `id`; cập nhật/xóa chỉ thực hiện nếu `req.user.id === post.user_id`.

- **Comments**
    - Chức năng: thêm, xóa comment.
    - Tiêu chí: thêm trả 201; xóa chỉ cho owner comment.


## 6. API chi tiết (payload & response mẫu)
Base URL: `http://localhost:3000/api`

- `POST /api/users/register` (public)
    - Body: `{ "username":"u","email":"e@gmail.com","password":"p" }`
    - 201: `{ "success":true, "data": { "id":1, "username":"u", "email":"e@e.com" }}`

- `POST /api/users/login` (public)
    - Body: `{ "email":"e@e.com","password":"p" }`
    - 200: `{ "success":true, "data": { "token":"<jwt>", "user":{...} }}`

- `GET /api/posts/getAll` (public)
    - Query: `?page=1&limit=10&search=xxx`
    - 200: `{ "success":true, "data": { "total":100, "items":[...] }}`

- `GET /api/posts/:id` (public)
    - 200: `{ "success":true, "data":{ "id":1, "title":"...", "content":"...", "author":{...} }}`

- `POST /api/posts/create` (auth)
    - Header: `Authorization: Bearer <token>`
    - Body: `{ "title":"...","content":"..." }`
    - 201: `{ "success":true, "data":{ "id":10, "title":"..." }}`

- `PUT /api/posts/:id` (auth + owner)
    - Body: `{ "title":"...","content":"..." }` → 200 updated

- `DELETE /api/posts/:id` (auth + owner)
    - 200: `{ "success":true }`

- `GET /api/comments/:post_id` (public)
    - 200: `{ "success":true, "data":[...] }`

- `POST /api/comments/create` (auth)
    - Body: `{ "post_id":1, "content":"Nice" }` → 201 comment

- `DELETE /api/comments/:id` (auth + owner)


## 7. Yêu cầu & cài đặt
- Node.js.
- SQL Server (Microsoft SQL Server).
- Cài dependencies:  "bcrypt", "cors","dotenv", "express", "jsonwebtoken", "msspl", "nodemon".

## 8. Lộ trình thực thi (Từ API tới code)
Thứ tự đề xuất để triển khai/kiểm thử:
1. Cấu hình DB (`src/config/db.js`) và tạo migration hoặc script SQL (bảng `users`, `posts`, `comments`).
2. Viết `models/*` — hàm truy vấn đến DB (select, insert, update, delete) cho `users`, `posts`, `comments`.
3. Viết `services/*` — logic nghiệp vụ: register (hash password), login (validate + generate JWT), post CRUD, comment CRUD.
4. Viết `middlewares/auth.middleware.js` để kiểm tra JWT và attach `req.user`.
5. Viết `controllers/*` — nhận request, validate body/params, gọi `services`, trả response.
6. Định nghĩa `routes/*` — map đường dẫn HTTP tới controllers, gắn middleware auth cho các route cần bảo vệ.
7. Test bằng Postman: đăng ký, đăng nhập, tạo bài, lấy bài, thêm bình luận, quyền xóa.

## 9. Cấu trúc DB (SQL mẫu)
Chạy các lệnh SQL sau trên SQL Server để tạo bảng cơ bản:
```sql
CREATE TABLE users (
        id INT PRIMARY KEY IDENTITY(1, 1),
        username VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE posts (
        id INT IDENTITY(1, 1) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        user_id INT REFERENCES users(id),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME
);

CREATE TABLE comments (
        id INT IDENTITY(1, 1) PRIMARY KEY,
        content TEXT NOT NULL,
        user_id INT REFERENCES users(id),
        post_id INT REFERENCES posts(id),
        created_at DATETIME DEFAULT GETDATE()
);
```


