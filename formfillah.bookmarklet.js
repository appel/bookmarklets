/*
 * Formfillah bookmarklet - Save your sanity, automagically fill any and all form inputs with random and non-random values.
 * Features context appropriate randomized values, email with domain as alias (e.g. test+domain.com@gmail.com), input type detection, radio/checkbox handling.
 * Test it here: https://www.456bereastreet.com/lab/html5-input-types/
 */

javascript:(function(){
    const EMAIL_PREFIX = 'test';
    const EMAIL_DOMAIN = 'gmail.com';
    
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
        email: () => `${EMAIL_PREFIX}+${location.hostname.replace('www.', '')}@${EMAIL_DOMAIN}`,
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

        form.style.transition = 'transform 0.25s ease-in-out';
        form.style.transform = 'scale(1.02)';
        setTimeout(() => form.style.transform = 'scale(1)', 250);
        
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
javascript:(function(){const EMAIL_PREFIX='test',EMAIL_DOMAIN='gmail.com',words=`Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum`.split(' '),getRandomWords=()=>[...words].sort(()=>Math.random()-.5).join(' ').replace(/([a-z]) /g,(_,p1)=>Math.random()>.2?`${p1} `:`${p1}${[',','.',';'][Math.floor(Math.random()*3)]} `),randInt=max=>Math.floor(Math.random()*max),randTime=()=>`${String(randInt(24)).padStart(2,'0')}:${String(randInt(60)).padStart(2,'0')}`,randPhone=()=>`(${randInt(1000).toString().padStart(3,'0')}) ${randInt(1000).toString().padStart(3,'0')}-${randInt(10000).toString().padStart(4,'0')}`,randColor=()=>`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,'0')}`,VALUES={text:e=>e.name||'test',search:'test%20search',email:()=>`${EMAIL_PREFIX}+${location.hostname.replace('www.','')}@${EMAIL_DOMAIN}`,password:'hunter2',tel:randPhone,number:()=>randInt(100),range:()=>randInt(100),date:()=>new%20Date().toISOString().split('T')[0],time:randTime,datetime:()=>new%20Date().toISOString(),'datetime-local':()=>new%20Date().toISOString().slice(0,16),month:()=>new%20Date().toISOString().slice(0,7),week:()=>{const%20now=new%20Date();return`${now.getFullYear()}-W${String(Math.ceil(now.getDate()/7)).padStart(2,'0')}`},url:'https://example.com',color:randColor,textarea:getRandomWords};function%20fillForm(form){form.style.transition='transform%200.25s%20ease-in-out',form.style.transform='scale(1.02)',setTimeout(()=>form.style.transform='scale(1)',250);const%20processedRadioGroups=new%20Set;form.querySelectorAll('input,%20textarea,%20select').forEach(el=>{if('SELECT'===el.tagName)return%20void(el.selectedIndex=randInt(el.options.length));if('TEXTAREA'===el.tagName)return%20void(el.value=getRandomWords());if('radio'===el.type&&!processedRadioGroups.has(el.name)){const%20group=form.querySelectorAll(`input[name="${el.name}"]`);return%20void(group[randInt(group.length)].checked=!0,processedRadioGroups.add(el.name))}if('checkbox'===el.type){const%20group=form.querySelectorAll(`input[name="${el.name}"]`);return%20void(el.checked=group.length>1?Math.random()>.5:!0)}const%20value=VALUES[el.type];value&&(el.value='function'==typeof%20value?value(el):value)})}document.querySelectorAll('form').forEach(fillForm)})();
