const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const form = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const tarefas = []

btnAdicionarTarefa.addEventListener('click', () => {
    form.classList.toggle('hidden')
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
})