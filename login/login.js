(() => {
    'use strict'

    const main = document.getElementById("main");
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    const cargarValidacionesLogin = (form) => {

        const usuarios = JSON.parse(localStorage.getItem("usuarios"));

            document.getElementById("errorGeneral").style.display = "none";

            form.addEventListener('submit', event => {

                event.preventDefault()
                if (!form.checkValidity()) {

                    event.stopPropagation();
                    form.classList.add('was-validated');

                } else {

                    const user = document.getElementById("user").value;
                    const password = document.getElementById("password").value;
                
                    if (user.length == 0 || password.length == 0) {
                        return;
                    } else if (usuarios && usuarios.length) {
                        for (const element of usuarios) {
                            
                            if (user == element.usuario && password == element.password) {

                                let usuario = element;
                                localStorage.setItem("usuario", JSON.stringify(usuario));
                                window.location.href = "dashboard/home.html";
                                
                            }
                            
                        }
                        
                        document.getElementById("errorGeneral").style.display = "block";

                    } else {
                        document.getElementById("errorGeneral").style.display = "block";
                        form.classList.remove('was-validated');
                    }

                }

        })

    }

    const cargarValidacionesCrearCuenta = (form) => {

        document.getElementById("errorGeneral").style.display = "none";

        form.addEventListener('submit', event => {

            event.preventDefault()
            if (!form.checkValidity()) {

                event.stopPropagation();
                form.classList.add('was-validated');

            } else {

                const nombre = document.getElementById("nombre").value;
                const apellidoP = document.getElementById("apellidoP").value;
                const apellidoM = document.getElementById("apellidoM").value;
                const email = document.getElementById("email").value;
                const emailConfirmacion = document.getElementById("emailConfirmacion").value;
                const password = document.getElementById("password").value;
                const passwordConfirmacion = document.getElementById("passwordConfirmacion").value;
            
                if (nombre.length == 0 || apellidoP.length == 0 || email.length == 0 || emailConfirmacion.length == 0 || password.length == 0 || passwordConfirmacion.length == 0) {
                    return;
                } else if (email != emailConfirmacion) {
                    Swal.fire({
                        title: 'Verifica tu correo!',
                        text: '',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                    form.classList.remove('was-validated');
                    return;
                }else if (password != passwordConfirmacion) {
                    Swal.fire({
                        title: 'Las contraseñas no son iguales!',
                        text: '',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                    form.classList.remove('was-validated');
                    return;
                }  else {

                    let miStorage = window.localStorage;
                    let usuarios = [];
                    if (miStorage.getItem("usuarios")) {
                        usuarios = JSON.parse(miStorage.getItem("usuarios"));
                    }

                    let aux = usuarios.filter(function (el) {
                        return el.email == email;
                    });

                    if (aux && aux.length) {
                        Swal.fire({
                            title: 'Email ya registrado!',
                            text: '',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                        form.classList.remove('was-validated');
                        return;
                    }

                    let contadorCuenta = 1;
                    if (usuarios.length) {
                        contadorCuenta = parseInt(usuarios[usuarios.length-1].cuenta) + 1;
                    }
                    
                    const usuario = {
                        cuenta: contadorCuenta,
                        nombre: nombre,
                        apellidoP: apellidoP,
                        apellidoM: apellidoM,
                        email: email,
                        usuario: email,
                        password: password,
                        activo: true,
                        efectivo: 0
                    };

                    usuarios.push(usuario);

                    miStorage.setItem("usuarios", JSON.stringify(usuarios));
                    miStorage.setItem("usuario", JSON.stringify(usuario));
                    window.location.href = "dashboard/home.html";

                }

            }

    })

}

    const cargarLogin = () => {

        main.innerHTML = "";

        const bienvenida = document.createElement("h2");
        bienvenida.innerHTML = "Bienvenid@";
        bienvenida.classList.add("bienvenida", "text-center");

        main.appendChild(bienvenida);

        ///////////////////////////USER CONTENT///////////////////////////////

        const form = document.createElement("form");
        form.id = "login";
        form.classList.add("row", "g-3", "needs-validation", "col-md-12");
        form.setAttribute("novalidate", true);

        const divGeneralError = document.createElement("div");
        divGeneralError.classList.add("invalid-feedback");
        divGeneralError.id = "errorGeneral";
        divGeneralError.innerHTML = "El usuario/contraseña son incorrectos";

        form.appendChild(divGeneralError);

        const userDiv = document.createElement("div");
        userDiv.classList.add("col-md-12");

        const userLabel = document.createElement("label");
        userLabel.classList.add("form-label");
        userLabel.innerHTML = "Usuario:";
        userLabel.setAttribute("for", "user");

        const userInput = document.createElement("input");
        userInput.id = "user";
        userInput.type = "text";
        userInput.classList.add("form-control");
        userInput.placeholder = "usuario@ejemplo.com";
        userInput.required = true;

        const divUserError = document.createElement("div");
        divUserError.classList.add("invalid-feedback");
        divUserError.innerHTML = "Ingresa tú usuario";

        userDiv.appendChild(userLabel);
        userDiv.appendChild(userInput);
        userDiv.appendChild(divUserError);
        form.appendChild(userDiv);

        ///////////////////////////PASSWORD CONTENT///////////////////////////////

        const passDiv = document.createElement("div");
        passDiv.classList.add("col-md-12");

        const passLabel = document.createElement("label");
        passLabel.classList.add("form-label");
        passLabel.innerHTML = "Contraseña:";
        passLabel.setAttribute("for", "user");

        const passInput = document.createElement("input");
        passInput.id = "password";
        passInput.type = "password";
        passInput.classList.add("form-control");
        passInput.placeholder = "**********";
        passInput.required = true;

        const divPassError = document.createElement("div");
        divPassError.classList.add("invalid-feedback");
        divPassError.innerHTML = "Ingresa la contraseña";

        passDiv.appendChild(passLabel);
        passDiv.appendChild(passInput);
        passDiv.appendChild(divPassError);
        form.appendChild(passDiv);

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("col-md-12");

        const button = document.createElement("button");
        button.type = "submit";
        button.id = "btnEntrar";
        button.classList.add("btn", "btn-primary", "col-12");
        button.innerHTML = "Iniciar Sesión";

        buttonDiv.appendChild(button);

        form.appendChild(buttonDiv);

        const btnCrearCuentaDiv = document.createElement("div");
        btnCrearCuentaDiv.classList.add("col-md-12");

        let btnCrearCuenta = document.createElement("button");
        btnCrearCuenta.type = "button";
        btnCrearCuenta.id = "btnCrearCuenta";
        btnCrearCuenta.classList.add("btn", "btn-primary", "col-12");
        btnCrearCuenta.innerHTML = "Crear Cuenta";

        btnCrearCuentaDiv.appendChild(btnCrearCuenta);

        form.appendChild(btnCrearCuentaDiv);

        main.appendChild(form);

        btnCrearCuenta = document.getElementById("btnCrearCuenta");
        btnCrearCuenta.addEventListener("click", () => {
            cargarCrearCuenta();
        });

        setTimeout(() => {
            cargarValidacionesLogin(form);
        }, 1000);

    }

    const cargarCrearCuenta = () => {

        main.innerHTML = "";
        main.classList.add("container-fluid")

        const bienvenida = document.createElement("h2");
        bienvenida.innerHTML = "Crear cuenta";
        bienvenida.classList.add("bienvenida", "text-center");

        main.appendChild(bienvenida);
        main.classList.add("col-md-3")

        ///////////////////////////Nombre CONTENT///////////////////////////////

        const form = document.createElement("form");
        form.id = "crearCuenta";
        form.classList.add("row", "g-3", "needs-validation", "col-md-12");
        form.setAttribute("novalidate", true);
        form.setAttribute("autocomplete", "off");

        const divGeneralError = document.createElement("div");
        divGeneralError.classList.add("invalid-feedback");
        divGeneralError.id = "errorGeneral";
        divGeneralError.innerHTML = "El usuario/contraseña son incorrectos";

        form.appendChild(divGeneralError);

        const nombreDiv = document.createElement("div");
        nombreDiv.classList.add("col-md-12");

        const nombreLabel = document.createElement("label");
        nombreLabel.classList.add("form-label");
        nombreLabel.innerHTML = "Nombre:";
        nombreLabel.setAttribute("for", "nombre");

        const nombreInput = document.createElement("input");
        nombreInput.id = "nombre";
        nombreInput.type = "text";
        nombreInput.name = "nombre";
        nombreInput.classList.add("form-control");
        nombreInput.placeholder = "Carlos";
        nombreInput.required = true;
        nombreInput.autocomplete = false;

        const divNombreError = document.createElement("div");
        divNombreError.classList.add("invalid-feedback");
        divNombreError.innerHTML = "Ingresa tú nombre";

        nombreDiv.appendChild(nombreLabel);
        nombreDiv.appendChild(nombreInput);
        nombreDiv.appendChild(divNombreError);
        form.appendChild(nombreDiv);

        ///////////////////////////Apellidos CONTENT///////////////////////////////

        const apellidoPDiv = document.createElement("div");
        apellidoPDiv.classList.add("col-md-12");

        const apellidoPLabel = document.createElement("label");
        apellidoPLabel.classList.add("form-label");
        apellidoPLabel.innerHTML = "Apellido Paterno:";
        apellidoPLabel.setAttribute("for", "apellidoP");

        const apellidoPInput = document.createElement("input");
        apellidoPInput.id = "apellidoP";
        apellidoPInput.type = "text";
        apellidoPInput.name = "apellidoP";
        apellidoPInput.classList.add("form-control");
        apellidoPInput.placeholder = "Fernandez";
        apellidoPInput.required = true;
        apellidoPInput.autocomplete = "off";

        const divApellidoPError = document.createElement("div");
        divApellidoPError.classList.add("invalid-feedback");
        divApellidoPError.innerHTML = "Ingresa tú primer apellido";

        apellidoPDiv.appendChild(apellidoPLabel);
        apellidoPDiv.appendChild(apellidoPInput);
        apellidoPDiv.appendChild(divApellidoPError);
        form.appendChild(apellidoPDiv);

        const apellidoMDiv = document.createElement("div");
        apellidoMDiv.classList.add("col-md-12");

        const apellidoMLabel = document.createElement("label");
        apellidoMLabel.classList.add("form-label");
        apellidoMLabel.innerHTML = "Apellido Materno:";
        apellidoMLabel.setAttribute("for", "apellidoM");

        const apellidoMInput = document.createElement("input");
        apellidoMInput.id = "apellidoM";
        apellidoMInput.type = "text";
        apellidoMInput.name = "apellidoM";
        apellidoMInput.classList.add("form-control");
        apellidoMInput.placeholder = "Gonzales";
        apellidoMInput.required = false;
        apellidoMInput.autocomplete = "off";

        apellidoMDiv.appendChild(apellidoMLabel);
        apellidoMDiv.appendChild(apellidoMInput);
        form.appendChild(apellidoMDiv);


        ///////////////////////////Email CONTENT ////////////////////////////

        const emailDiv = document.createElement("div");
        emailDiv.classList.add("col-md-12");

        const emailLabel = document.createElement("label");
        emailLabel.classList.add("form-label");
        emailLabel.innerHTML = "Correo electronico:";
        emailLabel.setAttribute("for", "email");

        const emailInput = document.createElement("input");
        emailInput.id = "email";
        emailInput.type = "text";
        emailInput.name = "email";
        emailInput.classList.add("form-control");
        emailInput.placeholder = "ejemplo@ejemplo.com";
        emailInput.required = true;
        emailInput.autocomplete = "off";

        const divEmailError = document.createElement("div");
        divEmailError.classList.add("invalid-feedback");
        divEmailError.innerHTML = "Ingresa tu correo electronico";

        emailDiv.appendChild(emailLabel);
        emailDiv.appendChild(emailInput);
        emailDiv.appendChild(divEmailError);
        form.appendChild(emailDiv);

        const emailConfirmacionDiv = document.createElement("div");
        emailConfirmacionDiv.classList.add("col-md-12");

        const emailConfirmacionLabel = document.createElement("label");
        emailConfirmacionLabel.classList.add("form-label");
        emailConfirmacionLabel.innerHTML = "Confirma tu correo electronico:";
        emailConfirmacionLabel.setAttribute("for", "email");

        const emailconfirmacionInput = document.createElement("input");
        emailconfirmacionInput.id = "emailConfirmacion";
        emailconfirmacionInput.type = "text";
        emailconfirmacionInput.name = "emailConfirmacion";
        emailconfirmacionInput.classList.add("form-control");
        emailconfirmacionInput.placeholder = "ejemplo@ejemplo.com";
        emailconfirmacionInput.required = true;
        emailconfirmacionInput.autocomplete = "off";

        const divEmailConfirmacionError = document.createElement("div");
        divEmailConfirmacionError.classList.add("invalid-feedback");
        divEmailConfirmacionError.innerHTML = "Ingresa tu correo electronico";

        emailConfirmacionDiv.appendChild(emailConfirmacionLabel);
        emailConfirmacionDiv.appendChild(emailconfirmacionInput);
        emailConfirmacionDiv.appendChild(divEmailConfirmacionError);
        form.appendChild(emailConfirmacionDiv);

        ///////////////////////////PASSWORD CONTENT///////////////////////////////

        const passDiv = document.createElement("div");
        passDiv.classList.add("col-md-12");

        const passLabel = document.createElement("label");
        passLabel.classList.add("form-label");
        passLabel.innerHTML = "Contraseña:";
        passLabel.setAttribute("for", "password");

        const passInput = document.createElement("input");
        passInput.id = "password";
        passInput.type = "password";
        passInput.classList.add("form-control");
        passInput.placeholder = "**********";
        passInput.required = true;

        const divPassError = document.createElement("div");
        divPassError.classList.add("invalid-feedback");
        divPassError.innerHTML = "Ingresa la contraseña";

        passDiv.appendChild(passLabel);
        passDiv.appendChild(passInput);
        passDiv.appendChild(divPassError);
        form.appendChild(passDiv);

        const passConfirmacionDiv = document.createElement("div");
        passConfirmacionDiv.classList.add("col-md-12");

        const passConfirmacionLabel = document.createElement("label");
        passConfirmacionLabel.classList.add("form-label");
        passConfirmacionLabel.innerHTML = "Confirmar contraseña:";
        passConfirmacionLabel.setAttribute("for", "passwordConfirmacion");

        const passConfirmacionInput = document.createElement("input");
        passConfirmacionInput.id = "passwordConfirmacion";
        passConfirmacionInput.type = "password";
        passConfirmacionInput.classList.add("form-control");
        passConfirmacionInput.placeholder = "**********";
        passConfirmacionInput.required = true;

        const divPassConfirmacionError = document.createElement("div");
        divPassConfirmacionError.classList.add("invalid-feedback");
        divPassConfirmacionError.innerHTML = "Ingresa la contraseña";

        passConfirmacionDiv.appendChild(passConfirmacionLabel);
        passConfirmacionDiv.appendChild(passConfirmacionInput);
        passConfirmacionDiv.appendChild(divPassConfirmacionError);
        form.appendChild(passConfirmacionDiv);

        const btnCrearCuentaDiv = document.createElement("div");
        btnCrearCuentaDiv.classList.add("col-md-12");

        const btnCrearCuenta = document.createElement("button");
        btnCrearCuenta.type = "submit";
        btnCrearCuenta.id = "btnCrearCuenta";
        btnCrearCuenta.classList.add("btn", "btn-primary", "col-12");
        btnCrearCuenta.innerHTML = "Crear Cuenta";

        btnCrearCuentaDiv.appendChild(btnCrearCuenta);

        form.appendChild(btnCrearCuentaDiv);

        const btnLoginDiv = document.createElement("div");
        btnLoginDiv.classList.add("col-md-12");

        let btnLogin = document.createElement("button");
        btnLogin.type = "button";
        btnLogin.id = "btnEntrar";
        btnLogin.classList.add("btn", "btn-primary", "col-12");
        btnLogin.innerHTML = "Iniciar Sesión";

        btnLoginDiv.appendChild(btnLogin);

        form.appendChild(btnLoginDiv);

        main.appendChild(form);

        btnLogin = document.getElementById("btnEntrar");
        btnLogin.addEventListener("click", () => {
            cargarLogin();
            window.location.href = "../index.html";
        });

        cargarValidacionesCrearCuenta(form);

    }

    if (typeof(Storage) !== "undefined") {
        const usuario = localStorage.getItem("usuario");
        if (!usuario) {
            cargarLogin();
            
        } else {
            window.location.href = "dashboard/home.html";
        }
    } else {
        return;
    }

})()