const createForm = (title, fields, submitText, onSubmit) => {
    const formContainer = document.createElement('div');
    formContainer.classList.add(`${title.toLowerCase()}-container`);

    const form = document.createElement('form');
    form.classList.add(`${title.toLowerCase()}-form`);
    formContainer.appendChild(form);

    const formHeader = document.createElement('h1');
    formHeader.textContent = title;

    const formFields = fields.map((field) => {
        const fieldLabel = document.createElement('label');
        fieldLabel.textContent = field.label;

        const fieldInput = document.createElement('input');
        fieldInput.name = field.name;
        fieldInput.type = field.type || 'text';

        return [fieldLabel, fieldInput];
    });

    const formSubmit = document.createElement('button');
    formSubmit.textContent = submitText;

    form.append(
        formHeader,
        ...formFields.flat(),
        formSubmit
    );

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
    });

    return formContainer;
};

export default { createForm }