# HƯỚNG DẪN CHI TIẾT CÁC CỘT TRONG FILE IMPORT SẢN PHẨM SHOPIFY (CSV)
*Tài liệu này giải thích ý nghĩa từng trường dữ liệu trong file `product_template.csv` để phục vụ nhập liệu và mở rộng 200+ sản phẩm sau này.*

---

## I. THÔNG TIN CHUNG SẢN PHẨM
*Các trường này chỉ cần điền thông tin ở dòng đầu tiên của sản phẩm. Các dòng biến thể phía dưới để trống.*

| Tên cột trong CSV | Ý nghĩa | Ví dụ mẫu | Lưu ý quan trọng |
| :--- | :--- | :--- | :--- |
| **Title** | Tiêu đề sản phẩm | `Aurora Emerald & Pear Diamond Stud Earrings` | Tên chính thức hiển thị trên website. |
| **URL handle** | Đường dẫn tĩnh của sản phẩm | `aurora-emerald-pear-diamond-stud-earrings` | **Bắt buộc tất cả các dòng biến thể cùng 1 sản phẩm phải điền chung Handle này** để Shopify nhóm chúng lại thành một sản phẩm. |
| **Description** | Mô tả chi tiết sản phẩm | `The iconic Toi et Moi design, pairing a striking...` | Có thể chèn thẻ HTML (ví dụ: `<p>`, `<strong>`) để định dạng văn bản. |
| **Vendor** | Thương hiệu / Nhà cung cấp | `Arlena` | Dùng để phân nhóm hoặc lọc theo thương hiệu. |
| **Product category** | Danh mục ngành hàng chuẩn | `Apparel & Accessories > Jewelry > Earrings` | Điền đúng chuẩn phân loại của Shopify để tối ưu SEO & Google Ads. |
| **Type** | Loại sản phẩm | `Earrings` | Ví dụ: `Earrings`, `Ring`, `Necklace`. Dùng để phân loại sản phẩm. |
| **Tags** | Nhãn sản phẩm | `Toi et Moi, Earrings, Diamonds, New Arrival` | Phân tách nhau bằng dấu phẩy. Dùng để làm bộ lọc sản phẩm trên web. |
| **Published on online store** | Trạng thái đăng tải | `TRUE` | `TRUE` là đăng trực tiếp, `FALSE` là ẩn đi. |
| **Status** | Trạng thái hoạt động | `active` | `active` (cho phép bán), `draft` (lưu nháp), `archived` (lưu trữ). |

---

## II. THÔNG TIN BIẾN THỂ (VARIANTS)
*Các thông số này phải điền đầy đủ ở từng dòng biến thể.*

| Tên cột trong CSV | Ý nghĩa | Ví dụ mẫu | Lưu ý quan trọng |
| :--- | :--- | :--- | :--- |
| **SKU** | Mã quản lý kho hàng | `AUR-STUD-9KYel-LAB-050ct` | **Mỗi dòng biến thể bắt buộc phải có 1 mã SKU duy nhất**, không được trùng lặp. |
| **Barcode** | Mã vạch | Để trống | Bỏ trống nếu sản phẩm không có mã vạch/EAN/UPC. |
| **Option1 name** | Tên của Tuỳ chọn 1 | `Metal` | Chỉ điền ở dòng đầu tiên của sản phẩm. |
| **Option1 value** | Giá trị của Tuỳ chọn 1 | `9K Yellow Gold` | Điền giá trị tương ứng của biến thể ở dòng đó. |
| **Option2 name** | Tên của Tuỳ chọn 2 | `Diamond` | Chỉ điền ở dòng đầu tiên của sản phẩm. |
| **Option2 value** | Giá trị của Tuỳ chọn 2 | `Lab Grown` | Điền giá trị tương ứng của biến thể ở dòng đó (ví dụ: `Lab Grown`, `Natural`). |
| **Option3 name** | Tên của Tuỳ chọn 3 | `Carat Weight` | Chỉ điền ở dòng đầu tiên của sản phẩm. |
| **Option3 value** | Giá trị của Tuỳ chọn 3 | `0.50ct` | Điền giá trị tương ứng của biến thể ở dòng đó (ví dụ: `0.50ct`, `1.00ct`). |
| **Price** | Giá bán của biến thể | `2490` | Điền số, không cần kí tự tiền tệ hay dấu phẩy phân tách hàng nghìn. |
| **Compare-at price** | Giá gốc (chưa giảm) | `2863.5` | Phải lớn hơn Price để hiển thị gạch ngang giảm giá. |
| **Cost per item** | Giá vốn | `996` | Dùng để tính toán lợi nhuận nội bộ trong admin (khách không nhìn thấy). |
| **Charge tax** | Tính thuế sản phẩm | `TRUE` | `TRUE` nếu có tính thuế, `FALSE` nếu không. |
| **Tax code** | Mã thuế | Để trống | Để trống để áp dụng thuế mặc định của Shopify. |

