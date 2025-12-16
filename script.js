// --- Data Store ---
// The projectData object is now in data.js

// --- State Management ---
let currentTab = 'overview'; // Default tab for immediate view
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
            class="nav-link text-nowrap py-3 px-2 border-bottom border-2 ${currentTab === item.id ? 'active text-primary border-primary' : 'border-transparent text-muted'}"
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
    // Bootstrap's fade class handles the animation
    content.className = 'fade-in';

    switch (currentTab) {
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
        <div class="row g-4">
            <!-- Project Specs -->
            <div class="col-lg-6">
                <div class="card shadow-sm h-100">
                    <div class="card-body p-4">
                        <h2 class="card-title h4 fw-bold text-dark mb-3 d-flex align-items-center">
                            <span class="me-2">📋</span> Thông Số Kỹ Thuật
                        </h2>
                        <p class="card-text text-muted mb-4">Dự án nhà ở gia đình với thiết kế tối ưu hóa công năng cho diện tích đất nở hậu, tập trung vào sự thoáng đãng và tiện nghi.</p>
                        <div class="d-grid gap-3">
                            ${projectData.overview.specs.map(spec => `
                                <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
                                    <span class="text-muted">${spec.label}</span>
                                    <span class="fw-semibold text-dark text-end">${spec.value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Functional Layout -->
            <div class="col-lg-6">
                <div class="card shadow-sm h-100">
                    <div class="card-body p-4">
                        <h2 class="card-title h4 fw-bold text-dark mb-3 d-flex align-items-center">
                            <span class="me-2">📐</span> Bố Trí Công Năng
                        </h2>
                        <p class="card-text text-muted mb-4">Phân chia khu vực sinh hoạt hợp lý, đảm bảo riêng tư cho các phòng ngủ và không gian mở cho khu vực sinh hoạt chung.</p>
                        
                        <div class="mb-4">
                            <h3 class="small text-uppercase fw-bold text-primary mb-3">Tầng Trệt</h3>
                            <div class="d-flex flex-wrap gap-2">
                                ${projectData.overview.layout.ground.map(item => `
                                    <span class="badge bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle">${item}</span>
                                `).join('')}
                            </div>
                        </div>

                        <div>
                            <h3 class="small text-uppercase fw-bold text-primary mb-3">Lầu 1 (Tầng Lửng)</h3>
                            <div class="d-flex flex-wrap gap-2">
                                ${projectData.overview.layout.mezzanine.map(item => `
                                    <span class="badge bg-primary-subtle text-primary-emphasis border border-primary-subtle">${item}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCalculatedBudget() {
    // Create a map to store calculated totals for each category from detailedEstimate
    const categoryTotals = new Map();

    projectData.detailedEstimate.forEach(item => {
        const currentTotal = categoryTotals.get(item.category) || 0;
        categoryTotals.set(item.category, currentTotal + (item.quantity * item.unitPrice));
    });

    // Map the template budget data with the dynamically calculated amounts
    const calculatedBudget = projectData.budget.map(budgetItem => {
        return {
            ...budgetItem,
            amount: categoryTotals.get(budgetItem.category) || 0
        };
    });

    return calculatedBudget;
}

function renderBudget() {
    const budgetData = getCalculatedBudget();
    const totalBudget = budgetData.reduce((sum, item) => sum + item.amount, 0);

    return `
        <div class="row g-4">
            <div class="col-12">
                <h2 class="h3 fw-bold text-dark">Phân Bổ Ngân Sách Tổng</h2>
                <p class="text-muted">Tổng ngân sách cố định ${formatVND(totalBudget)} được phân bổ chi tiết theo các hạng mục chính. Dữ liệu được tính toán tự động từ "Dự toán Vật tư Chi tiết".</p>
            </div>

            <!-- Chart Section -->
            <div class="col-lg-4">
                <div class="card shadow-sm h-100">
                    <div class="card-body d-flex flex-column align-items-center justify-content-center p-4">
                        <div class="chart-container">
                            <canvas id="budgetChart"></canvas>
                        </div>
                        <div class="mt-4 text-center">
                            <span class="h2 fw-bold text-dark">${formatVND(totalBudget)}</span>
                            <span class="d-block small text-muted">Tổng Ngân Sách VND</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Details Table -->
            <div class="col-lg-8">
                 <div class="card shadow-sm h-100">
                    <div class="card-body p-4">
                        <div class="table-responsive">
                            <table class="table table-borderless align-middle">
                                <thead>
                                    <tr class="border-bottom">
                                        <th class="py-3 px-3 small fw-semibold text-muted">Hạng Mục</th>
                                        <th class="py-3 px-3 small fw-semibold text-muted text-end">Ngân Sách (VND)</th>
                                        <th class="py-3 px-3 small fw-semibold text-muted">Chi Tiết Phạm Vi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${budgetData.map(item => `
                                        <tr class="border-bottom">
                                            <td class="py-3 px-3">
                                                <div class="d-flex align-items-center">
                                                    <div class="flex-shrink-0 rounded-circle me-2" style="width: 12px; height: 12px; background-color: ${item.color}"></div>
                                                    <span class="fw-medium text-dark small">${item.category}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-3 text-end font-monospace text-secondary small">${formatVND(item.amount)}</td>
                                            <td class="py-3 px-3 text-muted small">${item.desc}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                                <tfoot>
                                    <tr class="bg-light">
                                        <td class="py-3 px-3 fw-bold text-dark">Tổng Cộng</td>
                                        <td class="py-3 px-3 text-end fw-bold text-primary">${formatVND(totalBudget)}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initBudgetChart() {
    const budgetData = getCalculatedBudget();
    const ctx = document.getElementById('budgetChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: budgetData.map(b => b.category),
            datasets: [{
                data: budgetData.map(b => b.amount),
                backgroundColor: budgetData.map(b => b.color),
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
                        label: function (context) {
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
    const categories = getUniqueCategories();
    const data = getSortedAndFilteredData();
    const grandTotal = data.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

    const renderTableHeaders = () => {
        const headers = [
            { key: 'id', label: '#', class: 'col-1' },
            { key: 'category', label: 'Hạng Mục', class: 'col-2' },
            { key: 'item', label: 'Vật Tư/Chi Phí', class: 'col-3' },
            { key: 'unit', label: 'ĐVT', class: 'col-1 text-center' },
            { key: 'quantity', label: 'SL', class: 'col-1 text-end' },
            { key: 'unitPrice', label: 'Đơn Giá (VND)', class: 'col-2 text-end' },
            { key: 'total', label: 'Thành Tiền (VND)', class: 'col-2 text-end' },
        ];

        return headers.map(header => {
            const isCurrent = sortColumn === header.key;
            const sortIcon = isCurrent ? (sortDirection === 'asc' ? '▲' : '▼') : '↕';
            const headerClasses = header.class || '';

            return `
                <th onclick="sortEstimate('${header.key}')" 
                    class="py-3 px-3 small fw-semibold text-muted bg-white" style="cursor: pointer;">
                    <div class="d-flex align-items-center ${headerClasses.includes('text-end') ? 'justify-content-end' : ''}">
                        ${header.label}
                        <span class="ms-1 small ${isCurrent ? 'text-primary' : 'text-light-emphasis'}">${sortIcon}</span>
                    </div>
                </th>
            `;
        }).join('');
    };

    return `
        <div class="mb-4">
            <h2 class="h3 fw-bold text-dark">Dự Toán Vật Tư và Chi Phí Chi Tiết</h2>
            <p class="text-muted mt-2">Dự toán này cung cấp chi tiết ước tính về khối lượng và chi phí đơn lẻ cho các vật tư và hạng mục chính. Hãy sử dụng bộ lọc bên dưới để khám phá.</p>
        </div>
        
        <!-- Filter Controls -->
        <div class="d-flex flex-row flex-wrap align-items-center gap-2 mb-4 p-3 card shadow-sm">
            <span class="small fw-medium text-muted me-2">Lọc theo Hạng mục:</span>
            ${categories.map(cat => `
                <button onclick="filterEstimate('${cat}')" 
                    class="btn btn-sm rounded-pill ${currentFilter === cat
            ? 'btn-primary'
            : 'btn-light'}">
                    ${cat === 'all' ? 'Tất cả' : cat}
                </button>
            `).join('')}
        </div>

        <!-- Scrollable Table Container -->
        <div class="card shadow-lg">
            <div class="scrollable-table-container">
                <table id="estimate-table" class="table table-hover table-sm align-middle">
                    <thead class="table-light">
                        <tr>
                            ${renderTableHeaders()}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(item => `
                            <tr class="small">
                                <td class="py-2 px-3 text-muted">${item.id}</td>
                                <td class="py-2 px-3 fw-medium text-primary-emphasis">${item.category}</td>
                                <td class="py-2 px-3 text-dark">${item.item}</td>
                                <td class="py-2 px-3 text-muted text-center">${item.unit}</td>
                                <td class="py-2 px-3 font-monospace text-secondary text-end">${item.quantity.toLocaleString('vi-VN')}</td>
                                <td class="py-2 px-3 font-monospace text-secondary text-end">${formatVND(item.unitPrice)}</td>
                                <td class="py-2 px-3 fw-bold text-dark text-end">${formatVND(item.quantity * item.unitPrice)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Footer Total -->
            <div class="card-footer p-3 d-flex justify-content-end">
                <div class="text-end">
                    <p class="small text-muted mb-0">Tổng cộng (Theo Bộ lọc):</p>
                    <p class="h5 fw-bold text-primary">${formatVND(grandTotal)}</p>
                    <p class="small text-muted mt-1" style="font-size: 0.75rem;">Lưu ý: Ngân sách tổng 900 triệu VND bao gồm cả dự phòng và các chi phí khác.</p>
                </div>
            </div>
        </div>
    `;
}


function renderSchedule() {
    const groupedSchedule = projectData.schedule;

    return `
        <div>
            <div class="mb-5">
                <h2 class="h3 fw-bold text-dark">Lộ Trình Thi Công 18 Tuần</h2>
                <p class="text-muted mt-2">Tiến độ được chia thành 5 Giai đoạn chính. Theo dõi công việc của Nhà thầu và yêu cầu nghiệm thu để đảm bảo chất lượng.</p>
            </div>

            <div class="position-relative ps-4">
                <!-- Vertical Timeline Line -->
                <div class="border-start position-absolute top-0 bottom-0" style="left: 1.5rem; z-index: 0;"></div>
                
                ${groupedSchedule.map((item, index) => {
        const milestoneNumber = index + 1;

        const taskList = item.tasks.map(task => `
                        <li class="d-flex align-items-start mb-1">
                            <span class="text-primary me-2 mt-1 small">•</span>
                            <span>${task}</span>
                        </li>
                    `).join('');

        const inspectionList = item.inspections.map(inspection => `
                        <li class="d-flex align-items-start mb-1">
                            <span class="text-success me-2 mt-1 small">✓</span>
                            <span>${inspection}</span>
                        </li>
                    `).join('');

        return `
                        <div class="position-relative mb-5 fade-in" style="animation-delay: ${index * 0.05}s">
                            
                            <!-- Phase Dot -->
                            <div class="position-absolute top-0 start-0 translate-middle d-flex align-items-center justify-content-center fw-bold text-white bg-primary rounded-circle border border-4 border-white shadow-sm" style="width: 2.5rem; height: 2.5rem; z-index: 1;">
                                ${milestoneNumber}
                            </div>

                            <!-- Phase Card -->
                            <div class="card shadow-sm" style="margin-left: 1.5rem;">
                                <div class="card-body p-4">
                                    <!-- Phase Header -->
                                    <div class="mb-4 pb-3 border-bottom">
                                        <span class="small fw-bold text-uppercase text-primary">${item.phase}</span>
                                        <h3 class="h5 fw-bolder text-dark mt-1 mb-0">Tuần ${item.weeks}</h3>
                                    </div>
                                    
                                    <!-- Tasks and Inspections Grid -->
                                    <div class="row g-4 small">
                                        <!-- Column 1: Contractor Tasks -->
                                        <div class="col-lg-6">
                                            <div class="card h-100">
                                                <div class="card-header bg-light fw-bold text-dark d-flex align-items-center">
                                                    <span class="fs-5 me-2">👷</span> Công việc Nhà thầu
                                                </div>
                                                <div class="card-body">
                                                    <ul class="list-unstyled mb-0 text-secondary">
                                                        ${taskList}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Column 2: Owner Inspection -->
                                        <div class="col-lg-6">
                                            <div class="card h-100 border-success-subtle">
                                                <div class="card-header bg-success-subtle text-success-emphasis fw-bold d-flex align-items-center">
                                                    <span class="fs-5 me-2">👁️</span> Yêu cầu Nghiệm thu Chủ nhà
                                                </div>
                                                <div class="card-body">
                                                    <ul class="list-unstyled mb-0 text-success-emphasis">
                                                        ${inspectionList}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
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
    const parentId = "checklistAccordion";
    return `
        <div class="row g-5">
            <div class="col-md-6">
                 <h2 class="h4 fw-bold text-dark mb-2">Giai đoạn Thô</h2>
                 <p class="text-muted mb-4 small">Kiểm tra kết cấu và vật tư đầu vào quan trọng.</p>
                 <div class="accordion" id="${parentId}Materials">
                    ${projectData.checklist.materials.map((item, index) => createChecklistItem(item, `${parentId}Materials`, index)).join('')}
                 </div>
            </div>
            <div class="col-md-6">
                 <h2 class="h4 fw-bold text-dark mb-2">Giai đoạn Hoàn Thiện</h2>
                 <p class="text-muted mb-4 small">Kiểm tra thẩm mỹ và công năng sử dụng.</p>
                 <div class="accordion" id="${parentId}Finishing">
                    ${projectData.checklist.finishing.map((item, index) => createChecklistItem(item, `${parentId}Finishing`, index)).join('')}
                 </div>
            </div>
        </div>
    `;
}

function createChecklistItem(item, parentId, index) {
    const itemId = `item-${parentId}-${index}`;
    const collapseId = `collapse-${parentId}-${index}`;
    return `
        <div class="accordion-item">
            <h2 class="accordion-header" id="${itemId}">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                    ${item.item}
                </button>
            </h2>
            <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${itemId}" data-bs-parent="#${parentId}">
                <div class="accordion-body small">
                    <div class="mb-2">
                        <strong class="text-dark d-block mb-1">Phương pháp kiểm tra:</strong>
                        <p class="text-muted mb-0">${item.method}</p>
                    </div>
                    <div>
                        <strong class="text-dark">Dụng cụ cần thiết:</strong>
                        <span class="badge bg-light text-dark-emphasis border border-light-subtle ms-2">${item.tools}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderDesign() {
    return `
        <div class="mb-4 text-center">
            <h2 class="h3 fw-bold text-dark">Thiết Kế & Vật Tư Chọn Lọc</h2>
            <p class="text-muted mt-2">Các quyết định thiết kế chủ chốt để đạt được phong cách Hiện đại & Tinh tế.</p>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            ${projectData.design.map(item => `
                <div class="col">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body p-4">
                            <div class="fs-1 mb-3">${item.icon}</div>
                            <h3 class="card-title h5 fw-bold text-dark">${item.title}</h3>
                            <p class="small fw-semibold text-primary text-uppercase mb-3">${item.loc}</p>
                            <p class="card-text text-secondary mb-3">${item.desc}</p>
                            <div class="pt-3 border-top">
                                <p class="small text-muted fst-italic mb-0">"${item.reason}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// --- Initialization ---
initNav();
renderContent();
