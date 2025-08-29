// ---- Kontaktai vienoje vietoje (pakeiti čia → visur atsinaujina)
const CONTACT = {
    phoneRaw:    '+37060457322',
    phoneDisplay:'+370 604 57322',
    email:       'ernestasnc@gmail.com'
};

document.addEventListener('DOMContentLoaded', () => {
    // 1) Užpildom telefoną / el. paštą
    document.querySelectorAll('.js-phone').forEach(el=>{
        if(el.tagName.toLowerCase()==='a') el.href='tel:'+CONTACT.phoneRaw;
        el.textContent=CONTACT.phoneDisplay;
    });
    document.querySelectorAll('.js-email').forEach(el=>{
        if(el.tagName.toLowerCase()==='a') el.href='mailto:'+CONTACT.email;
        el.textContent=CONTACT.email;
    });
    const y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();

    // 2) Sticky header šešėlis scrolle
    const topbar = document.querySelector('.topbar');
    const onScroll = () => window.scrollY>4 ? topbar.classList.add('scrolled') : topbar.classList.remove('scrolled');
    onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

    // 3) Sklandus scroll su kompensacija (jei reikės papildomai)
    document.querySelectorAll('[data-scroll]').forEach(a=>{
        a.addEventListener('click', e=>{
            const href = a.getAttribute('href') || '';
            if(href.startsWith('#') && href.length>1){
                e.preventDefault();
                const el = document.querySelector(href);
                if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
            }
        });
    });

    // 4) Reveal animacija sekcijoms
    const io = new IntersectionObserver((ents)=>{
        ents.forEach(ent => {
            if(ent.isIntersecting){
                ent.target.classList.add('in');
                io.unobserve(ent.target);
            }
        });
    }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    // 5) Geresnė autoplay patirtis (jei naršyklė neleidžia → lieka posteris)
    const v = document.querySelector('.hero-video');
    if(v){
        const tryPlay = () => v.play().catch(()=>{ /* tyliai ignoruojam */ });
        document.addEventListener('visibilitychange', tryPlay, {once:true});
        tryPlay();
    }
});
