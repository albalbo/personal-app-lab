// UI rendering, progress calculations, grade calculations, and form actions.
function taskKey(wn,si,ti){return`w${wn}_${si}_${ti}`}

function toggleTask(wn,si,ti){
  const k=taskKey(wn,si,ti);
  STATE.tasks[k]=!STATE.tasks[k];
  const cb=document.getElementById('cb_'+k);
  const tx=document.getElementById('tx_'+k);
  if(cb)cb.classList.toggle('checked',!!STATE.tasks[k]);
  if(tx)tx.classList.toggle('done',!!STATE.tasks[k]);
  refreshWeekProgress(wn);
  refreshDashboard();
  saveState();
}

function refreshWeekProgress(wnum){
  const w=WEEKS.find(x=>x.num===wnum);
  if(!w)return;
  let all=0,done=0;
  w.sections.forEach((sec,si)=>sec.tasks.forEach((_,ti)=>{all++;if(STATE.tasks[taskKey(wnum,si,ti)])done++;}));
  const pct=all?Math.round((done/all)*100):0;
  const mb=document.getElementById('mb_'+wnum);
  const wp=document.getElementById('wp_'+wnum);
  if(mb){mb.style.width=pct+'%';mb.style.background=pct===100?'#3B6D11':'#7F77DD';}
  if(wp)wp.textContent=pct+'%';
}

function refreshDashboard(){
  let allT=0,doneT=0;
  WEEKS.forEach(w=>w.sections.forEach((sec,si)=>sec.tasks.forEach((_,ti)=>{allT++;if(STATE.tasks[taskKey(w.num,si,ti)])doneT++;})));
  const pct=allT?Math.round((doneT/allT)*100):0;
  const el=document.getElementById('d-tasks');
  const bar=document.getElementById('d-tbar');
  if(el)el.textContent=doneT+'/'+allT;
  if(bar)bar.style.width=pct+'%';
  const ll=document.getElementById('d-logs');
  if(ll)ll.textContent=STATE.logs.length;
  renderOverview();
  updateGradeDash();
}

function renderOverview(){
  const el=document.getElementById('d-overview');
  if(!el)return;
  el.innerHTML='';
  WEEKS.forEach(w=>{
    let all=0,done=0;
    w.sections.forEach((sec,si)=>sec.tasks.forEach((_,ti)=>{all++;if(STATE.tasks[taskKey(w.num,si,ti)])done++;}));
    const pct=all?Math.round((done/all)*100):0;
    const div=document.createElement('div');
    div.style.cssText='display:grid;grid-template-columns:72px 1fr 36px;gap:6px;align-items:center;margin-bottom:4px';
    div.innerHTML=`<span style="font-size:11px;color:var(--color-text-secondary)">Wk ${w.num} · ${w.date}</span><div class="progress-bar" style="height:5px;margin-top:0"><div class="pb-fill" style="width:${pct}%;background:${pct===100?'#3B6D11':pct>0?'#7F77DD':'var(--color-border-tertiary)'}"></div></div><span style="font-size:11px;color:var(--color-text-tertiary);text-align:right">${pct}%</span>`;
    el.appendChild(div);
  });
}

function renderDeadlines(){
  const el=document.getElementById('d-deadlines');
  if(!el)return;
  const all=[];
  WEEKS.forEach(w=>w.deadlines.forEach(d=>all.push({wn:w.num,t:d.t,due:d.due,cls:d.cls})));
  el.innerHTML=all.slice(0,6).map(d=>`<div style="display:flex;gap:8px;align-items:center;font-size:12px;margin-bottom:4px"><span class="dl-badge ${d.cls}">Wk ${d.wn}</span><span style="flex:1;color:var(--color-text-primary)">${d.t}</span><span style="color:var(--color-text-tertiary);white-space:nowrap">${d.due}</span></div>`).join('');
}

