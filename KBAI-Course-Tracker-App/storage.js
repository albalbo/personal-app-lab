// Persistent state and file backup helpers.
// The UI talks to this layer through STATE, loadState(), and saveState().
let STATE={tasks:{},logs:[],grades:{},cards:[]};
let STORAGE={fileHandle:null,fileName:''};
let saveTimer=null;
let fileSaveInProgress=false;
let pendingFileSave=false;
let rememberedFileNeedsReconnect=false;

function blankState(){return{tasks:{},logs:[],grades:{},cards:[]};}

function normalizeState(raw){
  const src=raw&&typeof raw==='object'?raw:{};
  const tasks={};
  Object.keys(src.tasks&&typeof src.tasks==='object'&&!Array.isArray(src.tasks)?src.tasks:{}).forEach(k=>{tasks[k]=!!src.tasks[k];});
  const grades={};
  Object.keys(src.grades&&typeof src.grades==='object'&&!Array.isArray(src.grades)?src.grades:{}).forEach(k=>{grades[k]=String(src.grades[k]);});
  const logs=Array.isArray(src.logs)?src.logs.filter(l=>l&&typeof l==='object').map((l,i)=>({
    id:Number.isFinite(Number(l.id))?Number(l.id):Date.now()+i,
    date:String(l.date||''),
    changed:String(l.changed||''),
    improved:String(l.improved||''),
    failing:String(l.failing||''),
    why:String(l.why||''),
    score:String(l.score||'')
  })):[];
  const cards=Array.isArray(src.cards)?src.cards.filter(c=>c&&typeof c==='object').map(c=>({
    saved:String(c.saved||''),
    dl:String(c.dl||''),
    must:String(c.must||''),
    nice:String(c.nice||''),
    arc:String(c.arc||''),
    lec:String(c.lec||''),
    part:String(c.part||''),
    career:String(c.career||''),
    notes:String(c.notes||'')
  })):[];
  return {
    tasks:tasks,
    logs:logs,
    grades:grades,
    cards:cards
  };
}

function escapeHtml(value){
  return String(value==null?'':value).replace(/[&<>"']/g,ch=>({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[ch]));
}

function trackerPayload(){
  return {
    app:'kbai-progress-tracker',
    version:1,
    savedAt:new Date().toISOString(),
    state:normalizeState(STATE)
  };
}

function stateFromPayload(payload){
  if(payload&&payload.app==='kbai-progress-tracker'&&payload.state)return normalizeState(payload.state);
  return normalizeState(payload);
}

function stateToJson(){
  return JSON.stringify(trackerPayload(),null,2);
}

function hasAnyState(state){
  return Object.keys(state.tasks||{}).length>0||
    Object.keys(state.grades||{}).length>0||
    (state.logs||[]).length>0||
    (state.cards||[]).length>0;
}

function setSaveStatus(text,clearAfter){
  const st=document.getElementById('save-status');
  if(!st)return;
  st.textContent=text;
  if(clearAfter)setTimeout(()=>{if(st.textContent===text)st.textContent='';},clearAfter);
}

function setStorageStatus(text,isError){
  const st=document.getElementById('storage-status');
  if(!st)return;
  st.textContent=text;
  st.style.color=isError?'#A32D2D':'var(--color-text-tertiary)';
}

function updateStorageStatus(extra){
  const base=STORAGE.fileHandle
    ? `Connected to ${STORAGE.fileName}. Changes auto-save to that JSON file.`
    : 'Using browser cache until you create or connect a data file.';
  setStorageStatus(extra?`${base} ${extra}`:base,false);
}

function storageSupported(){
  return !!(window.showOpenFilePicker&&window.showSaveFilePicker);
}

function openTrackerDb(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open('kbai-progress-tracker-db',1);
    req.onupgradeneeded=()=>req.result.createObjectStore('settings');
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}

async function idbGet(key){
  if(!window.indexedDB)return null;
  const db=await openTrackerDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction('settings','readonly');
    const req=tx.objectStore('settings').get(key);
    req.onsuccess=()=>resolve(req.result||null);
    req.onerror=()=>reject(req.error);
    tx.oncomplete=()=>db.close();
  });
}

async function idbSet(key,value){
  if(!window.indexedDB)return;
  const db=await openTrackerDb();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction('settings','readwrite');
    tx.objectStore('settings').put(value,key);
    tx.oncomplete=()=>{db.close();resolve();};
    tx.onerror=()=>reject(tx.error);
  });
}

async function requestFilePermission(handle,mode){
  const opts={mode};
  if((await handle.queryPermission(opts))==='granted')return true;
  return (await handle.requestPermission(opts))==='granted';
}

async function readStateFromHandle(handle){
  const file=await handle.getFile();
  const text=await file.text();
  if(!text.trim())return blankState();
  return stateFromPayload(JSON.parse(text));
}

async function rememberFileHandle(handle){
  STORAGE.fileHandle=handle;
  STORAGE.fileName=handle.name||'selected file';
  rememberedFileNeedsReconnect=false;
  try{await idbSet('fileHandle',handle);}catch(e){console.warn('Could not remember data file handle:',e);}
  updateStorageStatus();
}

