var usuario = null;
const divBienvenida = document.getElementById("bienvenida");

const cargarMovimientos = (movimientos) => {
    const listaMovimientos = document.getElementById("listaMovimientos");
    if (listaMovimientos) {
        const ulElement = document.createElement("ul");
        ulElement.classList.add("list-group", "text-center");
        for (const element of movimientos.reverse()) {
            const liElement = document.createElement("li");
            liElement.classList.add("list-group-item");
            let tipoMovimiento = "";
            if (element.tipo == 0) {
                tipoMovimiento = " - Retiro por: ";
            } else if (element.tipo == 1) {
                tipoMovimiento = " - Deposito por ";
            }
            liElement.innerHTML = element.fecha ? element.fecha + tipoMovimiento : '00/00/0000' + tipoMovimiento;
            const strongElement = document.createElement("strong");
            strongElement.innerHTML = parseFloat(element.cantidad).toLocaleString('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2});;
            liElement.appendChild(strongElement);
            ulElement.appendChild(liElement);
        }
        listaMovimientos.appendChild(ulElement);
    }
}

if (!localStorage.getItem("usuario")) {
    window.location.href = "../index.html";
} else {
    usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && usuario.movimientos) {
        cargarMovimientos(usuario.movimientos);
    }
    if (divBienvenida) {
        const mensajeBienvenida = document.createElement("h5");
        mensajeBienvenida.classList.add("text-center");
        mensajeBienvenida.innerHTML = "Bienvenid@, " + usuario.nombre + " " + usuario.apellidoP;
        divBienvenida.appendChild(mensajeBienvenida);
        let efectivoActual = usuario.efectivo ? usuario.efectivo : 0;
        document.getElementById("efectivo").innerHTML = parseFloat(efectivoActual).toLocaleString('en-US', {style: 'currency',currency: 'USD', minimumFractionDigits: 2});
    }
}

const depositar = (monto) => {

    if (usuario) {

        if (parseFloat(monto) > 20000) {
            Swal.fire({
                title: 'Lo sentimos!',
                text: 'Solo depositos menores o igual a $20,000',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        for (let x = 0; x < usuarios.length; x++) {
            
            if (usuario.cuenta == usuarios[x].cuenta) {
                usuario.efectivo = usuario.efectivo ? usuario.efectivo : 0;
                usuario.efectivo = (parseFloat(usuario.efectivo) + parseFloat(monto)).toFixed(2);
                usuarios[x] = usuario;
                if (grabarMovimiento(monto, 1)) {
                    localStorage.setItem("usuarios", JSON.stringify(usuarios));
                    localStorage.setItem("usuario", JSON.stringify(usuario));
                    window.location.href = "./home.html";
                }
                break;
            }
            
        }
    }

}

const formDepositar = document.getElementById("formDepositar");
if (formDepositar) {
    formDepositar.addEventListener("submit", (event) => {
        event.preventDefault();
        let monto = document.getElementById("montoDeposito").value;
        if (monto.length = 0 || isNaN(monto) || monto <= 0) {
            document.getElementById("montoDeposito").value = "";
            return;
        }
        depositar(monto);
    })
}

const formRetiro = document.getElementById("formRetiro");
if (formRetiro) {
    formRetiro.addEventListener("submit", (event) => {
        event.preventDefault();
        let monto = document.getElementById("montoRetiro").value;
        if (monto.length = 0 || isNaN(monto) || monto <= 0) {
            document.getElementById("montoRetiro").value = "";
            return;
        }
        retirar(monto);
    })
}

const retirar = (monto) => {
    if (usuario) {

        if (usuario.efectivo < parseFloat(monto)) {
            Swal.fire({
                title: 'Saldo Insuficiente!',
                text: '',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        for (let x = 0; x < usuarios.length; x++) {
            
            if (usuario.cuenta == usuarios[x].cuenta) {
                usuario.efectivo = usuario.efectivo ? usuario.efectivo : 0;
                usuario.efectivo = (parseFloat(usuario.efectivo) - parseFloat(monto)).toFixed(2);
                usuarios[x] = usuario;
                if (grabarMovimiento(monto, 0)) {
                    localStorage.setItem("usuarios", JSON.stringify(usuarios));
                    localStorage.setItem("usuario", JSON.stringify(usuario));
                    window.location.href = "./home.html";
                }
                break;
            }
            
        }
    }
}

const grabarMovimiento = (monto, tipoMovimiento) => {
    if (usuario) {
        let total = parseFloat(monto).toFixed(2);
        let fecha = new Date();
        let movimiento = {
            cantidad: total,
            fecha: String(fecha.getDay() + '/' + fecha.getMonth() + '/' +  fecha.getFullYear()),
            tipo: tipoMovimiento
        }
        if (usuario.movimientos) {
            usuario.movimientos.push(movimiento);
        } else {
            usuario.movimientos = [movimiento];
        }
        return true;
    }
}

const salir = () => {
    localStorage.removeItem("usuario");
    window.location.href = "../index.html";
}