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
const postalErrorBox = document.getElementById("postal-code-error");
const pwdErrorBox = document.getElementById("password-error");
const pwdConfErrorBox = document.getElementById("password-conf-error");

let errorMessage = "";

const inputs = [email, country, postalCode, pwd, pwdConf];

inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        const errEl = document.getElementById(`${input.id}-error`);
        if (input.validity.valid) {
            // clear field-specific error UI
            errEl.textContent = "";
            errEl.className = "error";
            // hide global box if no inputs have errors
            const anyErrors = inputs.some(i => !i.validity.valid);
            if (!anyErrors) errorBox.className = "";
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

function showError(target) {
    const errEl = document.getElementById(`${target.id}-error`);
    // clear previous error messages
    errEl.textContent = "";
    errorMessage = "";
    // common checks
    if (target.validity.valueMissing) {
        errorMessage = `${target} is a required input`;
        errEl.textContent += errorMessage + "\n";
    }
    if (target.validity.typeMismatch) {
        errorMessage = `${target} should be of type ${target.type}`;
        errEl.textContent += errorMessage + "\n";
    }

    //Specific checks
    if (target.id === "postal-code") {
        if (target.validity.rangeOverflow) {
            errorMessage = `${target} should be between ${target.min} and ${target.max}`;
            errEl.textContent += errorMessage + "\n";
        }
        if (target.validity.rangeUnderflow) {
            errorMessage = `${target} should be between ${target.min} and ${target.max}`;
            errEl.textContent += errorMessage + "\n";
        }
    }
    if (target.id === "password") {
        if (target.validity.tooShort) {
            errorMessage = `${target} should have at least ${target.maxlength} characters, you entered ${target.length}`;
            errEl.textContent += errorMessage + "\n";
        }
    }

    //Active the error class to highlight the errors
    errorBox.className = "active";
}




