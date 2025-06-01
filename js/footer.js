// 加载 footer
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const html = await response.text();
        document.getElementById('footer-container').innerHTML = html;
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// 页面加载完成后加载 footer
document.addEventListener('DOMContentLoaded', loadFooter); 