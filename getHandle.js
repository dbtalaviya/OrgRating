async function getHandle(after) {
    let baseurl = "https://codeforces.com";
    // const searchText = 'Jiangly Fan Club';

    try {
        const response = await fetch(baseurl + after);
        const data = await response.text();

        const tempElement = document.createElement('div');
        tempElement.innerHTML = data;

        const ratingDataTable = tempElement.querySelector('.ratingsDatatable');
        const linkElements = ratingDataTable.querySelectorAll('a');
        let handels = [], handlelinks = [];
        for (let i = 0; i < linkElements.length; i++) {
            if (linkElements[i].href.includes('profile')) {
                let tdElement = linkElements[i].closest('td');

                handels.push(linkElements[i].textContent);
                handlelinks.push(tdElement.innerHTML);
            }
        }
        return [handels, handlelinks];
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
