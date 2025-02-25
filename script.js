document.addEventListener("DOMContentLoaded", function () {
    // Obtener el formulario
    
    const form = document.getElementById("calcForm");
    

    // Capturar el evento submit
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // 🚀 Evita que el formulario recargue la página

        // Obtener los valores de los inputs
        const num1 = parseFloat(document.getElementById("num1").value);
        const num2 = parseFloat(document.getElementById("num2").value);
        const num3 = parseFloat(document.getElementById("num3").value);
        const resultSpan = document.getElementById("result");

        // Verificar si los valores son números válidos
        if (!isNaN(num1) && !isNaN(num2)) {
            let delta = (num2-num1)/num3
            




            resultSpan.textContent = delta; // Mostrar resultado
            document.getElementById("parrafoDinamico").innerHTML = '';


        } else {
            resultSpan.textContent = "Error: Ingresa números válidos.";
        }
    });
});document.addEventListener("DOMContentLoaded", function () {
    const inputEcuacion = document.getElementById("inputFuntion");
    const outputEcuacion = document.getElementById("outputEcuacion");

    inputEcuacion.addEventListener("input", function () {
        const ecuacion = inputEcuacion.value.trim();
        outputEcuacion.innerHTML = `Tu ecuación: \\( ${ecuacion} \\)`;
        MathJax.typesetPromise([outputEcuacion]);
    });
});
