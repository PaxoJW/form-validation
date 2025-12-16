const form = document.querySelector("form");
//inputs
const email = document.getElementById("email");
const country = document.getElementById("country");
const postalCode = document.getElementById("postal-code");
const pwd = document.getElementById("password");
const pwdConf = document.getElementById("password-conf");
//error boxes
const errorBox = document.querySelector("#error-box");
const emailErrorBox = document.getElementById("email-error");
const countryErrorBox = document.getElementById("country-error");
const postalCodeErrorBox = document.getElementById("postal-code-error");
const pwdErrorBox = document.getElementById("password-error");
const pwdConfErrorBox = document.getElementById("password-conf-error");

let errorMessage = "";

const inputs = [email, country, postalCode, pwd, pwdConf];

inputs.forEach((input) => {
    if (!input) return; // skip if input is not found or null
    
    input.dataset.touched = "false"; // mark all inputs as untouched initially

    input.addEventListener("blur", (e) => {
        input.dataset.touched = "true"; // mark input as touched on blur
    });

    input.addEventListener("input", (e) => {
        const errEl = document.getElementById(`${input.id}-error`);
        if (input.validity.valid) {
            // clear field-specific error UI
            errEl.textContent = "";
            errEl.className = "";
            // hide global box if no inputs have errors
            const anyVisibleErrors = inputs.some(i => 
                i.dataset.touched === "true" &&
                !i.validity.valid);
            console.log("Any errors remaining: " + anyVisibleErrors);
            if (!anyVisibleErrors) errorBox.className = "";
        } else {
            showError(input);
        }
    });
});

form.addEventListener("submit", (e) => {
    // check each input's validity
    inputs.forEach((input) => {
        if (!input.validity.valid) {
            showError(input);
            // prevent form submission
            e.preventDefault();
        }
    });
});

function updateGlobalErrorBox() {
    const anyVisibleErrors = inputs.some(
        input =>
            input.dataset.touched === "true" &&
            !input.validity.valid
    );

    errorBox.className = anyVisibleErrors ? "active" : "";
}

function showError(target) {
    const errEl = document.getElementById(`${target.id}-error`);
    // clear previous error messages
    errEl.textContent = "";
    errorMessage = "";
    // common checks
    if (target.validity.valueMissing) {
        errorMessage = `${target.id} is a required input`;
        errEl.textContent += errorMessage + "\n";
        errEl.className = "error";
    }
    if (target.validity.typeMismatch) {
        errorMessage = `${target.id} should be of type ${target.type}`;
        errEl.textContent += errorMessage + "\n";
        errEl.className = "error";
    }

    //Specific checks
    if (target.id === "postal-code") {
        if (target.validity.rangeOverflow) {
            errorMessage = `${target.id} should be between ${target.min} and ${target.max}`;
            errEl.textContent += errorMessage + "\n";
            errEl.className = "error";
        }
        if (target.validity.rangeUnderflow) {
            errorMessage = `${target.id} should be between ${target.min} and ${target.max}`;
            errEl.textContent += errorMessage + "\n";
            errEl.className = "error";
        }
    }
    if (target.id === "password") {
        if (target.validity.tooShort) {
            errorMessage = `${target.id} should have at least ${target.minLength} characters, you entered ${target.value.length}`;
            errEl.textContent += errorMessage + "\n";
            errEl.className = "error";
        }
    }
    if (target.id === "password-conf") {
        if (target.value !== pwd.value) {
            errorMessage = `Password confirmation should match password`;
            errEl.textContent += errorMessage + "\n";
            errEl.className = "error";
        }
    }

    //Active the error class to highlight the errors
    errorBox.className = "active";
}