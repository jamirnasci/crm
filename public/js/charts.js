// Gráfico de Barras
const barCtx = document.getElementById('barChart').getContext('2d');

//load chart data
(async function () {
    const res = await fetch('/dashboard', {
        method: 'POST'
    })
    const obj = await res.json()
    console.log(obj)
    const barLabels = []
    const barData = []

    obj.interacoes.forEach((item)=>{
        const data = new Date(item.data)
        const day = String(data.getDate()).padStart(2, '0')        // Dia do mês
        const month = String(data.getMonth() + 1).padStart(2, '0') // Mês (0-11)
        const year = data.getFullYear()
        barLabels.push(`${day}/${month}/${year}`)
        barData.push(item.count)
    })
    console.log(barData)
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: barLabels,
            datasets: [{
                label: 'Interações',
                data: barData,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Interações nos últimos 5 dias'
                },
                legend: {
                    display: false // Desativa a legenda
                }
            }
        }
    });

    // Gráfico de Linhas
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'bar',
        data: {
            labels: ['Frio', 'Morno', 'Quente'],
            datasets: [{
                axis: 'y',
                data: [obj.somaFrio, obj.somaMorno, obj.somaQuente],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                fill: false,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Projetado por status'
                },
                legend: {
                    display: false // Desativa a legenda
                }
            }
        }
    });

    // Gráfico de Pizza
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Frio', 'Morno', 'Quente'],
            datasets: [{
                label: 'Status clientes',
                data: [obj.frios, obj.mornos, obj.quentes],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição por Dispositivo'
                }
            }
        }
    });

})()
