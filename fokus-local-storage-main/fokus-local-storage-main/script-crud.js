const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const form = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list')
let tarefas = JSON.parse(localStorage.getItem('tarefas'))  || [];

if (!tarefas) {
    console.log("Nenhuma tarefa encontrada no LocalStorage. Definindo como array vazio.");
    tarefas = [];
}

const botaoCancelar = document.querySelector('.app__form-footer__button--cancel');
console.log("Tarefas recuperadas do LocalStorage:", tarefas);
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
let tarefaSelecionada = null
let liTarefaSelecionada = null
let svgSelecionado = null
const botaoRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const botaoRemoverTodasAsTarefas = document.querySelector('#btn-remover-todas')

btnAdicionarTarefa.addEventListener('click', () => {
    form.classList.toggle('hidden')
})

function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))

    
}

function criarElementoTarefa(tarefa) {

    const existente = ulTarefas.querySelector(`li[data-descricao="${tarefa.descricao}"]`);
    if (existente) return existente;

    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>`;

    svg.addEventListener('click', () => {

        if (li.classList.contains('app__section-task-list-item-complete')) {
            li.classList.remove('app__section-task-list-item-complete');
            li.classList.add('app__section-task-list-item-active');
            tarefa.completa = false;
            console.log("Tarefa marcada como incompleta:", tarefa);
            atualizarTarefas();
        } else {
            tarefa.completa = true;
            li.classList.remove('app__section-task-list-item-active');
            li.classList.add('app__section-task-list-item-complete');
            botao.setAttribute('disabled', 'disabled');
            console.log("Tarefa marcada como completa:", tarefa);
            atualizarTarefas();
        }

        if (botao) {
            if (tarefa.completa) {
                botao.setAttribute('disabled' , 'disabled');
            }
            else {
                botao.removeAttribute('disabled');
            }

        }

        
    });

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button'); // Move a criação do botão aqui
    const imagemDoBotao = document.createElement('img');
    botao.classList.add('app_button-edit');
    imagemDoBotao.setAttribute('src', 'imagens/edit.png');
    botao.append(imagemDoBotao);

    botao.onclick = () => {
        const novaDescricao = prompt('Qual é o novo nome da tarefa?');
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    };

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active');
                });
            if (tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            li.classList.add('app__section-task-list-item-active');
        };
    }

    li.append(svg);
    li.append(paragrafo);
    li.append(botao); // Adiciona o botão ao elemento li

    return li;
}



form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value,
        completa: false
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas();
    textArea.value = ''
    form.classList.add('hidden')
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
        tarefaSelecionada.completa = true
        atualizarTarefas();
    }
})


const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas();
}

if (tarefas && tarefas.length > 0) {
    // Adicionando tarefas já existentes ao DOM
    tarefas.forEach(tarefa => {
        console.log("Tarefa a ser adicionada ao DOM:", tarefa);
        const elementoTarefa = criarElementoTarefa(tarefa);
        console.log("Elemento criado para a tarefa:", elementoTarefa);
        ulTarefas.append(elementoTarefa);
    });
} else {
    console.log("Nenhuma tarefa encontrada no LocalStorage.");
}


// Limpar a lista de tarefas antes de adicionar as tarefas do localStorage
ulTarefas.innerHTML = '';

// Adicionando tarefas já existentes ao DOM
tarefas.forEach(tarefa => {
    const existente = ulTarefas.querySelector(`li[data-descricao="${tarefa.descricao}"]`);
    if (!existente) {
        const elementoTarefa = criarElementoTarefa(tarefa);
        ulTarefas.append(elementoTarefa);
    }
});


botaoRemoverConcluidas.onclick = () => removerTarefas(true);
botaoRemoverTodasAsTarefas.onclick = () => removerTarefas(false);
