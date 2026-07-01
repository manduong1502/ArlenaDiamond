# YÊU CẦU DỰ ÁN WEBKIMCUONG

Dự án này được xây dựng dựa trên bộ khung theme Shopify Liquid từ thư mục tham chiếu:
`C:\Users\ADMIN\Desktop\WebThoiTrangUc\kien-truc-theme-moi`

Dưới đây là các yêu cầu chi tiết về giao diện và chức năng của các trang:

---

## 1. YÊU CẦU CHUNG & CẤU TRÚC THƯ MỤC
- Copy bộ khung theme từ `C:\Users\ADMIN\Desktop\WebThoiTrangUc\kien-truc-theme-moi` sang thư mục làm việc hiện tại `c:\Users\ADMIN\Desktop\WebKimCuong`.
- Sử dụng cấu trúc thư mục Shopify chuẩn:
  - `assets/`: Chứa file CSS (`style.css`, `critical.css`), JS (`main.js`, `wishlist.js`) và hình ảnh.
  - `layout/`: `theme.liquid`, `password.liquid`.
  - `templates/`: Các file JSON/Liquid templates cho từng trang.
  - `sections/`: Các section động (header, footer, main-index, main-product, main-collection, v.v.).
  - `snippets/`: Các block code tái sử dụng (css-variables, meta-tags, image, newsletter-popup).
  - `config/`: `settings_data.json`, `settings_schema.json`.
  - `locales/`: Các file ngôn ngữ.

---

## 2. TRANG CHỦ (HOMEPAGE) - Theo Ảnh 1 (Phong cách Arlena)
- **Header & Navigation**:
  - Top bar thông báo chạy chữ hoặc tĩnh (ví dụ: AUSTRALIAN MADE | 20+ YEARS EXPERIENCE...).
  - Menu chính dạng hàng ngang: Engagement Rings, Wedding Bands, Earrings, logo ARLENA ở chính giữa, Pendants, Gifts, Our Story.
  - Icons bên phải: Tìm kiếm (trái), Tài khoản & Giỏ hàng (phải) với số lượng giỏ hàng trên badge.
- **Hero Banner**:
  - Hình ảnh trang sức nền tối rất sang trọng và cao cấp.
  - Dòng tiêu đề chính: "Made for Moments." (chữ "for" viết cách điệu nghiêng).
  - Phụ đề: "Australian made fine jewellery, crafted to order for life's most meaningful moments."
  - 2 nút CTA nổi bật: "SHOP ENGAGEMENT RINGS" (nút có màu đồng/vàng sang trọng) và "SHOP ALL JEWELLERY" (nút viền trong suốt).
- **Trust Badges Row 1**:
  - Hàng gồm 5 cam kết kèm icon thanh lịch:
    1. AUSTRALIAN MADE - Handcrafted in our Australian workshop.
    2. 20+ YEARS EXPERIENCE - Expert craftsmanship you can trust.
    3. MADE TO ORDER - Each piece is crafted especially for you.
    4. LIFETIME WARRANTY - Quality you can wear, for a lifetime.
    5. FREE SHIPPING - Complimentary shipping Australia wide.
- **Explore Our Collections**:
  - Tiêu đề: "EXPLORE OUR COLLECTIONS / Timeless Pieces, Crafted for You".
  - Grid 5 danh mục chính: Engagement Rings, Wedding Bands, Earrings, Pendants, Bracelets.
  - Mỗi danh mục có hình ảnh nền trang sức tối màu sắc nét, chữ màu trắng, bên dưới có link "View Collection".
- **Section "Crafted in Australia"**:
  - Layout chia đôi: bên trái là ảnh thợ kim hoàn đang thao tác thủ công, bên phải là tiêu đề "CRAFTED IN AUSTRALIA / Made to Order. Made to Last.", mô tả ngắn, nút "LEARN MORE ABOUT OUR STORY" và danh sách các gạch đầu dòng có icon màu vàng (Ethically Sourced Diamonds & Gemstones, Precision Craftsmanship, Personalised Service).
- **Trust Badges Row 2 (Our Promise)**:
  - Dòng tiêu đề nhỏ: "OUR PROMISE TO YOU / Quality You Can Trust".
  - 5 cam kết khác: Certified Diamonds, Premium Materials, Lifetime Warranty, Easy Returns & Exchanges, Secure & Insured Delivery.
- **Section "Designed for Life's Most Meaningful Moments"**:
  - Bên trái là tiêu đề viết cách điệu và chữ ký "Arlena".
  - Bên phải là grid 4 hình ảnh phong cách sống / ảnh thực tế sản phẩm sang trọng (hộp nhẫn, đeo nhẫn, đeo dây chuyền, nhẫn đôi).
