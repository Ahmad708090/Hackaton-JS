document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');

    let users = [];
    let todos = [];

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (isUserExist(email)) {
            alert('User already exists!');
            return;
        }

        const uid = generateUID();
        const newUser = { email, password, uid, createdAt: new Date() };
        users.push(newUser);
        saveUsersToLocalStorage();
        alert('Registration successful!');
        registrationForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            alert('Invalid User and Password');
            return;
        }

        alert('Login successful!');
        // You can add further actions like displaying user info after login.
    });

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('todoTitle').value;
        const description = document.getElementById('todoDescription').value;
        const date = document.getElementById('todoDate').value;

        const todoId = generateUID();
        const user_id = getCurrentUser().uid;
        const newTodo = { title, description, date, id: todoId, status: 'pending', createdAt: new Date(), user_id };
        todos.push(newTodo);
        saveTodosToLocalStorage();
        displayTodos();
        todoForm.reset();
    });

    function isUserExist(email) {
        return users.some(user => user.email === email);
    }

    function generateUID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function saveUsersToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function saveTodosToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function getCurrentUser() {
        // For simplicity, this assumes only one user is logged in at a time.
        return users[0];
    }

    function displayTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            todoItem.innerHTML = `<span>Title:</span> ${todo.title}<br>
                                  <span>Description:</span> ${todo.description}<br>
                                  <span>Date:</span> ${todo.date}<br>
                                  <span>Status:</span> ${todo.status}`;
            todoList.appendChild(todoItem);
        });
    }

    // Load users and todos from local storage if available
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    }

    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
        displayTodos();
    }
});
