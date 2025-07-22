let isOpen = false;

function toggleOptions() {
    const options = document.getElementById('options');
    const arrowDown = document.querySelector('.btn-down');
    isOpen = !isOpen;
    options.classList.toggle('active', isOpen);
    arrowDown.classList.toggle('active', isOpen);
    document.querySelector('.custom-select').classList.toggle('active', isOpen);
}

function filterOptions() {
    const input = document.querySelector('.select-input input').value.toLowerCase();
    const options = document.getElementsByClassName('option');
    let found = false;
    document.getElementById('noResults').style.display = 'none';

    for (let option of options) {
        const text = option.textContent.toLowerCase().replace('✓', ''); // Игнорируем галочку при поиске
        if (text.includes(input)) {
            option.style.display = 'flex'; // Используем flex для соответствия стилям
            found = true;
        } else {
            option.style.display = 'none';
        }
    }

    if (!found && input) {
        document.getElementById('searchTerm').textContent = input;
        document.getElementById('noResults').style.display = 'block';
    }

    updateClearButton();
}

function clearValue() {
    document.querySelector('.select-input input').value = '';
    const selectedOption = document.querySelector('.option.selected');
    if (selectedOption) selectedOption.classList.remove('selected');
    document.getElementById('options').classList.remove('active');
    isOpen = false;
    document.querySelector('.btn-down').classList.remove('active');
    document.querySelector('.custom-select').classList.remove('active');
    updateClearButton();
}

function updateClearButton() {
    const input = document.querySelector('.select-input input');
    const clearBtn = document.querySelector('.clear-btn');
    const selectedOption = document.querySelector('.option.selected');
    if (input.value && selectedOption) {
        document.querySelector('.select-input').classList.add('has-value');
    } else {
        document.querySelector('.select-input').classList.remove('has-value');
    }
}

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelector('.select-input input').value = this.textContent.trim().replace('✓', '');
        const currentSelected = document.querySelector('.option.selected');
        if (currentSelected) currentSelected.classList.remove('selected');
        this.classList.add('selected');
        isOpen = false;
        document.getElementById('options').classList.remove('active');
        document.querySelector('.btn-down').classList.remove('active');
        document.querySelector('.custom-select').classList.remove('active');
        updateClearButton();
    });
});

document.querySelector('.btn-down').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleOptions();
});

document.addEventListener('click', function(e) {
    const select = document.querySelector('.custom-select');
    if (!select.contains(e.target)) {
        isOpen = false;
        document.getElementById('options').classList.remove('active');
        document.querySelector('.btn-down').classList.remove('active');
        document.querySelector('.custom-select').classList.remove('active');
    }
});

updateClearButton();


document.querySelectorAll('.accordion-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});