---

## III. KHO HÀNG & GIAO HÀNG
*Thông số phục vụ quản lý tồn kho và tính phí vận chuyển.*

| Tên cột trong CSV | Ý nghĩa | Ví dụ mẫu | Lưu ý quan trọng |
| :--- | :--- | :--- | :--- |
| **Inventory tracker** | Đơn vị theo dõi tồn kho | `shopify` | Chọn `shopify` để hệ thống tự trừ kho khi có khách mua. |
| **Inventory quantity** | Số lượng tồn kho | `100` | Số lượng hàng sẵn có của biến thể này. |
| **Continue selling when out of stock** | Cho phép mua khi hết hàng | `DENY` | `DENY` (hết hàng là dừng bán), `CONTINUE` (cho đặt trước kể cả khi hết hàng). |
| **Weight value (grams)** | Cân nặng sản phẩm | `100` | Cân nặng thực tế của biến thể (điền số). |
| **Weight unit for display** | Đơn vị cân nặng | `g` | Thường điền `g` (grams) hoặc `kg`. |
| **Requires shipping** | Cần giao hàng vật lý | `TRUE` | Bắt buộc là `TRUE` đối với trang sức. |
| **Fulfillment service** | Đơn vị hoàn tất đơn hàng | `manual` | Điền `manual` để tự đóng gói gửi hàng thủ công. |

---

## IV. HÌNH ẢNH & SEO
*Các trường ảnh được chừa trống để chị tự upload ảnh thủ công qua giao diện admin sau khi import.*

| Tên cột trong CSV | Ý nghĩa | Ví dụ mẫu | Hướng dẫn xử lý |
| :--- | :--- | :--- | :--- |
| **Product image URL** | Link ảnh chính của sản phẩm | Để trống | **Để trống toàn bộ**. Sau khi import, vào Shopify Admin nhấn upload ảnh thủ công. |
| **Image position** | Vị trí thứ tự ảnh | `1` | Thứ tự hiển thị của ảnh (để trống nếu không có link ảnh). |
| **Image alt text** | Mô tả ảnh phục vụ SEO | Để trống | Để trống hoặc điền mô tả ngắn để tốt cho SEO hình ảnh. |
| **Variant image URL** | Link ảnh riêng của biến thể | Để trống | **Để trống toàn bộ**. Sau này gán ảnh trực tiếp cho biến thể trong trang Admin. |
| **Gift card** | Có phải thẻ quà tặng không | `FALSE` | Mặc định điền `FALSE`. |
| **SEO title** | Tiêu đề hiển thị trên Google | `Aurora Emerald & Pear Diamond Stud...` | Nên điền ngắn gọn, chứa từ khóa chính (< 60 ký tự). |
| **SEO description** | Mô tả hiển thị trên Google | `Shop our Toi et Moi Aurora emerald...` | Nên mô tả hấp dẫn để khách click vào trang (< 160 ký tự). |

---

## V. CÁC THÔNG SỐ KỸ THUẬT (METAFIELES TỰ BIẾN - Ở CUỐI FILE)
*Các cột này em đã đính kèm vào cuối file. Giá trị điền ở đây sẽ tự động hiển thị lên bảng thông số kĩ thuật (Specifications) ở trang chi tiết sản phẩm.*

| Tên cột trong CSV | Ý nghĩa thông số | Điền mẫu |
| :--- | :--- | :--- |
| **Diamond Shape (product.metafields.custom.diamond_shape)** | Hình dáng giác cắt kim cương | `Emerald & Pear` |
| **Diamond Colour (product.metafields.custom.diamond_colour)** | Nước màu kim cương | `D - F` |
| **Diamond Clarity (product.metafields.custom.diamond_clarity)** | Độ tinh khiết của kim cương | `VS1 - VS2` |
| **Setting Style (product.metafields.custom.setting_style)** | Kiểu chấu giữ đá | `Four-Prong` |
| **Made In (product.metafields.custom.made_in)** | Nơi sản xuất | `Australia` |
