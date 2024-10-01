document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = document.getElementById('search').value;
        searchUsers(searchTerm);
    });

    function searchUsers(username) {
        fetch(`https://api.github.com/search/users?q=${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => console.error('Error fetching users:', error));
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        reposList.innerHTML = '';

        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${user.login}</h3>
                <img src="${user.avatar_url}" alt="${user.login}'s avatar" width="50" />
                <a href="${user.html_url}" target="_blank">View Profile</a>
            `;
            li.addEventListener('click', () => {
                fetchUserRepos(user.login);
            });
            userList.appendChild(li);
        });
    }

    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayRepos(data);
        })
        .catch(error => console.error('Error fetching repos:', error));
    }

    function displayRepos(repos) {
        reposList.innerHTML = '';

        repos.forEach(repo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h4>${repo.name}</h4>
                <p>${repo.description || 'No description available'}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;
            reposList.appendChild(li);
        });
    }
});
