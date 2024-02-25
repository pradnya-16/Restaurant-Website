function validation() {
  var firstName = document.getElementById("inputFirstName").value;
  var lastName = document.getElementById("inputLastName").value;
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;

  const form = document.forms["Signup_form"];
  alert(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/signup", {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => alert("You Have Registered Successfully..."))
      .catch((error) => console.error("Error!", error.message));
  });
}
