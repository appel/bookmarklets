/*
 * Formfillah bookmarklet - Save your sanity, automagically fill any and all form inputs with random and non-random values.
 * Features context appropriate randomized values, email with domain as alias (e.g. test+domain.com@gmail.com), input type detection, radio/checkbox handling.
 */

javascript:(function(){
    const words = `Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum`.split(' ');
    
    const getRandomWords = () => {
        const shuffled = [...words].sort(() => Math.random() - 0.5);
        return shuffled.join(' ').replace(/([a-z]) /g, (_, p1) => Math.random() > 0.2 ? `${p1} ` : `${p1}${[',', '.', ';'][Math.floor(Math.random() * 3)]} `);
    };

  const randInt = max => Math.floor(Math.random() * max);
    const randTime = () => `${String(randInt(24)).padStart(2,'0')}:${String(randInt(60)).padStart(2,'0')}`;
    const randPhone = () => `(${randInt(1000).toString().padStart(3,'0')}) ${randInt(1000).toString().padStart(3,'0')}-${randInt(10000).toString().padStart(4,'0')}`;
    const randColor = () => `#${Math.floor(Math.random()*16777215).toString(16).padStart(6,'0')}`;

    const VALUES = {
        text: e => e.name || 'test',
        search: 'test search',
        email: () => `test+${location.hostname.replace('www.', '')}@gmail.com`,
        password: 'hunter2',
        tel: randPhone,
        number: () => randInt(100),
        range: () => randInt(100),
        date: () => new Date().toISOString().split('T')[0],
        time: randTime,
        datetime: () => new Date().toISOString(),
        'datetime-local': () => new Date().toISOString().slice(0, 16),
        month: () => new Date().toISOString().slice(0, 7),
        week: () => {
            const now = new Date();
            return `${now.getFullYear()}-W${String(Math.ceil(now.getDate() / 7)).padStart(2, '0')}`;
        },
        url: 'https://example.com',
        color: randColor,
        textarea: getRandomWords
    };

    function fillForm(form) {
        const processedRadioGroups = new Set();
        form.querySelectorAll('input, textarea, select').forEach(el => {
            if (el.tagName === 'SELECT') {
                el.selectedIndex = randInt(el.options.length);
                return;
            }
            if (el.tagName === 'TEXTAREA') {
                el.value = getRandomWords();
                return;
            }
            if (el.type === 'radio' && !processedRadioGroups.has(el.name)) {
                const group = form.querySelectorAll(`input[name="${el.name}"]`);
                group[randInt(group.length)].checked = true;
                processedRadioGroups.add(el.name);
                return;
            }
            if (el.type === 'checkbox') {
                const group = form.querySelectorAll(`input[name="${el.name}"]`);
                el.checked = group.length > 1 ? Math.random() > 0.5 : true;
                return;
            }
            const value = VALUES[el.type];
            if (value) el.value = typeof value === 'function' ? value(el) : value;
        });
    }
    document.querySelectorAll('form').forEach(fillForm);
})();

// Minified and URL-encoded version (copy this into bookmark URL):
javascript:!function(){let%20w=`Lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscing%20elit%20sed%20do%20eiusmod%20tempor%20incididunt%20ut%20labore%20et%20dolore%20magna%20aliqua%20Ut%20enim%20ad%20minim%20veniam%20quis%20nostrud%20exercitation%20ullamco%20laboris%20nisi%20ut%20aliquip%20ex%20ea%20commodo%20consequat%20Duis%20aute%20irure%20dolor%20in%20reprehenderit%20in%20voluptate%20velit%20esse%20cillum%20dolore%20eu%20fugiat%20nulla%20pariatur%20Excepteur%20sint%20occaecat%20cupidatat%20non%20proident%20sunt%20in%20culpa%20qui%20officia%20deserunt%20mollit%20anim%20id%20est%20laborum`.split(' '),r=(e,t)=>Math.floor(Math.random()*e),g=()=>[...w].sort(()=>Math.random()-.5).join(' ').replace(/([a-z])\s/g,(_,c)=>Math.random()>.2?c+' ':c+[',','.',';'][r(3)]+' '),h=()=>`(${r(1e3).toString().padStart(3,0)})%20${r(1e3).toString().padStart(3,0)}-${r(1e4).toString().padStart(4,0)}`,v={text:e=>e.name||'test',search:'test',email:()=>`test+${location.hostname.replace('www.','')}@gmail.com`,password:'hunter2',tel:h,number:()=>r(100),range:()=>r(100),date:()=>new Date().toISOString().split('T')[0],time:()=>`${(r(24)+'').padStart(2,0)}:${(r(60)+'').padStart(2,0)}`,datetime:()=>new Date().toISOString(),'datetime-local':()=>new Date().toISOString().slice(0,16),month:()=>new Date().toISOString().slice(0,7),week:()=>{let%20d=new%20Date;return`${d.getFullYear()}-W${String(Math.ceil(d.getDate()/7)).padStart(2,0)}`},url:'https://example.com',color:()=>'#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,0),textarea:g};(function%20f(e){let%20s=new%20Set;e.querySelectorAll('input,textarea,select').forEach(l=>{if(l.tagName==='SELECT'){l.selectedIndex=r(l.options.length);return}if(l.tagName==='TEXTAREA'){l.value=g();return}if(l.type==='radio'&&!s.has(l.name)){let%20g=e.querySelectorAll(`input[name="${l.name}"]`);g[r(g.length)].checked=!0;s.add(l.name);return}if(l.type==='checkbox'){let%20g=e.querySelectorAll(`input[name="${l.name}"]`);l.checked=g.length>1?Math.random()>.5:!0;return}let%20c=v[l.type];c&&(l.value=typeof%20c=='function'?c(l):c)})})(document).querySelectorAll('form').forEach(f)}();
