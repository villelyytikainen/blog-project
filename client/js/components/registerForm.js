const renderRegisterForm = () => {
    const mainContent = document.querySelector(".main-content");
    const formContainer = document.createElement("div");
    formContainer.classList.add("register-form-container");
    formContainer.innerHTML = `
    <form class="register-form">
        <label for="username">Username</label>
        <input name="username" type="text" class="username-input">
        <label for="password">Password</label>
        <input name="password" type="password" class="password-input">
        <button type="submit" class="submit-register">Submit</button>
    </form>
    `;

    mainContent.appendChild(formContainer);
    const registerForm = document.querySelector(".register-form");

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        await api.createUser(data);
    });
};

export default renderRegisterForm;