- **Footer Trust**:
  - Hàng ngang màu đen chứa: Online-only, Expert Support, Secure Payments, Satisfaction Guarantee.
- **Footer**:
  - Logo Arlena lớn màu vàng kim ở bên trái kèm mô tả ngắn và mạng xã hội.
  - Các cột link: SHOP, CUSTOMER CARE, ABOUT US.
  - Đăng ký newsletter bên phải: "STAY CONNECTED / Be the first to know about new collections and exclusive offers." kèm ô nhập email.

---

## 3. TRANG CHI TIẾT SẢN PHẨM (PRODUCT DETAIL PAGE) - Theo Ảnh 2 (Phong cách Angara)
- **Cột Trái (Media Gallery)**:
  - Cột chứa danh sách thumbnail nhỏ xếp dọc bên trái ảnh chính.
  - Ảnh chính lớn ở giữa hiển thị chi tiết sắc nét của sản phẩm (ví dụ: hoa tai Oval Drop Earrings), có gắn tag như "NEW ARRIVAL".
- **Cột Phải (Product Options & Buy Block)**:
  - Breadcrumbs nhỏ phía trên tiêu đề.
  - Tiêu đề sản phẩm lớn (ví dụ: U-Pavé Lab-Grown Diamond Oval Drop Earrings).
  - Giá sản phẩm nổi bật (ví dụ: $2,402 kèm giá cũ gạch đi $2,669 và tag giảm giá "10% off"). Có dòng chữ "0% Interest / Pay as low as $200.87/month / Select Plan".
  - **Diamond Quality**: Tab chọn LAB GROWN (các tuỳ chọn F-G, VS | D-E, VVS) và NATURAL (các tuỳ chọn H, SI1 | G, SI2 | H, VS2 | G, VVS2).
  - **Total Carat Weight**: Chọn trọng lượng carat (nút 1/3, 1/2, 1).
  - **Metal Type**: Các chấm tròn chọn màu kim loại (14K Yellow Gold, 14K White Gold, 14K Rose Gold, Platinum).
  - **Upgrade Banner**: Hộp thông báo "Best Value / Upgrade Lab Grown Diamond Quality to D-E, VVS (+ $486)" kèm nút hành động.
  - **Add to Bag**: Nút mua hàng bản lớn màu đen, chứa text giá tiền (ví dụ: "$2,402 | ADD TO BAG").
  - **Wishlist**: Nút trái tim nhỏ kế bên nút mua hàng.
  - **Shipping info**: Ưu đãi "Free Express Shipping" và thông tin thời gian giao hàng dự kiến cụ thể.
  - **Contact links**: Hàng link Drop a Hint, Email Us, Hotline hỗ trợ khách hàng.

---

## 4. TRANG DANH MỤC & DANH SÁCH SẢN PHẨM (COLLECTION PAGE) - Theo Ảnh 3 & 4
- **Thứ tự layout (từ trên xuống dưới, dưới Header)**:
  1. **Đường dẫn (Breadcrumbs)**: Home / Jewelry / Rings (Như ảnh 4).
  2. **Banner sự kiện sale**: Banner ảnh ngang lớn (ví dụ: "4TH OF JULY SALE | 10% OFF SITEWIDE", Coupon code auto applied at checkout).
  3. **Tên danh mục & mô tả**: Tên danh mục chữ lớn (ví dụ: "RINGS (2477)") kèm đoạn mô tả ngắn giới thiệu bộ sưu tập và nút "Read More".
  4. **Các danh mục con (Subcategories)**: Grid hàng ngang các hình tròn/ô vuông bo góc đại diện cho các dòng sản phẩm con (Colored Gems, Diamond, Infinity, Side Stones, Classic, Lab-Grown, GIA Certified, Men's Rings) có nhãn bên dưới.
  5. **Bộ lọc & Sắp xếp (Filter & Sort)**:
     - Nút "Filter & Sort" lớn.
     - Các dropdown bộ lọc: Metal Type, Natural Gemstones, Lab Grown Gemstones, Gemstone Shape, Jewelry Styles, Price.
     - Nút toggle "Lab Grown Only".
  6. **Danh sách sản phẩm (Product Grid)**: Hiển thị danh sách sản phẩm dạng grid 4 cột, hiển thị rõ nét hình ảnh sản phẩm kim cương lấp lánh trên nền xám nhạt cao cấp, có nhãn tag bên góc (ví dụ: PREMIUM D-E, VVS).

---

## 5. HƯỚNG DẪN TÌM HIỂU THÊM
- Đọc file `HUONG_DAN_BACKUP.md` để hiểu quy trình đồng bộ code, quản lý Git và Shopify CLI của dự án.
