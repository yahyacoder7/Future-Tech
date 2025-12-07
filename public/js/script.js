// navbar.js

const navbarHTML = `
 <button id="btn"><i class="fa-solid fa-arrow-up"></i></button>
 <header class="header">
        <div class="header__container">
            <div class="header__logo">
                <span class="header__logo-text">Future <span id="tech">Tech</span></span>
            </div>

            <button class="mobile-menu-btn" id="menu-toggle">
                <i class="fa-solid fa-bars"></i>
            </button>

            <nav class="header__navbar">
                <div class="header__nav-links" id="nav-menu">
                    <a href="/add" class="header__nav-link">Add</a>
                    <a href="/edit" class="header__nav-link">Edit</a>
                    <a href="/delete" class="header__nav-link">Delete</a>
                    <a href="#builds" class="header__nav-link">Pre-built PCs</a>
                    <a href="/build-pc" class="header__nav-link" id="special-link">Build Your Own PC <i
                            class="fa-solid fa-tools"></i>
                    </a>
                </div>
            </nav>
        </div>
    </header>
`;


document.getElementById('navbar-placeholder').innerHTML = navbarHTML;



const btn = document.getElementById('btn');
window.onscroll = function () {
        window.scrollY >= 400 ? btn.classList.add('show') : btn.classList.remove('show')
};
btn.onclick = function(){
  window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
} 


/*window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // هل الرابط يحتوي على created=true؟
    if (urlParams.get('created') === 'true') {
        const toast = document.getElementById('welcomeToast');
        
        if (toast) {
            // إظهار
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.remove('translate-y-10', 'opacity-0'), 100);
            
            // إخفاء
            setTimeout(() => {
                toast.classList.add('translate-y-10', 'opacity-0');
                setTimeout(() => toast.classList.add('hidden'), 500);
            }, 4000);
            
            // تنظيف الرابط
            window.history.replaceState(null, null, "/");
        }
    }
});*/