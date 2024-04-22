const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const form = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list')
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const botaoCancelar = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
let tarefaSelecionada = null
let liTarefaSelecionada = null

btnAdicionarTarefa.addEventListener('click', () => {
    form.classList.toggle('hidden')
})

function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa (tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item')
    
    const svg = document.createElement('svg');
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24"      height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>`

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button');
    const imagemDoBotao = document.createElement('img');
    botao.classList.add('app_button-edit')
    imagemDoBotao.setAttribute('src', 'imagens/edit.png');
    botao.append(imagemDoBotao)

    botao.onclick = () => {
        //debugger linha utilizada para debugar o que queremos criar, podendo passar linha a linha para entender o problema.
        const novaDescricao = prompt('Qual é o novo nome da tarefa?');
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas();        
        }

    }

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active')
        })
        if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            liTarefaSelecionada = null
            return
        }
        tarefaSelecionada = tarefa
        liTarefaSelecionada = li
        paragrafoDescricaoTarefa.textContent = tarefa.descricao       

        li.classList.add('app__section-task-list-item-active');
        
    }

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    return li

}

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas();
    textArea.value = ''
    form.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
})

botaoCancelar.addEventListener('click', () =>{
    textArea.value = '';
    form.classList.toggle('hidden');
})

document.addEventListener('focoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
    }
})