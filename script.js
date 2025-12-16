// --- State Management ---
let currentTab = 'overview';
let currentFilter = 'all';
let sortColumn = 'id';
let sortDirection = 'asc';
let budgetChart;

// --- Cached DOM Elements ---
const DOM = {
    appContent: null,
    navContainer: null,
    totalBudgetDisplay: null,
    totalWeeksDisplay: null
};

// --- Constants ---
const ANIMATION_DELAY = 0.05;
const VND_LOCALE = 'vi-VN';
const DATE_FORMAT_OPTIONS = { day: '2-digit', month: '2-digit', year: 'numeric' };

// --- Utility Functions ---
// --- Utility Functions ---
function formatVND(amount) {
    return amount.toLocaleString(VND_LOCALE) + ' VND';
}

function initDOMCache() {
    DOM.appContent = document.getElementById('app-content');
    DOM.navContainer = document.getElementById('nav-container');
    DOM.totalBudgetDisplay = document.getElementById('total-budget-display');
    DOM.totalWeeksDisplay = document.getElementById('total-weeks-display');
}

/**
 * DATA TRANSFORMATION FUNCTIONS
 */

// New function to calculate budget from the new `estimate` structure
function getCalculatedBudget() {
    return projectData.estimate.map(category => {
        const totalAmount = category.items.reduce((sum, item) => {
            return sum + (item.quantity * item.unitPrice);
        }, 0);
        return {
            ...category, // category, color, desc
            amount: totalAmount
        };
    });
}

// Updated to work with the new `estimate` structure
function getSortedAndFilteredData() {
    // Flatten the nested items from the estimate structure and add category info to each item
    const allItems = projectData.estimate.flatMap(category =>
        category.items.map(item => ({
            ...item,
            category: category.category
        }))
    );

    let data = [...allItems];

    // Filter by category
    if (currentFilter !== 'all') {
        data = data.filter(item => item.category === currentFilter);
    }

    // Sort data
    data.sort((a, b) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];

        // Special handling for total column
        if (sortColumn === 'total') {
            aValue = a.quantity * a.unitPrice;
            bValue = b.quantity * b.unitPrice;
        }

        if (aValue < bValue) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return data;
}


/**
 * RENDER FUNCTIONS
 */

// --- Render Functions ---
function renderContent() {
    if (!DOM.appContent) return;
    
    DOM.appContent.className = 'fade-in';

    switch (currentTab) {
        case 'overview':
            DOM.appContent.innerHTML = renderOverview();
            break;
        case 'budget':
            DOM.appContent.innerHTML = renderBudget();
            initBudgetChart();
            break;
        case 'schedule':
            DOM.appContent.innerHTML = renderSchedule();
            break;
        case 'checklist':
            DOM.appContent.innerHTML = renderChecklist();
            break;
        case 'design':
            DOM.appContent.innerHTML = renderDesign();
            break;
        case 'detailed_estimate':
            DOM.appContent.innerHTML = renderDetailedEstimate();
            break;
    }
}