function renderWeeks(){
  const acc=document.getElementById('weekAcc');
  if(!acc)return;
  acc.innerHTML='';
  const catColors={arc:'#7F77DD',lab:'#3B6D11',exam:'#D85A30',part:'#993556',tip:'#854F0B'};
  WEEKS.forEach((w,wi)=>{
    let all=0,done=0;
    w.sections.forEach((sec,si)=>sec.tasks.forEach((_,ti)=>{all++;if(STATE.tasks[taskKey(w.num,si,ti)])done++;}));
    const pct=all?Math.round((done/all)*100):0;
    const dlHtml=w.deadlines.map(d=>`<span class="dl-badge ${d.cls}">${d.t} · ${d.due}</span>`).join('');
    const secHtml=w.sections.map((sec,si)=>{
      const cc=catColors[sec.cat]||'#888';
      return`<div style="margin-bottom:6px">
        <div class="sec-lbl" style="color:${cc}">${sec.label}</div>
        ${sec.tasks.map((t,ti)=>{
          const k=taskKey(w.num,si,ti);
          const chk=!!STATE.tasks[k];
          return`<div class="task-item" onclick="toggleTask(${w.num},${si},${ti})">
            <div class="task-cb${chk?' checked':''}" id="cb_${k}" role="checkbox" aria-checked="${chk}"></div>
            <span class="cat-dot cd-${sec.cat}"></span>
            <span class="task-text${chk?' done':''}" id="tx_${k}">${t}</span>
          </div>`;
        }).join('')}
      </div>`;
    }).join('');
    const el=document.createElement('div');
    el.className='wacc';
    el.innerHTML=`
      <div class="wacc-hd" onclick="toggleAcc(${wi})">
        <div class="wacc-side" style="background:${w.sideBg}">
          <span class="ws-n">week ${w.num}</span>
          <span class="ws-d">${w.date}</span>
        </div>
        <div class="wacc-main">
          <div class="wm-row">
            <span class="wm-title">${w.title}</span>
            <div class="wm-right">
              <div class="mini-bar"><div class="mb-fill" id="mb_${w.num}" style="width:${pct}%;background:${pct===100?'#3B6D11':'#7F77DD'}"></div></div>
              <span class="wpct" id="wp_${w.num}">${pct}%</span>
              <i class="ti ti-chevron-down wchev" id="wchev${wi}" aria-hidden="true"></i>
            </div>
          </div>
          <div class="dl-row">${dlHtml}</div>
        </div>
      </div>
      <div class="wacc-body" id="wbody${wi}">${secHtml}</div>`;
    acc.appendChild(el);
  });
}

function toggleAcc(i){
  const b=document.getElementById('wbody'+i);
  const c=document.getElementById('wchev'+i);
  if(!b)return;
  const open=b.classList.contains('open');
  b.classList.toggle('open',!open);
  c.classList.toggle('open',!open);
}

function renderGrades(){
  const el=document.getElementById('scoreGrid');
  if(!el)return;
  el.innerHTML='';
  GRADE_ITEMS.forEach(g=>{
    const val=STATE.grades[g.id]||'';
    const safeVal=escapeHtml(val);
    const rawPct=parseFloat(val);
    const pctText=!isNaN(rawPct)&&val!==''?`<span style="font-size:11px;color:#3B6D11;margin-left:4px">${Math.round((rawPct/g.max)*100)}%</span>`:'';
    const div=document.createElement('div');
    div.className='score-row';
    div.innerHTML=`
      <div class="sc-top"><span class="sc-name">${g.name}</span><span class="sc-wt">${g.weight}% weight</span></div>
      <div class="sc-row">
        <span style="font-size:11px;color:var(--color-text-secondary)">Score:</span>
        <input class="sc-input" type="number" min="0" max="${g.max}" step="0.5" value="${safeVal}" placeholder="—" oninput="saveGrade('${g.id}',this.value)">
        <span style="font-size:11px;color:var(--color-text-tertiary)">/ ${g.max}</span>
        ${pctText}
      </div>`;
    el.appendChild(div);
  });
  updateGradeCalc();
}

function saveGrade(id,val){
  STATE.grades[id]=val;
  updateGradeCalc();
  updateGradeDash();
  saveState();
}

function updateGradeCalc(){
  let totalW=0,totalPts=0;
  GRADE_ITEMS.forEach(g=>{
    const raw=parseFloat(STATE.grades[g.id]);
    if(!isNaN(raw)&&STATE.grades[g.id]!==''){
      totalPts+=(raw/g.max)*100*g.weight;totalW+=g.weight;
    }
  });
  const avg=totalW?(Math.round((totalPts/totalW)*10)/10):null;
  const pe=document.getElementById('gb-pct');
  const le=document.getElementById('gb-letter');
  const be=document.getElementById('gb-bar');
  if(pe)pe.textContent=avg!==null?avg.toFixed(1)+'%':'—';
  if(le&&avg!==null){
    const lt=avg>=90?'A':avg>=80?'B':avg>=70?'C':avg>=60?'D':'F';
    const lc=avg>=90?'#3B6D11':avg>=80?'#185FA5':avg>=70?'#854F0B':'#A32D2D';
    le.textContent=lt;le.style.color=lc;
  }else if(le){le.textContent='—';le.style.color='var(--color-text-secondary)';}
  if(be)be.style.width=avg?Math.min(100,Math.round((avg/90)*100))+'%':'0%';
}

function updateGradeDash(){
  let totalW=0,totalPts=0;
  GRADE_ITEMS.forEach(g=>{
    const raw=parseFloat(STATE.grades[g.id]);
    if(!isNaN(raw)&&STATE.grades[g.id]!==''){totalPts+=(raw/g.max)*100*g.weight;totalW+=g.weight;}
  });
  const el=document.getElementById('d-grade');
  if(el)el.textContent=totalW?(Math.round((totalPts/totalW)*10)/10)+'%':'—';
}

