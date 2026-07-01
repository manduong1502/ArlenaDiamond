# 📦 HƯỚNG DẪN BACKUP & KHÔI PHỤC THEME SHOPIFY

## Thông tin Repository
- **GitHub:** https://github.com/manduong1502/HouseofBrands_AUS
- **Theme ID:** 147868123206
- **Store:** houseofbrandsstore.myshopify.com

---

## 🔧 CHUẨN BỊ (Chỉ cần làm 1 lần)

### Bước 1: Cài đặt phần mềm
1. **Cài Git:** Tải tại https://git-scm.com/downloads → cài đặt mặc định
2. **Cài Node.js:** Tải tại https://nodejs.org → chọn bản LTS
3. **Cài Shopify CLI:** Mở Terminal (hoặc PowerShell) rồi gõ:
   ```
   npm install -g @shopify/cli
   ```

### Bước 2: Tải source code từ GitHub
1. Mở Terminal, gõ:
   ```
   git clone https://github.com/manduong1502/HouseofBrands_AUS.git
   ```
2. Vào thư mục vừa tải:
   ```
   cd HouseofBrands_AUS
   ```

### Bước 3: Đăng nhập Shopify CLI
```
shopify auth login --store houseofbrandsstore.myshopify.com
```
Trình duyệt sẽ mở ra → đăng nhập tài khoản Shopify admin.

---

## 🚀 KHÔI PHỤC THEME KHI BỊ LỖI

### Cách 1: Khôi phục từ GitHub (Khuyên dùng)

1. Mở Terminal, vào thư mục source code:
   ```
   cd đường-dẫn-tới-thư-mục/HouseofBrands_AUS
   ```

2. Cập nhật code mới nhất từ GitHub:
   ```
   git pull origin main
   ```

3. Push code lên Shopify:
   ```
   shopify theme push --theme 147868123206 --allow-live
   ```

4. Chờ hoàn tất → kiểm tra lại website.

### Cách 2: Khôi phục từ Shopify Admin (Không cần code)

1. Vào **Shopify Admin** → **Online Store** → **Themes**
2. Nhấn vào **"..."** bên cạnh theme đang dùng
3. Chọn **"Duplicate"** để tạo bản sao trước khi chỉnh sửa
4. Nếu cần quay lại, vào theme sao lưu → nhấn **"Publish"**

---

## 💾 BACKUP CODE HIỆN TẠI LÊN GITHUB

Khi bạn chỉnh sửa code và muốn lưu bản mới:

1. Mở Terminal, vào thư mục source code
2. Chạy lần lượt:
   ```
   git add -A
   git commit -m "Mô tả thay đổi, ví dụ: Cap nhat shipping fee"
   git push origin main
   ```

---

## 📥 TẢI THEME HIỆN TẠI TỪ SHOPIFY VỀ MÁY

Nếu bạn đã chỉnh sửa trực tiếp trên Shopify Admin và muốn backup:

```
shopify theme pull --theme 147868123206
```

Lệnh này sẽ tải toàn bộ theme hiện tại từ Shopify về máy tính.

Sau đó backup lên GitHub:
```
git add -A
git commit -m "Backup theme tu Shopify"
git push origin main
```

---

## ⚠️ LƯU Ý QUAN TRỌNG

1. **Luôn backup trước khi chỉnh sửa:** Chạy `git pull` trước khi bắt đầu làm việc
2. **Không chỉnh sửa trực tiếp trên GitHub:** Chỉ push code từ máy tính lên
3. **Theme ID có thể thay đổi:** Nếu bạn tạo theme mới, cần cập nhật Theme ID trong lệnh push
4. **Kiểm tra Theme ID hiện tại:**
   ```
   shopify theme list
   ```
5. **Nếu quên mật khẩu GitHub:** Liên hệ người quản lý repo để được cấp lại quyền truy cập

---

## 📞 LIÊN HỆ HỖ TRỢ

Nếu gặp khó khăn, vui lòng liên hệ đội ngũ kỹ thuật để được hỗ trợ.
