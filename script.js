// --- Data Store ---
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
        { category: "Xây thô & Nhân công", amount: 568750000, color: "#3b82f6", desc: "Kết cấu móng, bê tông, xây tường, mái, nhân công." },
        { category: "Hoàn thiện Cơ bản", amount: 227500000, color: "#10b981", desc: "Gạch ốp lát, sơn nước, ốp tường rào." },
        { category: "Nội thất & TB Cố định", amount: 30000000, color: "#f59e0b", desc: "Tủ bếp dưới, lan can cầu thang, cổng rào sắt hộp." },
        { category: "Thiết kế/Xin phép", amount: 28750000, color: "#8b5cf6", desc: "Hồ sơ thiết kế 3D, kỹ thuật, giấy phép." },
        { category: "Dự phòng/Phát sinh", amount: 10000000, color: "#ef4444", desc: "Chi phí dự phòng cho các thay đổi nhỏ." }
    ],
    // DỮ LIỆU ĐÃ CẬP NHẬT: Chia nhỏ thành các Giai đoạn lớn để dễ nhóm lại.
    schedule: [
        { phase: "A. Chuẩn bị & Pháp lý", weeks: "1-2", 
          tasks: [
            "Hoàn thiện hồ sơ Kỹ thuật, xin cấp phép Xây dựng.", 
            "Chuẩn bị mặt bằng, định vị móng, lắp đặt điện nước tạm."
          ],
          inspections: [
            "Kiểm tra bản vẽ thiết kế cuối cùng (3D, kỹ thuật) đã được duyệt và Giấy phép Xây dựng hợp lệ từ cơ quan chức năng.", 
            "Bàn giao mặt bằng."
          ]
        },
        { phase: "B. Xây Thô & Kết Cấu Móng/Sàn 1", weeks: "3-6", 
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
        { phase: "C. Xây Tường & Trát", weeks: "7-13", 
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
        { phase: "D. Hoàn Thiện & Lắp Đặt TB", weeks: "14-17", 
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
        { phase: "E. Bàn Giao", weeks: "18", 
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
        // Xây Thô & Nhân công (Tương đương 162.5 m2 x ~3.5 triệu/m2)
        { id: 1, category: "Xây thô", item: "Bê tông & Cốt thép (Móng, Sàn, Cột)", unit: "m3/kg", quantity: 1, unitPrice: 200000000, total: 200000000 },
        { id: 2, category: "Xây thô", item: "Gạch xây Tường (100/200)", unit: "viên", quantity: 18000, unitPrice: 1500, total: 27000000 },
        { id: 3, category: "Xây thô", item: "Cát, Đá, Xi măng (Xây trát)", unit: "m3/bao", quantity: 1, unitPrice: 35000000, total: 35000000 },
        { id: 4, category: "Xây thô", item: "Nhân công Xây thô (trọn gói)", unit: "m2", quantity: 162.5, unitPrice: 2000000, total: 325000000 },
        // Hoàn thiện Cơ bản
        { id: 5, category: "Hoàn thiện", item: "Gạch Lát Sàn (80x80 P. Khách/Bếp)", unit: "m2", quantity: 60, unitPrice: 320000, total: 19200000 },
        { id: 6, category: "Hoàn thiện", item: "Gạch Lát/Ốp WC (30x60)", unit: "m2", quantity: 45, unitPrice: 250000, total: 11250000 },
        { id: 7, category: "Hoàn thiện", item: "Sơn Nước (Nội thất - 2 lớp màu, 1 lót)", unit: "m2", quantity: 380, unitPrice: 65000, total: 24700000 },
        { id: 8, category: "Hoàn thiện", item: "Sơn Nước (Ngoại thất - 2 lớp màu, 1 lót)", unit: "m2", quantity: 80, unitPrice: 75000, total: 6000000 },
        { id: 9, category: "Hoàn thiện", item: "Hệ thống điện (Dây, công tắc, ổ cắm)", unit: "trọn gói", quantity: 1, unitPrice: 40000000, total: 40000000 },
        { id: 10, category: "Hoàn thiện", item: "Hệ thống nước (Ống, phụ kiện)", unit: "trọn gói", quantity: 1, unitPrice: 20000000, total: 20000000 },
        { id: 11, category: "Hoàn thiện", item: "Chống thấm WC & Sàn", unit: "m2", quantity: 45, unitPrice: 150000, total: 6750000 },
        // Nội thất & TB Cố định
        { id: 12, category: "Nội thất", item: "Cổng Rào Sắt Hộp (2 cánh, sơn tĩnh điện)", unit: "m2", quantity: 10, unitPrice: 2500000, total: 25000000 },
        { id: 13, category: "Nội thất", item: "Lan Can Cầu Thang (Kính cường lực 10mm)", unit: "m dài", quantity: 7, unitPrice: 1500000, total: 10500000 },
        { id: 14, category: "Nội thất", item: "Tủ Bếp Dưới (Gỗ công nghiệp cơ bản)", unit: "m dài", quantity: 3, unitPrice: 5000000, total: 15000000 },
        { id: 15, category: "Nội thất", item: "Cửa Chính (Thép vân gỗ/Nhôm XF)", unit: "bộ", quantity: 1, unitPrice: 15000000, total: 15000000 },
        { id: 16, category: "Nội thất", item: "Cửa Phòng Ngủ (Gỗ công nghiệp HDF)", unit: "bộ", quantity: 3, unitPrice: 4500000, total: 13500000 },
        // Thiết bị
        { id: 17, category: "Thiết bị", item: "Bồn Cầu (3 bộ)", unit: "bộ", quantity: 3, unitPrice: 2500000, total: 7500000 },
        { id: 18, category: "Thiết bị", item: "Lavabo & Vòi (3 bộ)", unit: "bộ", quantity: 3, unitPrice: 1500000, total: 4500000 },
        { id: 19, category: "Thiết bị", item: "Máy Bơm, Bồn nước (1000L)", unit: "bộ", quantity: 1, unitPrice: 6000000, total: 6000000 },
        // Chi phí Khác
        { id: 20, category: "Chi phí khác", item: "Chi phí Thiết kế, Giấy phép", unit: "trọn gói", quantity: 1, unitPrice: 28750000, total: 28750000 },
        { id: 21, category: "Chi phí khác", item: "Chi phí Dự phòng", unit: "trọn gói", quantity: 1, unitPrice: 10000000, total: 10000000 },
    ]
};

// --- State Management ---
let currentTab = 'schedule'; // Default to Schedule tab for immediate view
let currentFilter = 'all';
let sortColumn = 'id';
let sortDirection = 'asc';
// Removed filterActive state

// --- Navigation Logic ---
const navItems = [
    { id: 'overview', label: 'Tổng Quan' },
    { id: 'budget', label: 'Dự Toán Tổng' },
    { id: 'detailed_estimate', label: 'Dự Toán Vật tư Chi tiết' },
    { id: 'schedule', label: 'Tiến Độ & Nghiệm Thu' },
    { id: 'checklist', label: 'Hướng Dẫn Giám Sát' },
    { id: 'design', label: 'Thiết Kế & Vật Tư' }
];

function switchTab(tabId) {
    currentTab = tabId;
    initNav();
    renderContent();
}

function initNav() {
    const container = document.getElementById('nav-container');
    container.innerHTML = navItems.map(item => `
        <button 
            onclick="switchTab('${item.id}')"
            class="nav-item whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm hover:text-sky-600 transition-colors ${currentTab === item.id ? 'active' : 'border-transparent text-slate-500'}"
        >
            ${item.label}
        </button>
    `).join('');
}

// --- Utility Functions ---
function formatVND(amount) {
    // Using toLocaleString for better formatting
    return amount.toLocaleString('vi-VN') + ' VND';
}

function getUniqueCategories() {
    const categories = projectData.detailedEstimate.map(item => item.category);
    return ['all', ...new Set(categories)];
}

// --- Filter and Sort Logic for Detailed Estimate ---
function filterEstimate(category) {
    currentFilter = category;
    renderContent();
}

function sortEstimate(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }
    renderContent();
}

function getSortedAndFilteredData() {
    let data = projectData.detailedEstimate;
    
    // 1. Filter
    if (currentFilter !== 'all') {
        data = data.filter(item => item.category === currentFilter);
    }

    // 2. Sort
    data.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        // Improved sorting logic
        const isNumeric = sortColumn === 'id' || sortColumn === 'quantity' || sortColumn === 'unitPrice' || sortColumn === 'total';

        let comparison = 0;
        if (isNumeric) {
            comparison = valA - valB;
        } else {
            // Fallback for string comparison
            const strA = String(valA || '').toLowerCase();
            const strB = String(valB || '').toLowerCase();
            if (strA > strB) comparison = 1;
            if (strA < strB) comparison = -1;
        }

        return sortDirection === 'asc' ? comparison : -comparison;
    });

    return data;
}