function renderOverview() {
    // Calculate total weeks and dates
    const startDate = new Date(projectData.overview.startDate);
    const totalWeeks = projectData.schedule.reduce((sum, phase) => sum + phase.weeks, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (totalWeeks * 7));
    
    // Calculate total budget
    const calculatedBudget = getCalculatedBudget();
    const totalBudget = calculatedBudget.reduce((sum, item) => sum + item.amount, 0);
    const roundedBudget = Math.ceil(totalBudget / 10000000) * 10000000;
    
    const formatDate = (date) => date.toLocaleDateString(VND_LOCALE, DATE_FORMAT_OPTIONS);
    
    return `
        <div class="mb-4">
            <h2 class="h3 fw-bold text-dark">Tổng Quan Dự Án</h2>
            <p class="text-muted">Thông tin chi tiết về kích thước, bố trí công năng và các thông số kỹ thuật của dự án.</p>
        </div>
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
                            <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
                                <span class="text-muted">Thời gian dự kiến</span>
                                <span class="fw-semibold text-dark text-end">${formatDate(startDate)} - ${formatDate(endDate)}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
                                <span class="text-muted">Tổng dự toán</span>
                                <span class="fw-semibold text-primary text-end">${(roundedBudget / 1000000).toLocaleString('vi-VN')} Triệu VND</span>
                            </div>
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
                        
                        ${projectData.overview.layout.map((floor, index) => `
                            <div class="${index < projectData.overview.layout.length - 1 ? 'mb-4' : ''}">
                                <h3 class="small text-uppercase fw-bold text-primary mb-3">${floor.floor}</h3>
                                <div class="d-flex flex-wrap gap-2">
                                    ${floor.rooms.map(room => `
                                        <span class="badge bg-primary-subtle text-primary-emphasis border border-primary-subtle">${room}</span>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

const renderBudget = () => {
    const calculatedBudget = getCalculatedBudget();
    const totalBudget = calculatedBudget.reduce((sum, item) => sum + item.amount, 0);

    return `
        <div class="mb-4">
            <h2 class="h3 fw-bold text-dark">Phân Bổ Ngân Sách Tổng</h2>
            <p class="text-muted">Tổng ngân sách ${formatVND(totalBudget)} được phân bổ chi tiết theo các hạng mục chính.</p>
        </div>
        <div class="row g-4">

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
                                    ${calculatedBudget.map(item => `
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
};

const renderDetailedEstimate = () => {
    const data = getSortedAndFilteredData();
    const categories = ['all', ...projectData.estimate.map(c => c.category)];
    const totalCost = data.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

    const getSortIcon = (key) => {
        const isCurrent = sortColumn === key;
        const sortIcon = isCurrent ? (sortDirection === 'asc' ? '▲' : '▼') : '↕';
        return sortIcon;
    };

    return `
        <div class="mb-4">
            <h2 class="h3 fw-bold text-dark">Dự Toán Vật Tư & Chi Phí Chi Tiết</h2>
            <p class="text-muted">Xem chi tiết từng vật tư và chi phí trong dự toán xây dựng, với khả năng lọc và sắp xếp theo nhu cầu.</p>
        </div>
        <div class="card">
            <div class="card-body">              
                <!-- Filter Controls -->
                <div class="d-flex flex-row flex-wrap align-items-center gap-2 mb-4">
                    <span class="small fw-medium text-muted me-2">Lọc theo Hạng mục:</span>
                    ${categories.map(cat => `
                        <button onclick="filterEstimate('${cat}')" 
                            class="btn btn-sm rounded-pill ${currentFilter === cat ? 'btn-primary' : 'btn-light'}">
                            ${cat === 'all' ? 'Tất cả' : cat}
                        </button>
                    `).join('')}
                </div>
                
                <div class="table-responsive">
                    <table id="estimate-table" class="table table-hover table-sm align-middle">
                        <thead class="table-light">
                            <tr>
                                <th onclick="sortEstimate('id')" class="py-3 px-3 small fw-semibold text-muted" style="cursor: pointer;">
                                    # <span class="ms-1 small ${sortColumn === 'id' ? 'text-primary' : 'text-light-emphasis'}">${getSortIcon('id')}</span>
                                </th>
                                <th onclick="sortEstimate('category')" class="py-3 px-3 small fw-semibold text-muted" style="cursor: pointer;">
                                    Hạng Mục <span class="ms-1 small ${sortColumn === 'category' ? 'text-primary' : 'text-light-emphasis'}">${getSortIcon('category')}</span>
                                </th>
                                <th onclick="sortEstimate('item')" class="py-3 px-3 small fw-semibold text-muted" style="cursor: pointer;">
                                    Vật Tư/Chi Phí <span class="ms-1 small ${sortColumn === 'item' ? 'text-primary' : 'text-light-emphasis'}">${getSortIcon('item')}</span>
                                </th>
                                <th class="py-3 px-3 small fw-semibold text-muted text-center">ĐVT</th>
                                <th onclick="sortEstimate('quantity')" class="py-3 px-3 small fw-semibold text-muted text-end" style="cursor: pointer;">
                                    SL <span class="ms-1 small ${sortColumn === 'quantity' ? 'text-primary' : 'text-light-emphasis'}">${getSortIcon('quantity')}</span>
                                </th>
                                <th onclick="sortEstimate('unitPrice')" class="py-3 px-3 small fw-semibold text-muted text-end" style="cursor: pointer;">
                                    Đơn Giá (VND) <span class="ms-1 small ${sortColumn === 'unitPrice' ? 'text-primary' : 'text-light-emphasis'}">${getSortIcon('unitPrice')}</span>
                                </th>
                                <th onclick="sortEstimate('total')" class="py-3 px-3 small fw-semibold text-muted text-end" style="cursor: pointer;">
                                    Thành Tiền (VND) <span class="ms-1 small ${sortColumn === 'total' ? 'text-primary' : 'text-light-emphasis'}">${getSortIcon('total')}</span>
                                </th>
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
                        <tfoot class="table-light">
                            <tr class="fw-bold">
                                <td colspan="6" class="py-3 px-3 text-end">Tổng Cộng:</td>
                                <td class="py-3 px-3 text-primary text-end">${formatVND(totalCost)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    `;
};

function renderSchedule() {
    const groupedSchedule = projectData.schedule;
    const startDate = new Date(projectData.overview.startDate);
    
    // Calculate total weeks
    const totalWeeks = groupedSchedule.reduce((sum, phase) => sum + phase.weeks, 0);
    
    // Calculate project end date
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (totalWeeks * 7));
    
    // Helper function to calculate date from week number
    const getDateFromWeek = (weekNum) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + ((weekNum - 1) * 7));
        return date.toLocaleDateString(VND_LOCALE, DATE_FORMAT_OPTIONS);
    };
    
    // Calculate start/end weeks for each phase sequentially
    let currentWeek = 1;
    const phasesWithWeeks = groupedSchedule.map(phase => {
        const startWeek = currentWeek;
        const endWeek = currentWeek + phase.weeks - 1;
        currentWeek = endWeek + 1;
        return { ...phase, startWeek, endWeek };
    });

    const formatDate = (date) => date.toLocaleDateString(VND_LOCALE, DATE_FORMAT_OPTIONS);

    return `
        <div>
            <div class="mb-4">
                <h2 class="h3 fw-bold text-dark">Lộ Trình Thi Công ${totalWeeks} Tuần</h2>
                <p class="text-muted">Tiến độ được chia thành ${groupedSchedule.length} Giai đoạn chính. Theo dõi công việc của Nhà thầu và yêu cầu nghiệm thu để đảm bảo chất lượng.</p>
                <div class="alert alert-info d-flex align-items-center gap-3 mt-3">
                    <span class="fs-5">📅</span>
                    <div>
                        <strong>Ngày dự kiến bắt đầu:</strong> ${formatDate(startDate)}
                        <span class="mx-2">|</span>
                        <strong>Ngày dự kiến hoàn thành:</strong> ${formatDate(endDate)}
                    </div>
                </div>
            </div>

            <div class="position-relative ps-4">
                <!-- Vertical Timeline Line -->
                <div class="border-start position-absolute top-0 bottom-0" style="left: 1.5rem; z-index: 0;"></div>
                
                ${phasesWithWeeks.map((item, index) => {
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
                        <div class="position-relative mb-5 fade-in" style="animation-delay: ${index * ANIMATION_DELAY}s">
                            
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
                                <h3 class="h5 fw-bolder text-dark mt-1 mb-0">Tuần ${item.startWeek}${item.startWeek !== item.endWeek ? '-' + item.endWeek : ''}</h3>
                                <p class="small text-muted mb-0 mt-1">
                                    <span class="me-2">📅</span>
                                    ${getDateFromWeek(item.startWeek)} - ${getDateFromWeek(item.endWeek)}
                                </p>
                            </div>                                    <!-- Tasks and Inspections Grid -->
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
        <div class="mb-4">
            <h2 class="h3 fw-bold text-dark">Hướng Dẫn Giám Sát Công Trình</h2>
            <p class="text-muted">Checklist chi tiết để kiểm tra chất lượng công trình qua từng giai đoạn thi công.</p>
        </div>
        <div class="row g-5">
            <div class="col-md-6">
                 <h3 class="h5 fw-bold text-dark mb-2">Giai đoạn Thô</h3>
                 <p class="text-muted mb-4 small">Kiểm tra kết cấu và vật tư đầu vào quan trọng.</p>
                 <div class="accordion" id="${parentId}Materials">
                    ${projectData.checklist.materials.map((item, index) => createChecklistItem(item, `${parentId}Materials`, index)).join('')}
                 </div>
            </div>
            <div class="col-md-6">
                 <h3 class="h5 fw-bold text-dark mb-2">Giai đoạn Hoàn Thiện</h3>
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
        <div class="mb-4">
            <h2 class="h3 fw-bold text-dark">Thiết Kế & Vật Tư Chọn Lọc</h2>
            <p class="text-muted">Các quyết định thiết kế chủ chốt để đạt được phong cách Hiện đại & Tinh tế.</p>
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

const initBudgetChart = () => {
    const ctx = document.getElementById('budgetChart');
    if (!ctx) return;

    const calculatedBudget = getCalculatedBudget();

    if (budgetChart) {
        budgetChart.destroy();
    }

    budgetChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: calculatedBudget.map(item => item.category),
            datasets: [{
                data: calculatedBudget.map(item => item.amount),
                backgroundColor: calculatedBudget.map(item => item.color),
                borderWidth: 2,
                hoverOffset: 8
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

// --- Event Handlers ---
function switchTab(tabId) {
    currentTab = tabId;
    updateActiveTab();
    renderContent();
}

function updateActiveTab() {
    if (!DOM.navContainer) return;
    
    const navLinks = DOM.navContainer.querySelectorAll('.nav-link');
    navLinks.forEach(btn => {
        const btnTabId = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
        const isActive = btnTabId === currentTab;
        btn.classList.toggle('active', isActive);
        btn.classList.toggle('text-primary', isActive);
        btn.classList.toggle('border-primary', isActive);
        btn.classList.toggle('border-transparent', !isActive);
        btn.classList.toggle('text-muted', !isActive);
    });
}

function filterEstimate(category) {
    currentFilter = category;
    if (DOM.appContent) {
        DOM.appContent.innerHTML = renderDetailedEstimate();
    }
}

function sortEstimate(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }
    if (DOM.appContent) {
        DOM.appContent.innerHTML = renderDetailedEstimate();
    }
}

// --- Navigation Logic ---
const navItems = [
    { id: 'overview', label: 'Tổng Quan' },
    { id: 'budget', label: 'Dự Toán Tổng' },
    { id: 'detailed_estimate', label: 'Dự Toán Chi Tiết' },
    { id: 'schedule', label: 'Tiến Độ & Nghiệm Thu' },
    { id: 'checklist', label: 'Hướng Dẫn Giám Sát' },
    { id: 'design', label: 'Thiết Kế & Vật Tư' }
];

function initNav() {
    if (!DOM.navContainer) return;
    
    DOM.navContainer.innerHTML = navItems.map(item => `
        <button 
            onclick="switchTab('${item.id}')"
            class="nav-link text-nowrap py-3 px-2 border-bottom border-2 ${currentTab === item.id ? 'active text-primary border-primary' : 'border-transparent text-muted'}"
        >
            ${item.label}
        </button>
    `).join('');
}

// Update total budget display in header
function updateTotalBudgetDisplay() {
    if (!DOM.totalBudgetDisplay) return;
    
    const calculatedBudget = getCalculatedBudget();
    const totalBudget = calculatedBudget.reduce((sum, item) => sum + item.amount, 0);
    // Round up to nearest 10 million
    const roundedBudget = Math.ceil(totalBudget / 10000000) * 10000000;
    DOM.totalBudgetDisplay.textContent = `💰 ${(roundedBudget / 1000000).toLocaleString(VND_LOCALE)} Triệu VND`;
}

// Update total weeks display in header
function updateTotalWeeksDisplay() {
    if (!DOM.totalWeeksDisplay) return;
    
    const totalWeeks = projectData.schedule.reduce((sum, phase) => sum + phase.weeks, 0);
    DOM.totalWeeksDisplay.textContent = `⏳ ${totalWeeks} Tuần`;
}

// --- Initialization ---
function init() {
    initDOMCache();
    initNav();
    renderContent();
    updateTotalBudgetDisplay();
    updateTotalWeeksDisplay();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}