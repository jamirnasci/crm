const findByNomeBtn = document.getElementById('findByNomeBtn')
findByNomeBtn.addEventListener('click', async () => {
    const res = await fetch('/cliente/procurar', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome_procurar: document.getElementById('nome_procurar').value
        })
    })
    const obj = await res.json()
    if (obj.length > 0) {

        const tbody = document.getElementById('tableBody')
        tbody.innerHTML = ''
        obj.forEach((item, i) => {
            const el = `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${item.nome}</td>
            <td>${item.sobrenome}</td>
            <td>${item.cpf}</td>
            <td>${item.status}</td>
            <td><button class="btn btn-success w-100" type="button" data-bs-toggle="modal" data-bs-target="#updateModal" btn-success w-100" onclick=clienteInfo("/cliente/detalhes/${item.idcliente}")>Abrir</button></td>
            </tr>
            `
            tbody.innerHTML += el
        })
    } else {
        alert('Cliente não encontrado')
    }
})

async function clienteInfo(url) {
    const res = await fetch(url, {
        method: 'POST'
    })
    const obj = await res.json()

    document.getElementById('dialog-nome').value = obj.nome
    document.getElementById('dialog-sobrenome').value = obj.sobrenome
    document.getElementById('dialog-cpf').value = obj.cpf
    document.getElementById('dialog-email').value = obj.email
    document.getElementById('dialog-telefone').value = obj.telefone
    document.getElementById('dialog-renda').value = parseFloat(obj.renda).toFixed(2)
    document.getElementById('dialog-prox_interacao').value = obj.prox_interacao
    document.getElementById('dialog-status').value = obj.status
    document.getElementById('dialog-produto_idproduto').value = obj.produto_idproduto
    document.getElementById('dialog-telefone').value = obj.telefone
    document.getElementById('dialog-descricao').value = obj.descricao
    document.getElementById('updateBtn').setAttribute('idcliente', obj.idcliente)
}
const updateBtn = document.getElementById('updateBtn')
updateBtn.addEventListener('click', async (tag) => {
    const id = updateBtn.getAttribute('idcliente')
    const res = await fetch(`/cliente/update/${id}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: document.getElementById('dialog-nome').value,
            sobrenome: document.getElementById('dialog-sobrenome').value,
            cpf: document.getElementById('dialog-cpf').value,
            email: document.getElementById('dialog-email').value,
            telefone: document.getElementById('dialog-telefone').value,
            renda: document.getElementById('dialog-renda').value,
            prox_interacao: document.getElementById('dialog-prox_interacao').value,
            status: document.getElementById('dialog-status').value,
            produto_idproduto: document.getElementById('dialog-produto_idproduto').value,
            descricao: document.getElementById('dialog-descricao').value
        })
    })
    const obj = await res.json()
    if (res.status == 200) {
        alert(obj.msg)
    }
})