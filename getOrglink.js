// Call the function to initiate the data retrieval process
// getData();

async function getData(searchText) {
    const targetURL = 'https://codeforces.com/ratings/organizations';
    // const searchText = 'Jiangly Fan Club';

    try {
        const response = await fetch(targetURL);
        const data = await response.text();

        const tempElement = document.createElement('div');
        tempElement.innerHTML = data;

        const linkElements = tempElement.getElementsByTagName('a');

        let link;
        let cd = false;
        let handles = []
        let handleswithfulllink = []
        for (let i = 0; i < linkElements.length; i++) {
            if (linkElements[i].textContent.includes(searchText)) {
                link = linkElements[i].getAttribute('href');
                if (link.includes('ratings')) {

                    const [hndl, lnk] = await getHandle(link);
                    for (let i = 0; i < hndl.length; i++) {
                        handles.push(hndl[i]);
                        handleswithfulllink.push(lnk[i]);
                    }
                    // console.log("Link:", link);
                    cd = true;
                }
            }
        }
        return [handles, handleswithfulllink];
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
