// tutorials.js - handles saving and displaying tutorials via localStorage
} else if(t.url.includes('vimeo.com')){
// simple embed
mediaWrap.innerHTML = `<iframe src="${t.url.replace('vimeo.com','player.vimeo.com/video')}" frameborder="0" allowfullscreen style="width:100%;height:240px;border-radius:10px"></iframe>`;
} else {
// fallback: link preview
mediaWrap.innerHTML = `<div style="padding:24px;border-radius:10px;background:linear-gradient(180deg,#fff,#fffaf6);text-align:center;border:1px solid rgba(225,202,255,0.5)">🔗 <a href="${t.url}" target="_blank">Open video</a></div>`;
}


card.appendChild(mediaWrap);
const title = document.createElement('h4'); title.textContent = t.title; title.style.margin='10px 0 6px'; title.style.color='var(--purple-2)';
const desc = document.createElement('p'); desc.textContent = t.desc || '';
const info = document.createElement('p'); info.className='small'; info.textContent = `Added: ${new Date(t.created).toLocaleString()}`;


card.appendChild(title); card.appendChild(desc); card.appendChild(info);
container.appendChild(card);
document.addEventListener('DOMContentLoaded', ()=>{
const btn = $('#addTutorialBtn');
if(!btn) return;
render();
btn.addEventListener('click', ()=>{
const title = $('#tTitle').value.trim();
const url = $('#tUrl').value.trim();
const desc = $('#tDesc').value.trim();
if(!title || !url){ alert('Please add both title and URL for the tutorial.'); return; }
const list = loadTutorials();
list.push({id:Date.now(),title, url, desc, created: new Date().toISOString()});
saveTutorials(list);
$('#tTitle').value=''; $('#tUrl').value=''; $('#tDesc').value='';
render();
});
});