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

