const checkboxes = document.querySelectorAll('.week-checkbox');
const form = document.getElementById('form-main');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', () => handleWeekCheckboxChange(checkbox));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    callAPI();
});

function handleWeekCheckboxChange(checkbox) {
    const week = checkbox.dataset.week;
    const isChecked = checkbox.checked;

    const timeLabel = document.querySelector(`.time-label[data-week="${week}"]`);
    if (timeLabel) {
        const parent = timeLabel.closest('.form-group');
        if (parent) {
            parent.style.display = isChecked ? 'block' : 'none';
        }
        timeLabel.style.display = isChecked ? 'block' : 'none';
    }

    const timeInput = document.querySelector(`.time-input[data-week="${week}"]`);
    if (timeInput) {
        timeInput.style.display = isChecked ? 'block' : 'none';
    }
}

function buildRequestPayload() {
    const interestInput = document.getElementById('interest');
    const payload = {
        availableTime: {
            mon: document.querySelector('.time-input[data-week="monday"]').value ? document.querySelector('.time-input[data-week="monday"]').value * 60 : 0,
            tue: document.querySelector('.time-input[data-week="tuesday"]').value ? document.querySelector('.time-input[data-week="tuesday"]').value * 60 : 0,
            wed: document.querySelector('.time-input[data-week="wednesday"]').value ? document.querySelector('.time-input[data-week="wednesday"]').value * 60 : 0,
            thu: document.querySelector('.time-input[data-week="thursday"]').value ? document.querySelector('.time-input[data-week="thursday"]').value * 60 : 0,
            fri: document.querySelector('.time-input[data-week="friday"]').value ? document.querySelector('.time-input[data-week="friday"]').value * 60 : 0,
            sat: document.querySelector('.time-input[data-week="saturday"]').value ? document.querySelector('.time-input[data-week="saturday"]').value * 60 : 0,
            sun: document.querySelector('.time-input[data-week="sunday"]').value ? document.querySelector('.time-input[data-week="sunday"]').value * 60 : 0,
        },
        interests: interestInput.value
    };
    return payload;
}

function callAPI() {
    fetch('http://localhost:3000/api/recommendations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(buildRequestPayload())
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}