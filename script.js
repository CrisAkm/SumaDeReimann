document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("calcForm");
    const aInput = document.getElementById("num1");
    const bInput = document.getElementById("num2");
    const nInput = document.getElementById("num3");
    const funcionInput = document.getElementById("inputFuntion");
    const resultadoSpan = document.getElementById("result");
    const outputEcuacion = document.getElementById("outputEcuacion");
    const metodoInput = document.getElementById("metmat"); // Corregido el id a "metmat"
    const ctx = document.getElementById('grafica').getContext('2d');

    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Gráfica de la función',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
            {
                label: 'Rectángulos de la función',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)', // Color de los rectángulos
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                borderDash: [5, 5], // Línea discontinua para los rectángulos
                type: 'bar', // Cambiamos el tipo a 'bar' para barras
                yAxisID: 'y', // Aseguramos que la barra se dibuje en el eje Y
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: false
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let a = parseFloat(aInput.value);
        let b = parseFloat(bInput.value);
        let n = parseInt(nInput.value);
        let funcion = funcionInput.value;
        let metodo = metodoInput.value; // Método seleccionado: izquierda, derecha, o centro

        if (isNaN(a) || isNaN(b) || isNaN(n) || n <= 0) {
            alert("Por favor, ingresa valores numéricos válidos.");
            return;
        }
        if (a >= b) {
            alert("El valor de 'a' debe ser menor que 'b'.");
            return;
        }

        // Actualizamos la ecuación mostrada en pantalla
        outputEcuacion.innerHTML = `Tu ecuación aparecerá aquí: $$${funcion}$$`;
        MathJax.typesetPromise();

        // Evaluamos la suma de Riemann según el método seleccionado
        let deltaX = (b - a) / n;
        let suma = 0;

        let xValues = [];
        let yValues = [];
        let rectangleX = []; // Para almacenar los puntos de los rectángulos
        let rectangleY = []; // Para almacenar las alturas de los rectángulos

        try {
            for (let i = 0; i < n; i++) {
                let x;
                // Determinamos el valor de x según el método seleccionado
                if (metodo === "izquierda") {
                    x = a + i * deltaX; // Límite inferior del subintervalo
                } else if (metodo === "derecha") {
                    x = a + (i + 1) * deltaX; // Límite superior del subintervalo
                } else if (metodo === "centro") {
                    x = a + (i + 0.5) * deltaX; // Punto medio del subintervalo
                }

                let fx = math.evaluate(funcion.replace('^', '**'), { x: x });
                suma += fx * deltaX;

                // Guardamos los valores para la gráfica
                xValues.push(x);
                yValues.push(fx);

                // Guardamos los puntos para los rectángulos (barras)
                rectangleX.push(x); 
                rectangleY.push(fx);
            }

            // Mostrar el resultado de la suma de Riemann
            resultadoSpan.textContent = suma.toFixed(4);

            // Actualizamos la gráfica
            chart.data.labels = xValues; // Eje X
            chart.data.datasets[0].data = yValues; // Eje Y (función original)
            chart.data.datasets[1].data = rectangleY; // Eje Y (rectángulos)

            chart.update(); // Actualizar la gráfica

        } catch (error) {
            alert("Error en la función ingresada. Asegúrate de escribirla correctamente.");
        }
    });

    funcionInput.addEventListener("input", function () {
        let ecuacion = funcionInput.value;
        outputEcuacion.innerHTML = `Tu ecuación aparecerá aquí: $$${ecuacion}$$`;
        MathJax.typesetPromise();
    });
});
