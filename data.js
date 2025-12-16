const projectData = {
    overview: {
        specs: [
            { label: "Kích thước Đất", value: "5m x 10.165m (Nở hậu 8.48m)" },
            { label: "Địa điểm", value: "TP. Vĩnh Long" },
            { label: "Phong cách", value: "Hiện đại, Tinh tế" },
            { label: "Ngân sách", value: "900.000.000 VND (Cố định)" },
            { label: "Thời gian", value: "4.5 tháng (18 tuần)" }
        ],
        layout: {
            ground: ["Sân trước & Cổng rào", "Nhà Xe", "Phòng Khách + Bếp (Không gian mở)", "Phòng Ngủ 1", "Tắm & WC"],
            mezzanine: ["Phòng Ngủ 2", "Phòng Ngủ 3", "Tắm & WC"]
        }
    },
    budget: [
        // The 'amount' property is now removed and will be calculated dynamically.
        { category: "Xây thô", color: "#0d6efd", desc: "Toàn bộ kết cấu, móng, sàn, tường, và nhân công thô." },
        { category: "Hoàn thiện", color: "#198754", desc: "Gạch ốp lát, sơn, hệ thống điện nước, chống thấm." },
        { category: "Nội thất", color: "#ffc107", desc: "Cửa, cổng, lan can, tủ bếp và các hạng mục nội thất cố định." },
        { category: "Thiết bị", color: "#dc3545", desc: "Thiết bị vệ sinh, bồn nước, máy bơm." },
        { category: "Chi phí khác", color: "#6c757d", desc: "Chi phí thiết kế, xin phép, và dự phòng phát sinh." }
    ],
    schedule: [
        {
            phase: "A. Chuẩn bị & Pháp lý", weeks: "1-2",
            tasks: [
                "Hoàn thiện hồ sơ Kỹ thuật, xin cấp phép Xây dựng.",
                "Chuẩn bị mặt bằng, định vị móng, lắp đặt điện nước tạm."
            ],
            inspections: [
                "Kiểm tra bản vẽ thiết kế cuối cùng (3D, kỹ thuật) đã được duyệt và Giấy phép Xây dựng hợp lệ từ cơ quan chức năng.",
                "Bàn giao mặt bằng."
            ]
        },
        {
            phase: "B. Xây Thô & Kết Cấu Móng/Sàn 1", weeks: "3-6",
            tasks: [
                "Đào đất, đổ bê tông lót móng. Lắp dựng cốt thép Móng, Đà Kiềng.",
                "Đổ bê tông Móng/Đà Kiềng.",
                "Xây tường rào/trụ cổng.",
                "Thi công cốt thép, cốt pha, lắp đặt ống MEP âm cho Cột và Sàn Tầng Trệt/Lửng.",
                "Đổ bê tông Cột/Sàn."
            ],
            inspections: [
                "Kiểm tra chủng loại và đường kính Thép (so sánh với CO/CQ).",
                "Kiểm tra cao độ và kích thước Hố móng, đảm bảo đúng theo Bản vẽ thiết kế. (Nghiệm thu trước khi đổ bê tông Móng)",
                "Kiểm tra Thép Sàn, vị trí và độ kín của Đường ống Điện/Nước âm sàn. (Nghiệm thu trước khi đổ bê tông Sàn)"
            ]
        },
        {
            phase: "C. Xây Tường & Trát", weeks: "7-13",
            tasks: [
                "Xây tường bao và tường ngăn phòng (tường 100/200).",
                "Xây cầu thang bộ. Lắp dựng hệ kết cấu mái (nếu có).",
                "Lắp đặt toàn bộ hệ thống Điện/Nước (âm tường). Chống thấm sàn WC, ban công, mái.",
                "Trát tường nội thất.",
                "Trát tường ngoại thất và hoàn thiện trát tường rào."
            ],
            inspections: [
                "Kiểm tra độ thẳng đứng, độ phẳng của tường xây bằng dây dọi.",
                "Kiểm tra kích thước ô cửa chính xác theo thiết kế.",
                "Thử Áp lực nước (5-7 bar trong 24h, đồng hồ không giảm).",
                "Ngâm nước Chống Thấm (24h) không bị rò rỉ.",
                "Kiểm tra tổng thể độ phẳng và góc cạnh của lớp trát. Gõ nhẹ tìm vị trí bị bộp/rỗng."
            ]
        },
        {
            phase: "D. Hoàn Thiện & Lắp Đặt TB", weeks: "14-17",
            tasks: [
                "Lắp đặt Gạch Ốp Lát sàn, tường WC.",
                "Lắp đặt hệ thống cửa, lan can cầu thang, cổng rào.",
                "Bả Matít/Sơn lót.",
                "Sơn hoàn thiện (màu sắc chính thức).",
                "Lắp đặt thiết bị vệ sinh, thiết bị điện (đèn, công tắc, ổ cắm).",
                "Lắp đặt tủ bếp dưới."
            ],
            inspections: [
                "Dùng búa cao su gõ kiểm tra độ rỗng (bộp) của gạch ốp lát.",
                "Kiểm tra độ khít, bản lề, khóa của Cửa/Cổng.",
                "Kiểm tra vật liệu sơn bả đúng chủng loại.",
                "Kiểm tra màu sơn, độ mịn. Bật điện/mở nước kiểm tra hoạt động của tất cả thiết bị."
            ]
        },
        {
            phase: "E. Bàn Giao", weeks: "18",
            tasks: [
                "Vệ sinh công nghiệp toàn bộ công trình.",
                "Sửa chữa các lỗi nhỏ cuối cùng."
            ],
            inspections: [
                "Nghiệm thu tổng thể (Visual inspection) về thẩm mỹ, độ sạch.",
                "Ký biên bản bàn giao và thanh toán lần cuối theo hợp đồng."
            ]
        }
    ],
    checklist: {
        materials: [
            { item: "Thép", method: "Kiểm tra tem nhãn, nhãn mác (Hòa Phát, Việt Nhật...). Dùng thước kẹp đo đường kính (ví dụ phi 10mm).", tools: "Thước kẹp, Hợp đồng" },
            { item: "Móng & Bê tông", method: "Kiểm tra Con kê đúng vị trí/chiều dày. Yêu cầu lấy mẫu bê tông tươi để nén thử mác.", tools: "Thước cuộn, Giấy CO/CQ" },
            { item: "Hệ thống Nước", method: "Thử Áp lực 5-7 bar trong 24h. Đồng hồ không giảm áp là đạt.", tools: "Đồng hồ đo áp lực" },
            { item: "Bảo dưỡng Bê tông", method: "Quan sát tưới nước 2-3 lần/ngày trong 7 ngày đầu.", tools: "Quan sát mắt thường" }
        ],
        finishing: [
            { item: "Trát/Xây", method: "Dùng dây dọi kiểm tra thẳng đứng. Dùng thước 2m kiểm tra độ phẳng.", tools: "Dây dọi, Thước nivo, Thước 2m" },
            { item: "Chống Thấm", method: "Ngâm nước cao 5cm trong 24h. Kiểm tra rò rỉ tầng dưới.", tools: "Ghi chép" },
            { item: "Ốp Lát", method: "Dùng búa cao su gõ hình caro. Tiếng 'bộp' là rỗng keo/vữa.", tools: "Búa cao su" },
            { item: "Sơn Nước", method: "Kiểm tra dưới ánh sáng tự nhiên và đèn điện. Tìm vết loang, bọt khí.", tools: "Đèn pin" },
            { item: "Cửa & Cổng", method: "Đóng mở thử nghiệm. Kiểm tra bản lề, khóa, gioăng.", tools: "Tay" }
        ]
    },
    design: [
        { title: "Gạch Lát Sàn", loc: "P. Khách/Bếp", desc: "Gạch Porcelein 80x80cm, Màu Xám Nhạt/Vân Mây.", reason: "Tạo không gian mở, liền mạch và sang trọng.", icon: "⬜" },
        { title: "Cầu Thang", loc: "Lối lên Lầu 1", desc: "Mặt bậc gỗ/đá, Lan can kính cường lực 10mm.", reason: "Giúp tầng trệt thoáng, hiện đại, không nặng nề.", icon: "↗️" },
        { title: "Ánh Sáng", loc: "Toàn nhà", desc: "Đèn Downlight âm trần, LED hắt khe (Vàng/Trung tính).", reason: "Ánh sáng dịu, tối giản, nhấn mạnh đường nét.", icon: "💡" },
        { title: "Cửa Phòng Ngủ", loc: "3 Phòng", desc: "Gỗ công nghiệp cánh phẳng (Vân gỗ nhạt/Trắng).", reason: "Tối giản, hiện đại, cách âm tốt.", icon: "🚪" },
        { title: "Mặt Tiền", loc: "Ngoại thất", desc: "Thiết kế phẳng, cửa sổ kính lớn, mảng ốp trang trí.", reason: "Tạo khối hiện đại, lấy sáng tối đa.", icon: "🏢" },
        { title: "Cổng & Sân", loc: "Phía trước", desc: "Cổng sắt hộp sơn tĩnh điện (Đen/Xám), Sân lát gạch chống trơn.", reason: "An ninh, chi phí tối ưu, bền bỉ.", icon: "🚧" }
    ],
    detailedEstimate: [
        { id: 1, category: "Xây thô", item: "Bê tông & Cốt thép (Móng, Sàn, Cột)", unit: "m3/kg", quantity: 1, unitPrice: 200000000 },
        { id: 2, category: "Xây thô", item: "Gạch xây Tường (100/200)", unit: "viên", quantity: 18000, unitPrice: 1500 },
        { id: 3, category: "Xây thô", item: "Cát, Đá, Xi măng (Xây trát)", unit: "m3/bao", quantity: 1, unitPrice: 35000000 },
        { id: 4, category: "Xây thô", item: "Nhân công Xây thô (trọn gói)", unit: "m2", quantity: 162.5, unitPrice: 2000000 },
        { id: 5, category: "Hoàn thiện", item: "Gạch Lát Sàn (80x80 P. Khách/Bếp)", unit: "m2", quantity: 60, unitPrice: 320000 },
        { id: 6, category: "Hoàn thiện", item: "Gạch Lát/Ốp WC (30x60)", unit: "m2", quantity: 45, unitPrice: 250000 },
        { id: 7, category: "Hoàn thiện", item: "Sơn Nước (Nội thất - 2 lớp màu, 1 lót)", unit: "m2", quantity: 380, unitPrice: 65000 },
        { id: 8, category: "Hoàn thiện", item: "Sơn Nước (Ngoại thất - 2 lớp màu, 1 lót)", unit: "m2", quantity: 80, unitPrice: 75000 },
        { id: 9, category: "Hoàn thiện", item: "Hệ thống điện (Dây, công tắc, ổ cắm)", unit: "trọn gói", quantity: 1, unitPrice: 40000000 },
        { id: 10, category: "Hoàn thiện", item: "Hệ thống nước (Ống, phụ kiện)", unit: "trọn gói", quantity: 1, unitPrice: 20000000 },
        { id: 11, category: "Hoàn thiện", item: "Chống thấm WC & Sàn", unit: "m2", quantity: 45, unitPrice: 150000 },
        { id: 12, category: "Nội thất", item: "Cổng Rào Sắt Hộp (2 cánh, sơn tĩnh điện)", unit: "m2", quantity: 10, unitPrice: 2500000 },
        { id: 13, category: "Nội thất", item: "Lan Can Cầu Thang (Kính cường lực 10mm)", unit: "m dài", quantity: 7, unitPrice: 1500000 },
        { id: 14, category: "Nội thất", item: "Tủ Bếp Dưới (Gỗ công nghiệp cơ bản)", unit: "m dài", quantity: 3, unitPrice: 5000000 },
        { id: 15, category: "Nội thất", item: "Cửa Chính (Thép vân gỗ/Nhôm XF)", unit: "bộ", quantity: 1, unitPrice: 15000000 },
        { id: 16, category: "Nội thất", item: "Cửa Phòng Ngủ (Gỗ công nghiệp HDF)", unit: "bộ", quantity: 3, unitPrice: 4500000 },
        { id: 17, category: "Thiết bị", item: "Bồn Cầu (3 bộ)", unit: "bộ", quantity: 3, unitPrice: 2500000 },
        { id: 18, category: "Thiết bị", item: "Lavabo & Vòi (3 bộ)", unit: "bộ", quantity: 3, unitPrice: 1500000 },
        { id: 19, category: "Thiết bị", item: "Máy Bơm, Bồn nước (1000L)", unit: "bộ", quantity: 1, unitPrice: 6000000 },
        { id: 20, category: "Chi phí khác", item: "Chi phí Thiết kế, Giấy phép", unit: "trọn gói", quantity: 1, unitPrice: 21000000 },
        { id: 21, category: "Chi phí khác", item: "Chi phí Dự phòng", unit: "trọn gói", quantity: 1, unitPrice: 100000000 },
    ]
};
