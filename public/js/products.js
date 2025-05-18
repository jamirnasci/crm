const procurarProdutoBtn = document.getElementById('procurar_btn')
procurarProdutoBtn.addEventListener('click', async () => {
    const res = await fetch('/produtos/procurar', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            produto_procurar: document.getElementById('produto_procurar').value
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
            <td>${item.marca}</td>
            <td>${item.preco}</td>
            <td>${item.quantidade}</td>
            <td><button type="button" data-bs-toggle="modal" data-bs-target="#updateModal" class="btn btn-success w-100" onclick=produtoInfo('produto/detalhes/${item.idproduto}')>Abrir</button></td>
        </tr>
        `
            tbody.innerHTML += el
        })
    } else {
        alert('Produto não encontrado')
    }
})

async function produtoInfo(url){
    const res = await fetch(url, {
        method: 'POST'
    })
    const obj = await res.json()
    document.getElementById('dialog-nome').value = obj.nome
    document.getElementById('dialog-marca').value = obj.marca
    document.getElementById('dialog-preco').value = parseFloat(obj.preco).toFixed(2)
    document.getElementById('dialog-img_url').value = obj.img_url
    document.getElementById('dialog-quantidade').value = obj.quantidade
    document.getElementById('dialog-descricao').value = obj.descricao
    document.getElementById('updateBtn').setAttribute('idproduct', obj.idproduto)
}

const updateBtn = document.getElementById('updateBtn')
updateBtn.addEventListener('click', async (tag)=>{
    const id = updateBtn.getAttribute('idproduct')
    const res = await fetch(`/produto/update/${id}`, {
        method: 'PUT',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            nome: document.getElementById('dialog-nome').value,
            marca: document.getElementById('dialog-marca').value,
            preco: document.getElementById('dialog-preco').value,
            img_url: document.getElementById('dialog-img_url').value,
            quantidade: document.getElementById('dialog-quantidade').value,
            descricao: document.getElementById('dialog-descricao').value
        })
    })
    const obj = await res.json()
    if(res.status == 200){
        alert(obj.msg)
    }
})