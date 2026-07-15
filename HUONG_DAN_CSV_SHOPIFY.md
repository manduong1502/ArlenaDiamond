# HƯỚNG DẪN CẤU TRÚC FILE CSV SHOPIFY - ARLENA DIAMOND

Tài liệu này ghi chú lại cấu trúc chuẩn của file CSV khi nhập (import) sản phẩm lên Shopify cho dự án Arlena Diamond, giúp tránh các lỗi phổ biến (như lệch cột, không gộp được variants, hoặc lỗi Inventory Policy).

---

## 1. File Đang Sử Dụng
*   **`Shopify Upload.csv`**: File tổng hợp đầy đủ tất cả 6 sản phẩm (130 variants).
*   **`Shopify Upload New Products.csv`**: File chỉ chứa 5 sản phẩm mới (không chứa khuyên tai Aurora) để tải lên không bị trùng lặp.
*   **`Shopify Upload.xlsx`**: File Excel gốc gồm nhiều sheet của khách hàng dùng để sửa dữ liệu trước khi xuất CSV.

---

## 2. Cấu Trúc Tổng Quan (63 Cột Chuẩn)
File CSV sử dụng chính xác **63 cột** tiêu đề. Danh sách các cột quan trọng và các trường Metafields tùy chỉnh ở cuối file bao gồm:
*   **Cột 0 - 40**: Các thông số cơ bản của Shopify (`Title`, `Handle`, `Description`, `Vendor`, `Type`, `Tags`, `Price`, `SKU`, v.v.).
*   **Cột 41 - 42**: `SEO Title` và `SEO Description`.
*   **Cột 43 - 56**: Các thông số Google Shopping.
*   **Cột 57 - 62 (Trường Metafields tùy chỉnh)**:
    *   `Diamond Shape (product.metafields.custom.diamond_shape)`
    *   `Diamond Colour (product.metafields.custom.diamond_colour)`
    *   `Diamond Clarity (product.metafields.custom.diamond_clarity)`
    *   `Total Carat Weight (product.metafields.custom.total_carat_weight)`
    *   `Setting Style (product.metafields.custom.setting_style)`
    *   `Made In (product.metafields.custom.made_in)`

---

## 3. Các Quy Tắc Bắt Buộc Để Tránh Lỗi Import

### 🔴 Quy tắc 1: Phân biệt dòng Sản phẩm đầu tiên và dòng Biến thể (Variants)
*   **Dòng đầu tiên của mỗi sản phẩm (Product Row)**: Bắt buộc điền đầy đủ mọi thông tin chung: `Title`, `Description`, `Vendor`, `Type`, `Tags`, `SEO Title`, `SEO Description`, và **tất cả các cột Metafields ở cuối**.
*   **Các dòng biến thể tiếp theo (Variant Rows)**: Bắt buộc phải **ĐỂ TRỐNG hoàn toàn** các cột cấp sản phẩm trên (kể cả các cột Metafields ở cuối). Chỉ được giữ lại các thông số riêng của biến thể:
    *   `Handle` (dùng để Shopify gom nhóm các biến thể lại chung 1 sản phẩm).
    *   `SKU`, `Barcode`.
    *   `Option1 value`, `Option2 value`, `Option3 value`.
    *   `Price`, `Compare-at price`, `Cost per item`.
    *   `Inventory tracker`, `Inventory quantity`, `Continue selling when out of stock`.
    *   `Weight value (grams)`, `Weight unit for display`, `Requires shipping`, `Fulfillment service`.
    *   `Variant image URL`.

### 🔴 Quy tắc 2: Định dạng các cột logic đặc biệt
*   **`Continue selling when out of stock`**:
    *   Bắt buộc điền: **`deny`** (không cho bán tiếp) hoặc **`continue`** (cho bán tiếp khi hết hàng).
    *   *Lưu ý:* Phải viết **chữ thường** (`deny` / `continue`), viết hoa hoặc để trống sẽ bị Shopify từ chối import toàn bộ file.
*   **`Status`**: Bắt buộc điền là **`active`** (viết thường) ở dòng đầu tiên của sản phẩm để tự động kích hoạt hiển thị trên web.
*   **`Published on online store` / `Charge tax` / `Gift card`**: Định dạng chữ viết hoa **`TRUE`** hoặc **`FALSE`**.
*   **`Made In`**: Nếu để trống, hệ thống sẽ tự động gán mặc định là `Australia` khi xuất file.

---

## 4. Cách Sửa Đổi Và Xuất File Trong Tương Lai
Nếu sau này chị muốn cập nhật sản phẩm bằng file Excel `Shopify Upload.xlsx`:
1.  Chị mở file Excel `Shopify Upload.xlsx` và sửa dữ liệu ở các sheet tương ứng.
2.  Sau khi sửa xong, chạy script tự động bằng lệnh sau trong terminal để tự động gộp, làm sạch và xuất ra file CSV chuẩn chỉnh:
    ```bash
    node .gemini/antigravity-ide/brain/ba550f73-53b3-46a4-a427-69aac3dcdde4/scratch/process_excel.js
    ```
    *Mã script sẽ tự động cân chỉnh 63 cột, xóa các ô thừa của variant và điền mặc định `deny` cho chị.*
3.  Lấy file `Shopify Upload New Products.csv` hoặc `Shopify Upload.csv` vừa tạo ra tải lên Shopify.
