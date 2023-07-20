function mkapistr(contestID, handle) {
  let base = `https://codeforces.com/api/contest.standings?contestId=${contestID}&handles=`;
  handle.forEach(ele => {
    base = base + ele + ";"
  });
  return base;
}

async function getContestStandings(contestId, handle, tableDiv, mp) {
  if (handle.length <= 0) return;
  let baseurl = "https://codeforces.com/contest/";
  const apiUrl = mkapistr(contestId, handle);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      const standings = data.result.rows;
      const problems = data.result.problems;
      const id = data.result.contest.id;

      // Create the table HTML
      // Create the table HTML
      let tableHtml = `
        <table>
          <thead>
            <tr>
              <th style="width:2em;" class="top left">#</th>
              <th style="text-align:left;" class="top">Who</th>
              <th style="width:2em;" title="Score" class="top">=</th>
              <th style="width:5em;" title="Hacks" class="top">*</th>
      `;

      // Iterate over each problem and add the score and link to the table header
      problems.forEach((problem) => {
        const problemIndex = problem.index;
        const problemName = problem.name;
        const problemLink = baseurl + id + "/problem/" + problemIndex;
        const problemScore = problem.points || 0;

        // Append table header for each problem
        tableHtml += `
          <th style="width:4em;" class="top">
            <a href="${problemLink}" target="_blank">${problemIndex}</a>
            <br />
            <span class='small' title="Max. Problem Score">${problemScore}</span>
          </th>
        `;
      });


      // Iterate over each participant's standings
      // console.log(standings);
      let givenrank = 0;
      standings.forEach((standing) => {
        const orgrank = givenrank;
        givenrank = givenrank + 1;
        const rank = standing.rank;
        const handleName = mp[standing.party.members[0].handle];
        const totalscore = standing.points;
        // console.log(handleName);
        // Append table row for each participant
        if (givenrank % 2 == 0) itdepands = "contestant-cell";
        else itdepands = "contestant-cell dark";
        tableHtml += `
          <tr>
            <td class='${itdepands}'>${givenrank}&nbsp(${rank})</td>
            <td class='${itdepands}' style = "text-align:left; padding-left:1em;">${handleName}</td>
            <td class='${itdepands}' style="font-weight:bold;">${totalscore}</td>
            <td class='${itdepands}'></td>

        `;

        // Iterate over each problem result in the row
        standing.problemResults.forEach((problemResult) => {
          const problemScore = problemResult.points || 0;
          let time = problemResult.bestSubmissionTimeSeconds || 0;
          let rejected = problemResult.rejectedAttemptCount;
          let type = problemResult.type;
          let hr = Math.floor(time / 3600).toString().padStart(2, '0');
          time = time - 3600 * hr;
          let min = Math.floor(time / 60).toString().padStart(2, '0');
          let disscore = "";
          if (problemScore > 0) disscore = `${problemScore}`;
          if (rejected > 0 && problemScore == 0) disscore = `${-1 * rejected}`
          let display = "";
          if (time > 0) display = `${hr}:${min}`;
          let classforgreen = "";
          if (type == "FINAL" && problemScore > 0) classforgreen = "cell-passed-system-test";
          if (type == "FINAL" && rejected > 0 && problemScore == 0) classforgreen = "cell-rejected";
          // Append table cell for each problem result
          tableHtml += `
            <td class='${itdepands}'>
            <span class="${classforgreen}">${disscore}</span>
            <span class='cell-time'>${display}</span></td>
          `;
        });

        // Close the table row HTML
        tableHtml += `
          </tr>
        `;
      });

      // Close the table body and table HTML
      tableHtml += `
          </tbody>
        </table>
      `;
      tableDiv.innerHTML = tableHtml;
    } else {
      console.log('API request failed:', data.comment);
    }
  } catch (error) {
    console.log('Error occurred:', error);
  }
}

