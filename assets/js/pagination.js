const rowsPerPage = 10;
let currentPage = 1;

function setupPagination() {
    const table = document.getElementById('data-table');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const pageInput = document.getElementById('page-input');
    const totalPagesSpan = document.getElementById('total-pages');

    function displayRows() {
        rows.forEach((row, index) => {
            row.style.display = (index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage) ? '' : 'none';
        });
        pageInput.value = currentPage;
    }

    function updatePaginationControls() {
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayRows();
            updatePaginationControls();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayRows();
            updatePaginationControls();
        }
    });

    pageInput.addEventListener('change', () => {
        let newPage = parseInt(pageInput.value);
        if (isNaN(newPage) || newPage < 1) {
            newPage = 1;
        } else if (newPage > totalPages) {
            newPage = totalPages;
        }
        currentPage = newPage;
        displayRows();
        updatePaginationControls();
    });

    pageInput.addEventListener('input', () => {
        if (pageInput.value === '') {
            return;
        }
        let newPage = parseInt(pageInput.value);
        if (isNaN(newPage) || newPage < 1) {
            pageInput.value = currentPage;
        }
    });

    displayRows();
    updatePaginationControls();
}

document.addEventListener('DOMContentLoaded', setupPagination);