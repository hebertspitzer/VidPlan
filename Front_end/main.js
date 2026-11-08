const checkboxes = document.querySelectorAll('.week-checkbox');
const form = document.getElementById('myForm');

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
        timeLabel.style.display = isChecked ? 'block' : 'none';
    }

    const timeInput = document.querySelector(`.time-input[data-week="${week}"]`);
    if (timeInput) {
        timeInput.style.display = isChecked ? 'block' : 'none';
    }
}

//Em construção
function buildRequestPayload() {
    const interestInput = document.getElementById('interest');
    const payload = {
        availableTime: {

        },
        interests: interestInput.value
    };
    return payload;
}

//Em construção
function callAPI() {
    fetch('/api/recommendations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(buildRequestPayload())
    })
    .then(response => response.json())
    .then(data => {
        // Processar a resposta da API
    })
    .catch(error => {
        // Lidar com erros
    });
}