// --- Render Functions ---

function renderContent() {
    const content = document.getElementById('app-content');
    content.className = 'fade-in'; 
    
    switch(currentTab) {
        case 'overview':
            content.innerHTML = renderOverview();
            break;
        case 'budget':
            content.innerHTML = renderBudget();
            initBudgetChart();
            break;
        case 'schedule':
            content.innerHTML = renderSchedule();
            break;
        case 'checklist':
            content.innerHTML = renderChecklist();
            break;
        case 'design':
            content.innerHTML = renderDesign();
            break;
        case 'detailed_estimate':
            content.innerHTML = renderDetailedEstimate();
            break;
    }
}

function renderOverview() {
    return `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Project Specs -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <span class="mr-2">📋</span> Thông Số Kỹ Thuật
                </h2>
                <p class="text-slate-600 mb-6">Dự án nhà ở gia đình với thiết kế tối ưu hóa công năng cho diện tích đất nở hậu, tập trung vào sự thoáng đãng và tiện nghi.</p>
                <div class="space-y-4">
                    ${projectData.overview.specs.map(spec => `
                        <div class="flex justify-between items-center border-b border-slate-50 pb-2">
                            <span class="text-slate-500 font-medium">${spec.label}</span>
                            <span class="text-slate-800 font-semibold text-right">${spec.value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Functional Layout -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h2 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
                    <span class="mr-2">📐</span> Bố Trí Công Năng
                </h2>
                <p class="text-slate-600 mb-6">Phân chia khu vực sinh hoạt hợp lý, đảm bảo riêng tư cho các phòng ngủ và không gian mở cho khu vực sinh hoạt chung.</p>
                
                <div class="mb-6">
                    <h3 class="text-sm uppercase tracking-wide text-sky-600 font-bold mb-3">Tầng Trệt</h3>
                    <div class="flex flex-wrap gap-2">
                        ${projectData.overview.layout.ground.map(item => `
                            <span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm border border-slate-200">${item}</span>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <h3 class="text-sm uppercase tracking-wide text-sky-600 font-bold mb-3">Lầu 1 (Tầng Lửng)</h3>
                    <div class="flex flex-wrap gap-2">
                        ${projectData.overview.layout.mezzanine.map(item => `
                            <span class="bg-sky-50 text-sky-700 px-3 py-1 rounded-lg text-sm border border-sky-100">${item}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderBudget() {
    // Function logic remains the same
    return `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-3 mb-4">
                <h2 class="text-2xl font-bold text-slate-800">Phân Bổ Ngân Sách Tổng</h2>
                <p class="text-slate-600">Tổng ngân sách cố định 900 triệu VND được phân bổ chi tiết theo 5 hạng mục chính. Chi tiết vật tư xem tại tab "Dự toán Vật tư Chi tiết".</p>
            </div>

            <!-- Chart Section -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-1 flex flex-col items-center justify-center">
                <div class="chart-container">
                    <canvas id="budgetChart"></canvas>
                </div>
                <div class="mt-4 text-center">
                    <span class="text-3xl font-bold text-slate-800">${formatVND(900000000)}</span>
                    <span class="block text-sm text-slate-500">Tổng Ngân Sách VND</span>
                </div>
            </div>

            <!-- Details Table -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2 overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-slate-200">
                            <th class="py-3 px-4 text-sm font-semibold text-slate-600">Hạng Mục</th>
                            <th class="py-3 px-4 text-sm font-semibold text-slate-600 text-right">Ngân Sách (VND)</th>
                            <th class="py-3 px-4 text-sm font-semibold text-slate-600">Chi Tiết Phạm Vi</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${projectData.budget.map(item => `
                            <tr class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                <td class="py-4 px-4">
                                    <div class="flex items-center">
                                        <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${item.color}"></div>
                                        <span class="font-medium text-slate-800">${item.category}</span>
                                    </div>
                                </td>
                                <td class="py-4 px-4 text-right font-mono text-slate-700">${formatVND(item.amount)}</td>
                                <td class="py-4 px-4 text-sm text-slate-500">${item.desc}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr class="bg-slate-50">
                            <td class="py-3 px-4 font-bold text-slate-800">Tổng Cộng</td>
                            <td class="py-3 px-4 text-right font-bold text-sky-600">${formatVND(900000000)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
}

function initBudgetChart() {
    // Function logic remains the same
    const ctx = document.getElementById('budgetChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: projectData.budget.map(b => b.category),
            datasets: [{
                data: projectData.budget.map(b => b.amount),
                backgroundColor: projectData.budget.map(b => b.color),
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) { label += ': '; }
                            if (context.parsed !== null) {
                                label += formatVND(context.parsed);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function renderDetailedEstimate() {
    // Function logic remains the same
    const categories = getUniqueCategories();
    const data = getSortedAndFilteredData();
    const grandTotal = data.reduce((sum, item) => sum + item.total, 0);

    const renderTableHeaders = () => {
        const headers = [
            { key: 'id', label: '#', class: 'w-10' },
            { key: 'category', label: 'Hạng Mục', class: 'w-1/6' },
            { key: 'item', label: 'Vật Tư/Chi Phí' }, 
            { key: 'unit', label: 'ĐVT', class: 'w-16 text-center' },
            { key: 'quantity', label: 'SL', class: 'w-16 text-right' },
            { key: 'unitPrice', label: 'Đơn Giá (VND)', class: 'w-1/6 text-right' },
            { key: 'total', label: 'Thành Tiền (VND)', class: 'w-1/5 text-right' },
        ];

        return headers.map(header => {
            const isCurrent = sortColumn === header.key;
            const sortIcon = isCurrent ? (sortDirection === 'asc' ? '▲' : '▼') : '↕';
            
            // FIX LỖI: Thêm kiểm tra phòng vệ: Đảm bảo header.class là chuỗi (chuỗi rỗng nếu undefined)
            const headerClasses = header.class || ''; 

            return `
                <th onclick="sortEstimate('${header.key}')" 
                    class="py-3 px-4 text-sm font-semibold text-slate-600 bg-white cursor-pointer hover:bg-slate-50 transition ${headerClasses}">
                    <div class="flex items-center ${headerClasses.includes('text-right') ? 'justify-end' : ''}">
                        ${header.label}
                        <span class="ml-1 text-xs ${isCurrent ? 'text-sky-600' : 'text-slate-400'}">${sortIcon}</span>
                    </div>
                </th>
            `;
        }).join('');
    };

    return `
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-slate-800">Dự Toán Vật Tư và Chi Phí Chi Tiết</h2>
            <p class="text-slate-600 mt-2">Dự toán này cung cấp chi tiết ước tính về khối lượng và chi phí đơn lẻ cho các vật tư và hạng mục chính. Hãy sử dụng bộ lọc bên dưới để khám phá.</p>
        </div>
        
        <!-- Filter Controls -->
        <div class="flex flex-wrap gap-2 mb-6 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
            <span class="text-sm font-medium text-slate-600 self-center mr-2">Lọc theo Hạng mục:</span>
            ${categories.map(cat => `
                <button onclick="filterEstimate('${cat}')" 
                    class="text-xs px-3 py-1 rounded-full font-medium transition-all
                    ${currentFilter === cat 
                        ? 'bg-sky-600 text-white shadow-md' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                    ${cat === 'all' ? 'Tất cả' : cat}
                </button>
            `).join('')}
        </div>

        <!-- Scrollable Table Container -->
        <div class="bg-white rounded-xl shadow-xl border border-slate-100">
            <div class="scrollable-table-container">
                <table id="estimate-table" class="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            ${renderTableHeaders()}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(item => `
                            <tr class="border-b border-slate-50 hover:bg-sky-50 transition-colors">
                                <td class="py-3 px-4 text-xs text-slate-500">${item.id}</td>
                                <td class="py-3 px-4 font-medium text-sm text-sky-700">${item.category}</td>
                                <td class="py-3 px-4 text-sm text-slate-800">${item.item}</td>
                                <td class="py-3 px-4 text-xs text-slate-500 text-center">${item.unit}</td>
                                <td class="py-3 px-4 text-sm font-mono text-slate-700 text-right">${item.quantity.toLocaleString('vi-VN')}</td>
                                <td class="py-3 px-4 text-sm font-mono text-slate-700 text-right">${formatVND(item.unitPrice)}</td>
                                <td class="py-3 px-4 text-sm font-bold text-slate-800 text-right">${formatVND(item.total)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Footer Total -->
            <div class="p-4 bg-slate-50 rounded-b-xl border-t border-slate-200 flex justify-end">
                <div class="text-right">
                    <p class="text-sm text-slate-600">Tổng cộng (Theo Bộ lọc):</p>
                    <p class="text-xl font-bold text-sky-600">${formatVND(grandTotal)}</p>
                    <p class="text-xs text-slate-400 mt-1">Lưu ý: Ngân sách tổng 900 triệu VND bao gồm cả dự phòng và các chi phí khác.</p>
                </div>
            </div>
        </div>
    `;
}


function renderSchedule() {
    const groupedSchedule = projectData.schedule;
    
    return `
        <div class="max-w-4xl mx-auto">
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-slate-800">Lộ Trình Thi Công 18 Tuần</h2>
                <p class="text-slate-600 mt-2">Tiến độ được chia thành 5 Giai đoạn chính. Theo dõi công việc của Nhà thầu và yêu cầu nghiệm thu để đảm bảo chất lượng.</p>
            </div>

            <div class="relative pl-12 space-y-10">
                <!-- Vertical Timeline Line -->
                <div class="timeline-line"></div>
                
                ${groupedSchedule.map((item, index) => {
                    const milestoneNumber = index + 1;
                    
                    // Map tasks to list items
                    const taskList = item.tasks.map(task => `
                        <li class="mb-1 flex items-start">
                            <span class="text-sky-500 mr-2 mt-1">•</span>
                            <span>${task}</span>
                        </li>
                    `).join('');
                    
                    // Map inspections to list items
                    const inspectionList = item.inspections.map(inspection => `
                        <li class="mb-1 flex items-start">
                            <span class="text-amber-500 mr-2 mt-1">✓</span>
                            <span>${inspection}</span>
                        </li>
                    `).join('');

                    return `
                        <div class="schedule-item relative fade-in" style="animation-delay: ${index * 0.05}s">
                            
                            <!-- Phase Dot -->
                            <div class="schedule-dot -left-4 top-0">
                                ${milestoneNumber}
                            </div>

                            <!-- Phase Card -->
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow ml-2">
                                
                                <!-- Phase Header -->
                                <div class="mb-5 pb-3 border-b border-sky-100">
                                    <span class="text-xs font-bold uppercase tracking-wider text-sky-600">${item.phase}</span>
                                    <h3 class="text-xl font-extrabold text-slate-800 mt-1">Tuần ${item.weeks}</h3>
                                </div>
                                
                                <!-- Tasks and Inspections Grid -->
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                    
                                    <!-- Column 1: Contractor Tasks -->
                                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                        <p class="text-sm font-bold text-slate-700 mb-2 flex items-center">
                                            <span class="text-2xl mr-2">👷</span> Công việc Nhà thầu:
                                        </p>
                                        <ul class="list-none space-y-1 text-slate-600">
                                            ${taskList}
                                        </ul>
                                    </div>
                                    
                                    <!-- Column 2: Owner Inspection -->
                                    <div class="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                        <p class="text-sm font-bold text-amber-700 mb-2 flex items-center">
                                            <span class="text-2xl mr-2">👁️</span> Yêu cầu Nghiệm thu Chủ nhà:
                                        </p>
                                        <ul class="list-none space-y-1 text-amber-900">
                                            ${inspectionList}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}


function renderChecklist() {
    // Function logic remains the same
    return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                 <h2 class="text-2xl font-bold text-slate-800 mb-2">Giai đoạn Thô</h2>
                 <p class="text-slate-600 mb-6 text-sm">Kiểm tra kết cấu và vật tư đầu vào quan trọng.</p>
                 <div class="space-y-4">
                    ${projectData.checklist.materials.map(item => createChecklistItem(item)).join('')}
                 </div>
            </div>
            <div>
                 <h2 class="text-2xl font-bold text-slate-800 mb-2">Giai đoạn Hoàn Thiện</h2>
                 <p class="text-slate-600 mb-6 text-sm">Kiểm tra thẩm mỹ và công năng sử dụng.</p>
                 <div class="space-y-4">
                    ${projectData.checklist.finishing.map(item => createChecklistItem(item)).join('')}
                 </div>
            </div>
        </div>
    `;
}

function createChecklistItem(item) {
    // Function logic remains the same
    const id = 'check-' + Math.random().toString(36).substr(2, 9);
    return `
        <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <button onclick="document.getElementById('${id}').classList.toggle('hidden')" class="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-slate-50">
                <span class="font-semibold text-slate-700">${item.item}</span>
                <span class="text-slate-400 text-sm">▼</span>
            </button>
            <div id="${id}" class="hidden bg-slate-50 px-5 py-4 border-t border-slate-100 text-sm">
                <div class="mb-2">
                    <strong class="text-slate-700 block mb-1">Phương pháp kiểm tra:</strong>
                    <p class="text-slate-600">${item.method}</p>
                </div>
                <div>
                    <strong class="text-slate-700">Dụng cụ cần thiết:</strong>
                    <span class="bg-white px-2 py-0.5 rounded border border-slate-200 text-xs ml-2 text-slate-500">${item.tools}</span>
                </div>
            </div>
        </div>
    `;
}

function renderDesign() {
    // Function logic remains the same
    return `
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-slate-800">Thiết Kế & Vật Tư Chọn Lọc</h2>
            <p class="text-slate-600 mt-2">Các quyết định thiết kế chủ chốt để đạt được phong cách Hiện đại & Tinh tế.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${projectData.design.map(item => `
                <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">${item.icon}</div>
                    <h3 class="font-bold text-lg text-slate-800 mb-1">${item.title}</h3>
                    <p class="text-xs font-semibold text-sky-600 uppercase tracking-wide mb-3">${item.loc}</p>
                    <p class="text-slate-700 text-sm mb-3 font-medium">${item.desc}</p>
                    <div class="pt-3 border-t border-slate-50">
                        <p class="text-xs text-slate-500 italic">"${item.reason}"</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// --- Initialization ---
initNav();
renderContent();
