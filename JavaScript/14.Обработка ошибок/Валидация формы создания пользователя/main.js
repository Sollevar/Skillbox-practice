const form = document.getElementById('create-form');
const formError = document.getElementById('create-form-error');
async function createUser(data) {
    const errors = [];

    if (!data.email.trim()) {
        errors.push({
            name: 'email',
            message: 'E-mail обязателен для заполнения',
        });
    } else if (!data.email.includes('@') || !data.email.includes('.')) {
        errors.push({
            name: 'email',
            message: 'E-mail имеет неверный формат',
        });
    }

    if (!data.name.trim()) {
        errors.push({
            name: 'name',
            message: 'Имя обязательно для заполнения',
        });
    }

    if (!data.gender) {
        errors.push({
            name: 'gender',
            message: 'Пол обязателен для заполнения',
        });
    }

    if (!data.status) {
        errors.push({
            name: 'status',
            message: 'Статус обязателен для заполнения',
        });
    }

    if (errors.length) {
        const err = new TypeError();
        err.errorMessages = errors;
        throw err;
    }

    const response = await fetch('https://gorest.co.in/public/v2/users', { // нужен не паршеный ответ, чтобы отследить status
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer 0561a0ef5c83c007fc315b1b8c975b1133930b3d09cb4471c65b1121fa95da08',
        }
    })

    if (response.status === 200 || response.status === 201) {
        return response;
    }

    if (response) {
        const errorData = await response.json();
        const err = new TypeError();
        err.errorMessages = errorData.map(err => ({
            name: err.field,
            message: err.message
        }));
        throw err;
    }

    throw new Error('не удалось создать нового пользователя');

}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {};
    const formElemets = {};
    const spinner = form.querySelector('button .spinner-border')

    for (let i = 0; i < form.elements.length; ++i) { // form.elements - все элементы формы
        const element = form.elements[i];
        if (!element.name) continue;
        if (element.name === 'gender') {
            const genderTitle = document.getElementById('gender-title');
            if (element.checked) {
                data[element.name] = element.value;
                genderTitle.classList.remove('is-invalid');
            } else {
                genderTitle.classList.remove('is-invalid');
                formElemets[element.name] = genderTitle;
            }
        } else {
            data[element.name] = element.value;
            formElemets[element.name] = element;
            element.classList.remove('is-invalid');
        }
    }

    formError.textContent = '';

    try {
        spinner.style.display = '';
        await createUser(data);
        alert('Пользователь создан');
    } catch (error) {
        if (error.name !== 'TypeError') throw error;
        if (error.errorMessages) {
            for (const message of error.errorMessages) {
                formElemets[message.name].classList.add('is-invalid');
            }
            formError.textContent = error.errorMessages
                .map(errorMessage => errorMessage.message)
                .join('. ');
        }
    } finally{
        spinner.style.display = 'none';
    }

})