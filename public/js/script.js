const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // تغيير أيقونة الزر عند الفتح والغلق
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// زر الصعود للأعلى (من كودك الأصلي لكن أضفت له التفعيل)
const btn = document.getElementById('btn');
window.onscroll = function () {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 200) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};
btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
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