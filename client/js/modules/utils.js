const createForm = (title, fields, submitText, onSubmit) => {
    const mainContainer = document.querySelector('.main-content')
    const formContainer = document.createElement('div');
    formContainer.classList.add('modal-container');

    formContainer.classList.add(title.includes(' ') ? `${title.toLowerCase().split(' ').join('-')}-container` : `${title.toLowerCase()}-container`);

    const form = document.createElement('form');
    form.classList.add(title.includes(' ') ? `${title.toLowerCase().split(' ').join('-')}-form` : `${title.toLowerCase()}-form`);
    form.classList.add('modal-form')
    formContainer.appendChild(form);

    const formHeader = document.createElement('h1');
    formHeader.textContent = title;

    const formFields = fields.map((field) => {
        const fieldLabel = document.createElement('label');
        fieldLabel.textContent = field.label;
        fieldLabel.name = field.name;

        const fieldInput = document.createElement('input');
        fieldInput.name = field.name;
        fieldInput.type = field.type || 'text';
        fieldInput.classList.add(field.class || `${field.name}-input`);

        return [fieldLabel, fieldInput];
    });

    const formSubmit = document.createElement('button');
    formSubmit.textContent = submitText;
    formSubmit.classList.add('submit-button')

    form.append(
        formHeader,
        ...formFields.flat(),
        formSubmit
    );

    formContainer.addEventListener("click", (e) => {
        if (formContainer !== e.target) return;
        mainContainer.removeChild(formContainer);
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        await onSubmit(data);
        mainContainer.removeChild(formContainer);
    });

    mainContainer.appendChild(formContainer)
};

export default { createForm }