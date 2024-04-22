botao = document.querySelector('.classe__do__botao');
formulário = document.querySelector('.classe__do__formulario')
var tarefas = []

botao.addEventListener('click', (evento) => {
    formulário.classList.toggle('hidden');
)}

formulário.addEventListener('submit', () => {
    tarefa = {
        descricaoDaTarefa: textArea.value
    }
    tarefas.push(tarefas)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
})

botao.onclick = () => {
    //debugger linha utilizada para debugar o que queremos criar, podendo passar linha a linha para entender o problema.
    const novaDescricao = prompt('Qual é o novo nome da tarefa?');
    if (novaDescricao) {
        paragrafo.textContent = novaDescricao
        tarefa.descricao = novaDescricao
        atualizarTarefas();        
    }

}

function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

elemento-lista.onclick = () => { //ao clicar em um elemento da lista, faça
    document.querySelectorAll('.classe-ativo') //selecionando todos os elementos que tem a classe ativo, ou seja, que tem um destaque por estarem selecionados 
    paragrafoEmAndamento.textArea = descricaoDaTarefa
    .forEach(elemento => { //Removendo a classe ativa de todos os itens
        elemento.classList.remove('app__section-task-list-item-active')
    })
    if (tarefaSelecionada == tarefa) { //verificando se a tarefa selecionada foi clicada novamente, caso sim, ele remove o texto da LI e também a classe que destaca o elemento
        paragrafoDescricaoTarefa.textContent = ''
        tarefaSelecionada = null
        liTarefaSelecionada = null
        return
    }

    tarefaSelecionada = tarefa //tornando a tarefaSelecionada como a tarefa clicada (de acordo com o clique)
    liTarefaSelecionada = li //tornando a li Selecionada como a li clicada clicada (de acordo com o clique)
    paragrafoDescricaoTarefa.textContent = tarefa.descricao // tornando o parágrafo de acordo com a tarefa em questão       


}

li.classList.add('app__section-task-list-item-active'); // adicionando a classe ativa para o que está clicado

let eventoAtivo = html.getAttribute('data-contexto') == 'foco'
if (eventoAtivo) {
    const evento = new CustomEvent('focoFinalizado');
    document.dispatchEvent(evento); 
}

document.addEventListener('focoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
    }
})