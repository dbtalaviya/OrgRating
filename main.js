let url = window.location.toString();

async function search() {
    let searchQuery = document.getElementById('searchInput').value;
    const [hndl, lnk] = await getData(searchQuery);
    let stnd = document.querySelector('.standings');
    let cururl = document.geturl
    let mp = {};
    for (let i = 0; i < hndl.length; i++) {
        mp[hndl[i]] = lnk[i];
    }
    let contest = url.match(/\d\d\d\d/);
    getContestStandings(contest, hndl, stnd, mp);
}

function createSearchBar() {
    let already = document.querySelector(".searchbox")
    if (already) return;
    let searchInput = document.createElement('input');
    searchInput.setAttribute('class', 'searchbox');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('id', 'searchInput');
    searchInput.setAttribute('placeholder', 'Enter Organization');
    searchInput.style.width = '200px'; // Adjust the width as desired
    searchInput.style.height = '30px'; // Adjust the height as desired

    let searchButton = document.createElement('button');
    searchButton.innerHTML = 'Search';
    searchButton.addEventListener('click', search);
    searchButton.style.margin = '2rem';
    searchButton.style.width = '80px'; // Adjust the width as desired
    searchButton.style.height = '30px'; // Adjust the height as desired

    let searchBarContainer = document.createElement('div');
    searchBarContainer.appendChild(searchInput);
    searchBarContainer.appendChild(searchButton);

    let targetElement = document.querySelector('.contest-name');
    targetElement.appendChild(searchBarContainer);
}


function justremove() {
    // let stnd = document.querySelector('.standings');
    // try {
    //     stnd.remove();
    // } catch (error) {

    // }
    let datatable = document.querySelector('.datatable');
    let newdiv = document.createElement('div');
    createSearchBar();
    // newdiv.innerHTML = "I am darshak talaviya";
    // datatable.appendChild(newdiv);
}

if (url.includes('/standings')) { // Replace 1844 with the desired contest ID
    let secondLevelMenu = document.querySelector('.second-level-menu-list');
    let listItem = document.createElement('li');
    let link = document.createElement('a');
    link.style.cursor = "pointer";
    link.innerHTML = 'Org standings'; // Replace Your Button Text with the desired text for the button
    link.onclick = justremove;
    let messageDiv = document.createElement('div');
    listItem.appendChild(link);
    secondLevelMenu.appendChild(listItem);
}
