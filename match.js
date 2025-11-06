// match.js - handles saving users and matchmaking logic using localStorage
const form = $('#matchForm');
const results = $('#matchResults');


if(saveBtn){
saveBtn.addEventListener('click', ()=>{
const name = $('#uName').value.trim();
const teach = $('#uTeach').value.trim();
const learn = $('#uLearn').value.trim();
if(!name || !teach || !learn){ alert('Please complete all fields.'); return; }
const list = load();
const me = { id: Date.now().toString(), name, teach, learn, created: new Date().toISOString() };
list.push(me); save(list);
renderCommunity();
$('#uName').value=''; $('#uTeach').value=''; $('#uLearn').value='';


// find matches
const perfect = findPerfectMatches(me, list);
const partial = findPartialMatches(me, list).filter(p=>!perfect.includes(p));


results.innerHTML = '';
const header = document.createElement('div'); header.innerHTML = `<h4>Search results for <strong>${escapeHtml(name)}</strong></h4>`; results.appendChild(header);


if(perfect.length){
const pBox = document.createElement('div'); pBox.className='card'; pBox.style.margin='12px 0';
pBox.innerHTML = `<strong>Perfect match(es)! 🎉</strong><div class="small">Someone who wants to learn what you teach and can teach what you want.</div>`;
perfect.forEach(u=>{
const el = document.createElement('div'); el.className='community-item';
el.innerHTML = `<strong>${escapeHtml(u.name)}</strong> — teaches <em>${escapeHtml(u.teach)}</em>, wants <em>${escapeHtml(u.learn)}</em>`;
pBox.appendChild(el);
});
results.appendChild(pBox);
} else {
const no = document.createElement('p'); no.className='small'; no.textContent = 'No perfect matches found yet. Try checking partial matches or ask classmates to join!';
results.appendChild(no);
}


if(partial.length){
const sBox = document.createElement('div'); sBox.className='card'; sBox.style.margin='12px 0';
sBox.innerHTML = `<strong>Suggested matches</strong><div class="small">These users have a one-way match (they can teach or want to learn one of your skills).</div>`;
partial.forEach(u=>{
const el = document.createElement('div'); el.className='community-item';
el.innerHTML = `<strong>${escapeHtml(u.name)}</strong> — teaches <em>${escapeHtml(u.teach)}</em>, wants <em>${escapeHtml(u.learn)}</em>`;
sBox.appendChild(el);
});
results.appendChild(sBox);
}


});
}


if(clearBtn){
clearBtn.addEventListener('click', ()=>{
if(confirm('Clear all local SkillSwap data? This will remove users and tutorials saved in this browser.')){
localStorage.removeItem('skillswap_users_v1');
localStorage.removeItem('skillswap_tutorials');
renderCommunity();
if($('#tutorialList')) $('#tutorialList').innerHTML = '<p class="small">No tutorials yet — be the first to add one! 🌷</p>';
if($('#matchResults')) $('#matchResults').innerHTML='';
}
});
}