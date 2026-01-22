const form = document.getElementById("regForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const dobInput = document.getElementById("dob");
const phoneInput = document.getElementById("phone");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  let isValid = true;
  if (!/^[A-Za-z ]+$/.test(nameInput.value)) {
    setError(nameInput, "Enter a valid name please");
    isValid = false;
  } else clearError(nameInput);

  if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
    setError(emailInput, "Invalid email id");
    isValid = false;
  } else clearError(emailInput);

  if (passwordInput.value.length < 6) {
    setError(passwordInput, "Password must be at least 6 characters");
    isValid = false;
  } else clearError(passwordInput);

  const dob = new Date(dobInput.value);
  const age = new Date().getFullYear() - dob.getFullYear();
  if (age < 18) {
    setError(dobInput, "You must be at least 18 years old");
    isValid = false;
  } else clearError(dobInput);

  if (!/^[0-9]{10}$/.test(phoneInput.value)) {
    setError(phoneInput, "Enter phone number");
    isValid = false;
  } else clearError(phoneInput);

  if (isValid) {
    alert("Registration Successful");
    form.reset();
  }
}
function setError(input, message) {
  input.nextElementSibling.textContent = message;
}
function clearError(input) {
  input.nextElementSibling.textContent = "";
}
