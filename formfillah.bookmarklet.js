/*
 * Formfillah bookmarklet - Save your sanity, automagically fill any and all form inputs with random and non-random values.
 * Features context appropriate randomized values, email with domain as alias (e.g. test+domain.com@gmail.com), input type detection, radio/checkbox handling.
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
        form.style.transform = 'scale(1.05)';
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
javascript:void%20function(){javascript:(function(){var%20a=Math.floor;const%20b=`Lorem%20ipsum%20dolor%20sit%20amet%20consectetur%20adipiscing%20elit%20sed%20do%20eiusmod%20tempor%20incididunt%20ut%20labore%20et%20dolore%20magna%20aliqua%20Ut%20enim%20ad%20minim%20veniam%20quis%20nostrud%20exercitation%20ullamco%20laboris%20nisi%20ut%20aliquip%20ex%20ea%20commodo%20consequat%20Duis%20aute%20irure%20dolor%20in%20reprehenderit%20in%20voluptate%20velit%20esse%20cillum%20dolore%20eu%20fugiat%20nulla%20pariatur%20Excepteur%20sint%20occaecat%20cupidatat%20non%20proident%20sunt%20in%20culpa%20qui%20officia%20deserunt%20mollit%20anim%20id%20est%20laborum`.split(%22%20%22),c=()=%3E{const%20c=[...b].sort(()=%3EMath.random()-.5);return%20c.join(%22%20%22).replace(/([a-z])%20/g,(b,c)=%3E.2%3CMath.random()%3F`${c}%20`:`${c}${[%22,%22,%22.%22,%22;%22][a(3*Math.random())]}%20`)},d=b=%3Ea(Math.random()*b),e={text:a=%3Ea.name||%22test%22,search:%22test%20search%22,email:()=%3E`${%22test%22}+${location.hostname.replace(%22www.%22,%22%22)}%40${%22gmail.com%22}`,password:%22hunter2%22,tel:()=%3E`(${d(1e3).toString().padStart(3,%220%22)})%20${d(1e3).toString().padStart(3,%220%22)}-${d(1e4).toString().padStart(4,%220%22)}`,number:()=%3Ed(100),range:()=%3Ed(100),date:()=%3Enew%20Date().toISOString().split(%22T%22)[0],time:()=%3E`${(d(24)+%22%22).padStart(2,%220%22)}:${(d(60)+%22%22).padStart(2,%220%22)}`,datetime:()=%3Enew%20Date().toISOString(),%22datetime-local%22:()=%3Enew%20Date().toISOString().slice(0,16),month:()=%3Enew%20Date().toISOString().slice(0,7),week:()=%3E{const%20a=new%20Date;return`${a.getFullYear()}-W${(Math.ceil(a.getDate()/7)+%22%22).padStart(2,%220%22)}`},url:%22https://example.com%22,color:()=%3E`%23${a(16777215*Math.random()).toString(16).padStart(6,%220%22)}`,textarea:c};document.querySelectorAll(%22form%22).forEach(function(a){a.style.transition=%22transform%200.25s%20ease-in-out%22,a.style.transform=%22scale(1.05)%22,setTimeout(()=%3Ea.style.transform=%22scale(1)%22,250);const%20b=new%20Set;a.querySelectorAll(%22input,%20textarea,%20select%22).forEach(f=%3E{if(%22SELECT%22===f.tagName)return%20void(f.selectedIndex=d(f.options.length));if(%22TEXTAREA%22===f.tagName)return%20void(f.value=c());if(%22radio%22===f.type%26%26!b.has(f.name)){const%20c=a.querySelectorAll(`input[name=%22${f.name}%22]`);return%20c[d(c.length)].checked=!0,void%20b.add(f.name)}if(%22checkbox%22===f.type){const%20b=a.querySelectorAll(`input[name=%22${f.name}%22]`);return%20void(f.checked=!(1%3Cb.length)||.5%3CMath.random())}const%20g=e[f.type];g%26%26(f.value=%22function%22==typeof%20g%3Fg(f):g)})})})()}();