function saveLog(){
  const entry={
    id:Date.now(),
    date:document.getElementById('lg-date').value,
    changed:document.getElementById('lg-changed').value.trim(),
    improved:document.getElementById('lg-improved').value.trim(),
    failing:document.getElementById('lg-failing').value.trim(),
    why:document.getElementById('lg-why').value.trim(),
    score:document.getElementById('lg-score').value.trim()
  };
  if(!entry.date&&!entry.changed)return;
  STATE.logs.unshift(entry);
  ['lg-date','lg-changed','lg-improved','lg-failing','lg-why','lg-score'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  renderArcLog();
  refreshDashboard();
  saveState();
}

function deleteLog(id){
  STATE.logs=STATE.logs.filter(l=>l.id!==id);
  renderArcLog();
  refreshDashboard();
  saveState();
}

function renderArcLog(){
  const el=document.getElementById('arcLogList');
  if(!el)return;
  if(!STATE.logs.length){el.innerHTML='<div class="empty-state">No sessions logged yet. Write your first entry above after your first ARC coding session.</div>';return;}
  el.innerHTML=STATE.logs.map(l=>`
    <div class="log-entry">
      <div class="log-hd">
        <span class="log-date-lbl">${escapeHtml(l.date||'No date')}${l.score?' · '+escapeHtml(l.score):''}</span>
        <button class="log-del" onclick="deleteLog(${l.id})">Delete</button>
      </div>
      <div class="log-fields">
        ${l.changed?`<div class="lf full"><div class="lf-lbl">What I changed</div><div class="lf-val">${escapeHtml(l.changed)}</div></div>`:''}
        ${l.improved?`<div class="lf"><div class="lf-lbl">Problems improved</div><div class="lf-val">${escapeHtml(l.improved)}</div></div>`:''}
        ${l.failing?`<div class="lf"><div class="lf-lbl">Still failing</div><div class="lf-val">${escapeHtml(l.failing)}</div></div>`:''}
        ${l.why?`<div class="lf full"><div class="lf-lbl">Why it fails</div><div class="lf-val">${escapeHtml(l.why)}</div></div>`:''}
      </div>
    </div>`).join('');
}

function saveWeeklyCard(){
  const card={
    saved:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
    dl:document.getElementById('wc-dl').value,
    must:document.getElementById('wc-must').value,
    nice:document.getElementById('wc-nice').value,
    arc:document.getElementById('wc-arc').value,
    lec:document.getElementById('wc-lec').value,
    part:document.getElementById('wc-part').value,
    career:document.getElementById('wc-career').value,
    notes:document.getElementById('wc-notes').value
  };
  STATE.cards.unshift(card);
  STATE.cards=STATE.cards.slice(0,12);
  const sv=document.getElementById('wc-saved');
  if(sv){sv.style.display='block';setTimeout(()=>sv.style.display='none',2000);}
  renderPrevCards();
  saveState();
}

function clearWeeklyCard(){
  ['wc-dl','wc-must','wc-nice','wc-arc','wc-lec','wc-part','wc-career','wc-notes'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
}

function renderPrevCards(){
  const el=document.getElementById('prev-cards');
  if(!el)return;
  if(!STATE.cards.length){el.innerHTML='<div class="empty-state">No saved cards yet. Fill in this week\'s card above.</div>';return;}
  el.innerHTML=STATE.cards.map(c=>`
    <div class="prev-card">
      <div style="font-size:11px;font-weight:500;color:var(--color-text-secondary);margin-bottom:5px">${escapeHtml(c.saved)}</div>
      ${c.dl?`<div style="font-size:12px;margin-bottom:2px"><span style="color:var(--color-text-tertiary)">Deadline: </span>${escapeHtml(c.dl)}</div>`:''}
      ${c.must?`<div style="font-size:12px;margin-bottom:2px"><span style="color:var(--color-text-tertiary)">Must: </span>${escapeHtml(c.must)}</div>`:''}
      ${c.arc?`<div style="font-size:12px;margin-bottom:2px"><span style="color:var(--color-text-tertiary)">ARC target: </span>${escapeHtml(c.arc)}</div>`:''}
      ${c.career?`<div style="font-size:12px"><span style="color:var(--color-text-tertiary)">Career blocks: </span>${escapeHtml(c.career)}</div>`:''}
    </div>`).join('');
}

function setCurrentWeek(){
  const start=new Date('2026-05-18');
  const now=new Date();
  const wk=Math.min(12,Math.max(1,Math.floor((now-start)/(7*24*3600*1000))+1));
  const el=document.getElementById('d-week');
  if(el)el.textContent='Wk '+wk;
}

function renderAll(){
  renderWeeks();
  renderGrades();
  renderArcLog();
  renderPrevCards();
  renderDeadlines();
  renderOverview();
  refreshDashboard();
  setCurrentWeek();
}

function goTab(el,id){
  document.querySelectorAll('.ntab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.pane').forEach(p=>p.classList.remove('on'));
  el.classList.add('on');
  document.getElementById(id).classList.add('on');
}

loadState();
