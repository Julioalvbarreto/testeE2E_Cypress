describe("Carregamento da aplicação pela primeira vez e testes e2e",() => {

    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/index.html")
    })

    it("Deve ser possivel carregar a aplicação", () =>{
        cy.get('h1').should("have.text", "O que fazer hoje?")
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 0")
    }),

    it("Deve ser possivel cadastra uma nova tarefa", () =>{
        cy.get('#todo_title').click().type("Comprar pão")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 1")
    })

    it("Deve ser possivel visualizar a data de cadastramento de uma tarefa", () =>{
        cy.get('#todo_title').click().type("Comprar pão")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('[x-text="getFormatedDate(todo.createdAt)"]').should('exist')

    })

    it("Não deve ser possivel cadastrar uma tarefa com o formulario em branco", () =>{
        cy.get('#todo_title').click()
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.on('window:alert',(a)=>{
            expect(a).to.contains('Digite um título para a tarefa!')})
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 0")

    })

    it("Deve ser possivel o cadastro de uma tarefa contendo somente um caracter", () =>{
        cy.get('#todo_title').click().type("a")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 1")

    })

    it("Deve exibir um alert ao clicar em excluir uma tarefa previamente cadastrada", () =>{
        cy.get('#todo_title').click().type("a")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('.text-end > .btn').click()
        cy.on('window:alert',(a)=>{
            expect(a).to.contains('Tem certeza que deseja remover?')})

    })

    it("Deve ser possivel excluir a tarefa previamente cadastrada", () =>{
        cy.get('#todo_title').click().type("a")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('.text-end > .btn').click()
        cy.on('window:alert',(a)=>{
            expect(a).to.contains('Tem certeza que deseja remover?')})
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 0")
    })

    it("Deve ser possivel marcar a tarefa previamente cadastrada como concluida exibindo o texto tachado", () =>{
        cy.get('#todo_title').click().type("a")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('.form-check-input').click()
        cy.get('.pt-3 > .col-auto > .btn').select('Concluídos')
        cy.get('[x-text="todo.task"]').should('exist')
    })

    it("Deve exibir somente tarefas concluidas ao selecionar o filtro Concluídas", () =>{
        cy.get('#todo_title').click().type("a")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('#todo_title').click().type("b")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get(':nth-child(2) > :nth-child(1) > .form-check-input').click()
        cy.get('.pt-3 > .col-auto > .btn').select('Concluídos')
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 1")
    })

    it("Deve exibir somente tarefas em aberto ao selecionar o filtro Em aberto", () =>{
        cy.get('#todo_title').click().type("a")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('#todo_title').click().type("b")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get(':nth-child(2) > :nth-child(1) > .form-check-input').click()
        cy.get('.pt-3 > .col-auto > .btn').select('Em aberto')
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 1")
    })

    it("Deve exibir todas as tarefas seja em aberto e finalizadas ao selecionar o filtro Todas", () =>{
        cy.get('#todo_title').click().type("a")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('#todo_title').click().type("b")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get(':nth-child(2) > :nth-child(1) > .form-check-input').click()
        cy.get('.pt-3 > .col-auto > .btn').select('Todos')
        cy.get('.mb-3').should("have.text", "Tarefas cadastradas: 2")
    })

    it("Deve se possivel desmarcar uma tarefa marcada como concluida para que retorne em aberto", () =>{
        cy.get('#todo_title').click().type("a")
        cy.get('.bg-white > .col-auto > .btn').click()
        cy.get('.form-check-input').click()
        cy.get('.pt-3 > .col-auto > .btn').select('Concluídos')
        cy.get('.form-check-input').click()
        cy.get('.pt-3 > .col-auto > .btn').select('Em aberto')
    })

    

})