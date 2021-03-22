const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchSchools = async searchText => {
const res = await fetch('../data/schools.json');
const schools = await res.json();

let matches= schools.filter(school =>{
    const regex = new RegExp (`^${searchText}`, 'gi');
    return school.name.match(regex) || school.abbr.match(regex);
});

if(searchText.length === 0){
matches = [];
matchList.innerHTML = '';
}

outputHTML(matches);

};

const outputHTML = matches => {
if(matches.length > 0) {
const html = matches.map(match => `
<div class = "card card-body mb-1">
<h4>${match.name} (${match.abbr}) <span class="text-primary">${match.grade}</span></h4>
<small>${match.area} / ${match.suburb}</small>
</div>
`).join('');

matchList.innerHTML = html;

}
}


search.addEventListener('input', () => searchSchools(search.value));

