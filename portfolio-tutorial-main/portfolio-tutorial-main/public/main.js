
function retrieveRepos() {
    const user = 'felipegust'
    const container = document.getElementById("main");

    axios.get(`https://api.github.com/users/${user}/repos`).then((result) => {
        let { data } = result;

        data.forEach(element => {
            container.insertAdjacentHTML("beforeend", `
            <div class="post">
                <img class="postImage" src="https://github.com/${user}/${element.name}/blob/master/foto.jpg?raw=true"" />
                <a class="postLink" href="${element.html_url}">${element.full_name}</a>
            </div>
            `)
        });


    })
}

function showHome() {
    document.getElementById("main").style.display = 'grid';
    document.getElementById("profile").style.display = 'none';
}
function showProfile() {
    document.getElementById("main").style.display = 'none';
    document.getElementById("profile").style.display = 'grid';
}
