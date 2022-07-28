{/* <form id="login"  class="row g-3 needs-validation" novalidate>
    <div class="mb-3">
        <label for="pass" class="form-label">Usuario:</label>
        <input type="user" class="form-control" id="user" placeholder="name@example.com" required>
        <div class="invalid-feedback">
            Ingresa tú usuario.
        </div>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Contraseña:</label>
        <input type="password" class="form-control" id="password" placeholder="*********" required>
        <div class="invalid-feedback">
            Ingresa la contraseña.
        </div>
    </div>
    <div>
        <button type="submit" id="btnEntrar" class="btn btn-success col-12">Entrar</button>
    </div>
</form> */}

const button = document.createElement("button");
button.type = "submit";
button.id = "btnEntrar";
button.classList.add("btn", "btn-success", "col-12");
button.innerHTML = "Entrar";

///////////////////////////USER CONTENT///////////////////////////////

const form = document.createElement("form");
form.id = "login";
form.classList.add("row", "g-3", "needs-validation");
form.novalidate = true;

const userDiv = document.createElement("div");
userDiv.className.add("mb-3");

const userLabel = document.createElement("label");
userLabel.form = "user";
userLabel.classList.add("form-label");
userLabel.innerHTML = "Usuario:";

const userInput = document.createElement("input");
userInput.id = "user";
userInput.type = "text";
userInput.classList.add("form-control");
userInput.placeholder = "usuario@ejemplo.com";
userInput.required = true;

const divUserError = document.createElement("div");
divError.className.add("invalid-feedback");
divError.innerHTML = "Ingresa tú usuario";

userDiv.appendChild(userLabel);
userDiv.appendChild(userInput);
userDiv.appendChild(divUserError);
form.appendChild(userDiv);

///////////////////////////PASSWORD CONTENT///////////////////////////////

const passDiv = document.createElement("div");
passDiv.className.add("mb-3");

const passLabel = document.createElement("label");
passLabel.form = "pass";
passLabel.classList.add("form-label");
passLabel.innerHTML = "Usuario:";

const passInput = document.createElement("input");
passInput.id = "pass";
passInput.type = "text";
passInput.classList.add("form-control");
passInput.placeholder = "usuario@ejemplo.com";
passInput.required = true;

const divPassError = document.createElement("div");
divError.className.add("invalid-feedback");
divError.innerHTML = "Ingresa tú usuario";

passDiv.appendChild(passLabel);
passDiv.appendChild(passInput);
passDiv.appendChild(divPassError);
form.appendChild(passDiv);