async function loadState(){
  try{
    const saved=localStorage.getItem('kbai_state');
    if(saved)STATE=normalizeState(JSON.parse(saved));
  }catch(e){
    console.warn('Could not load saved KBAI tracker state:', e);
  }

  if(storageSupported()){
    try{
      const handle=await idbGet('fileHandle');
      if(handle&&(await handle.queryPermission({mode:'readwrite'}))==='granted'){
        STORAGE.fileHandle=handle;
        STORAGE.fileName=handle.name||'selected file';
        STATE=await readStateFromHandle(handle);
        cacheState();
      }else if(handle){
        STORAGE.fileName=handle.name||'selected file';
        rememberedFileNeedsReconnect=true;
      }
    }catch(e){
      console.warn('Could not auto-load KBAI data file:', e);
    }
  }

  const ld=document.getElementById('d-loading');
  if(ld)ld.style.display='none';
  renderAll();
  updateStorageStatus(storageSupported()
    ? (rememberedFileNeedsReconnect?`Previously connected ${STORAGE.fileName} needs permission again. Click Connect file to resume file auto-save.`:'')
    : 'This browser needs import/export backups because file auto-save is unavailable.');
}

function cacheState(){
  try{
    localStorage.setItem('kbai_state', JSON.stringify(STATE));
  }catch(e){
    console.warn('Could not cache KBAI tracker state:', e);
  }
}

function saveState(){
  cacheState();
  if(STORAGE.fileHandle){
    setSaveStatus('Saving to data file...');
    queueFileSave();
  }else{
    setSaveStatus('Saved in browser cache. Create/connect a data file for durable storage.',2500);
  }
}

function queueFileSave(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>writeConnectedFile(),250);
}

async function writeConnectedFile(){
  if(!STORAGE.fileHandle)return;
  if(fileSaveInProgress){
    pendingFileSave=true;
    return;
  }
  fileSaveInProgress=true;
  pendingFileSave=false;
  try{
    if(!(await requestFilePermission(STORAGE.fileHandle,'readwrite'))){
      throw new Error('Permission to write the data file was denied.');
    }
    const writable=await STORAGE.fileHandle.createWritable();
    await writable.write(stateToJson());
    await writable.close();
    setSaveStatus('Saved to data file.',1500);
    updateStorageStatus();
  }catch(e){
    console.warn('Could not save KBAI data file:', e);
    setSaveStatus('Save failed. Use Export backup to keep a copy.');
    setStorageStatus(`Could not write ${STORAGE.fileName||'data file'}: ${e.message}`,true);
  }finally{
    fileSaveInProgress=false;
    if(pendingFileSave)queueFileSave();
  }
}

async function createDataFile(){
  if(!storageSupported()){
    alert('This browser does not support direct file auto-save. Use Export backup and Import backup instead.');
    return;
  }
  try{
    const handle=await window.showSaveFilePicker({
      suggestedName:'kbai-progress-state.json',
      types:[{description:'KBAI progress data',accept:{'application/json':['.json']}}]
    });
    await rememberFileHandle(handle);
    await writeConnectedFile();
  }catch(e){
    if(e.name!=='AbortError'){
      console.warn('Could not create KBAI data file:',e);
      setStorageStatus(`Could not create data file: ${e.message}`,true);
    }
  }
}

async function connectDataFile(){
  if(!storageSupported()){
    alert('This browser does not support direct file auto-save. Use Import backup and Export backup instead.');
    return;
  }
  try{
    const [handle]=await window.showOpenFilePicker({
      multiple:false,
      types:[{description:'KBAI progress data',accept:{'application/json':['.json']}}]
    });
    if(!(await requestFilePermission(handle,'readwrite')))throw new Error('Permission to read and write the data file was denied.');
    const nextState=await readStateFromHandle(handle);
    if(hasAnyState(STATE)&&hasAnyState(nextState)&&!confirm('Load this data file and replace the progress currently shown in the tracker?'))return;
    STATE=nextState;
    cacheState();
    await rememberFileHandle(handle);
    renderAll();
    setSaveStatus('Loaded data file.',1800);
  }catch(e){
    if(e.name!=='AbortError'){
      console.warn('Could not connect KBAI data file:',e);
      setStorageStatus(`Could not connect data file: ${e.message}`,true);
    }
  }
}

async function saveSnapshot(){
  if(STORAGE.fileHandle){
    await writeConnectedFile();
  }else{
    exportBackup();
  }
}

function exportBackup(){
  const blob=new Blob([stateToJson()],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`kbai-progress-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  setSaveStatus('Backup exported.',1800);
}

async function importBackup(input){
  const file=input.files&&input.files[0];
  input.value='';
  if(!file)return;
  try{
    const nextState=stateFromPayload(JSON.parse(await file.text()));
    if(hasAnyState(STATE)&&!confirm('Import this backup and replace the progress currently shown in the tracker?'))return;
    STATE=nextState;
    renderAll();
    saveState();
    setSaveStatus('Backup imported.',1800);
  }catch(e){
    console.warn('Could not import KBAI backup:',e);
    setStorageStatus(`Could not import backup: ${e.message}`,true);
  }
}
