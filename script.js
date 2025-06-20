const searchIconContainer = document.getElementById('search-icon');
const searchOptions = document.getElementById('search-options');
const searchForm = document.getElementById('search-form');
const searchBar = document.getElementById('search-bar');
const blurElement = document.getElementById('background-blur-search-options');
const searchLinks = searchOptions.querySelectorAll('a');

// Dữ liệu cho từng công cụ tìm kiếm, bao gồm placeholder, màu outline, HTML của SVG và viewBox
const engineData = {
    "https://www.google.com/search": {
        placeholder: "Search on Google . . .",
        outlineColor: "#FEC319",
        viewBox: "1 1 23 23", // Thêm viewBox cho Google
        svgHtml: `
            <path d="M23 12.245c0-.905-.075-1.565-.236-2.25h-10.54v4.083h6.186c-.124 1.014-.797 2.542-2.294 3.569l-.021.136 3.332 2.53.23.022C21.779 18.417 23 15.593 23 12.245" fill="#4285F4" />
            <path d="M12.225 23c3.03 0 5.574-.978 7.433-2.665l-3.542-2.688c-.948.648-2.22 1.1-3.891 1.1a6.745 6.745 0 0 1-6.386-4.572l-.132.011-3.465 2.628-.045.124C4.043 20.531 7.835 23 12.225 23" fill="#34A853" />
            <path d="M5.84 14.175A6.7 6.7 0 0 1 5.463 12c0-.758.138-1.491.361-2.175l-.006-.147-3.508-2.67-.115.054A10.8 10.8 0 0 0 1 12c0 1.772.436 3.447 1.197 4.938z" fill="#FBBC05" />
            <path d="M12.225 5.253c2.108 0 3.529.892 4.34 1.638l3.167-3.031C17.787 2.088 15.255 1 12.225 1 7.834 1 4.043 3.469 2.197 7.062l3.63 2.763a6.77 6.77 0 0 1 6.398-4.572" fill="#EB4335" />
        `
    },
    "https://paulgo.io/search": {
        placeholder: "Search on SearXNG . . .",
        outlineColor: "blue",
        viewBox: "0 0 92 92", // Thêm viewBox cho SearXNG
        svgHtml: `
            <g fill="none" stroke="#3050ff" transform="translate(-40.921 -17.417)">
                <circle cx="75.921" cy="53.903" r="30" stroke-width="10" />
                <path d="M67.515 37.915a18 18 0 0 1 21.051 3.313 18 18 0 0 1 3.138 21.078" stroke-width="5" />
            </g>
            <path d="m49.813 64.357 13.036-13.61 28.86 27.642-13.035 13.61z" fill="#3050ff" />
        `
    },
    "https://search.brave.com/search": {
        placeholder: "Search on Brave . . .",
        outlineColor: "#FF2F00",
        viewBox: "0 0 56 64", // Thêm viewBox cho Brave
        svgHtml: `
            <path fill-rule="evenodd" clip-rule="evenodd" d="M53.292 15.321l1.5-3.676s-1.909-2.043-4.227-4.358c-2.317-2.315-7.225-.953-7.225-.953L37.751 0H18.12l-5.589 6.334s-4.908-1.362-7.225.953C2.988 9.602 1.08 11.645 1.08 11.645l1.5 3.676-1.91 5.447s5.614 21.236 6.272 23.83c1.295 5.106 2.181 7.08 5.862 9.668 3.68 2.587 10.36 7.08 11.45 7.762 1.091.68 2.455 1.84 3.682 1.84 1.227 0 2.59-1.16 3.68-1.84 1.091-.681 7.77-5.175 11.452-7.762 3.68-2.587 4.567-4.562 5.862-9.668.657-2.594 6.27-23.83 6.27-23.83l-1.908-5.447z" fill="url(#paint0_linear)" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.888 11.508c.818 0 6.885-1.157 6.885-1.157s7.189 8.68 7.189 10.536c0 1.534-.619 2.134-1.347 2.842-.152.148-.31.3-.467.468l-5.39 5.717a9.42 9.42 0 01-.176.18c-.538.54-1.33 1.336-.772 2.658l.115.269c.613 1.432 1.37 3.2.407 4.99-1.025 1.906-2.78 3.178-3.905 2.967-1.124-.21-3.766-1.589-4.737-2.218-.971-.63-4.05-3.166-4.05-4.137 0-.809 2.214-2.155 3.29-2.81.214-.13.383-.232.48-.298.111-.075.297-.19.526-.332.981-.61 2.754-1.71 2.799-2.197.055-.602.034-.778-.758-2.264-.168-.316-.365-.654-.568-1.004-.754-1.295-1.598-2.745-1.41-3.784.21-1.173 2.05-1.845 3.608-2.415.194-.07.385-.14.567-.209l1.623-.609c1.556-.582 3.284-1.229 3.57-1.36.394-.181.292-.355-.903-.468a54.655 54.655 0 01-.58-.06c-1.48-.157-4.209-.446-5.535-.077-.261.073-.553.152-.86.235-1.49.403-3.317.897-3.493 1.182-.03.05-.06.093-.089.133-.168.238-.277.394-.091 1.406.055.302.169.895.31 1.629.41 2.148 1.053 5.498 1.134 6.25.011.106.024.207.036.305.103.84.171 1.399-.805 1.622l-.255.058c-1.102.252-2.717.623-3.3.623-.584 0-2.2-.37-3.302-.623l-.254-.058c-.976-.223-.907-.782-.804-1.622.012-.098.024-.2.035-.305.081-.753.725-4.112 1.137-6.259.14-.73.253-1.32.308-1.62.185-1.012.076-1.168-.092-1.406a3.743 3.743 0 01-.09-.133c-.174-.285-2-.779-3.491-1.182-.307-.083-.6-.162-.86-.235-1.327-.37-4.055-.08-5.535.077-.226.024-.422.045-.58.06-1.196.113-1.297.287-.903.468.285.131 2.013.778 3.568 1.36.597.223 1.17.437 1.624.609.183.069.373.138.568.21 1.558.57 3.398 1.241 3.608 2.414.187 1.039-.657 2.489-1.41 3.784-.204.35-.4.688-.569 1.004-.791 1.486-.812 1.662-.757 2.264.044.488 1.816 1.587 2.798 2.197.229.142.415.257.526.332.098.066.266.168.48.298 1.076.654 3.29 2 3.29 2.81 0 .97-3.078 3.507-4.05 4.137-.97.63-3.612 2.008-4.737 2.218-1.124.21-2.88-1.061-3.904-2.966-.963-1.791-.207-3.559.406-4.99l.115-.27c.559-1.322-.233-2.118-.772-2.658a9.377 9.377 0 01-.175-.18l-5.39-5.717c-.158-.167-.316-.32-.468-.468-.728-.707-1.346-1.308-1.346-2.842 0-1.855 7.189-10.536 7.189-10.536s6.066 1.157 6.884 1.157c.653 0 1.913-.433 3.227-.885.333-.114.669-.23 1-.34 1.635-.545 2.726-.549 2.726-.549s1.09.004 2.726.549c.33.11.667.226 1 .34 1.313.452 2.574.885 3.226.885zm-1.041 30.706c1.282.66 2.192 1.128 2.536 1.343.445.278.174.803-.232 1.09-.405.285-5.853 4.499-6.381 4.965l-.215.191c-.509.459-1.159 1.044-1.62 1.044-.46 0-1.11-.586-1.62-1.044l-.213-.191c-.53-.466-5.977-4.68-6.382-4.966-.405-.286-.677-.81-.232-1.09.344-.214 1.255-.683 2.539-1.344l1.22-.629c1.92-.992 4.315-1.837 4.689-1.837.373 0 2.767.844 4.689 1.837.436.226.845.437 1.222.63z" fill="#fff" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M43.34 6.334L37.751 0H18.12l-5.589 6.334s-4.908-1.362-7.225.953c0 0 6.544-.59 8.793 3.064 0 0 6.066 1.157 6.884 1.157.818 0 2.59-.68 4.226-1.225 1.636-.545 2.727-.549 2.727-.549s1.09.004 2.726.549 3.408 1.225 4.226 1.225c.818 0 6.885-1.157 6.885-1.157 2.249-3.654 8.792-3.064 8.792-3.064-2.317-2.315-7.225-.953-7.225-.953z" fill="url(#paint1_linear)" />
            <defs>
                <linearGradient id="paint0_linear" x1=".671" y1="64.319" x2="55.2" y2="64.319" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F50" />
                    <stop offset=".41" stop-color="#F50" />
                    <stop offset=".582" stop-color="#FF2000" />
                    <stop offset="1" stop-color="#FF2000" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="6.278" y1="11.466" x2="50.565" y2="11.466" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FF452A" />
                    <stop offset="1" stop-color="#FF2000" />
                </linearGradient>
            </defs>
        `
    },
    "https://www.bing.com/search": {
        placeholder: "Search on Bing . . .",
        outlineColor: "#5083DF",
        viewBox: "0 2 42 42", // Thêm viewBox cho Bing
        svgHtml: `
            <linearGradient id="bing-a" gradientUnits="userSpaceOnUse" x1="11.905" y1="1.952" x2="17.941" y2="40.401">
                <stop offset="0" style="stop-color:#3dbffc"/>
                <stop offset="1" style="stop-color:#183efb"/>
             </linearGradient>
            <path style="fill:url(#bing-a)" d="M17.572 37.076 20 35.619V10.603a5 5 0 0 0-2.133-4.096L12.36 2.652c-.994-.696-2.36.015-2.36 1.229V32.5c0 .22.02.555.033.772.336 3.595 4.349 5.718 7.539 3.804"/>
            <linearGradient id="bing-b" gradientUnits="userSpaceOnUse" x1="14.342" y1="41.478" x2="34.121" y2="25.575">
                <stop offset="0" style="stop-color:#33bef0"/>
                <stop offset=".159" style="stop-color:#32b9f0"/>
                <stop offset=".341" style="stop-color:#2facf2"/>
                <stop offset=".533" style="stop-color:#2a95f4"/>
                <stop offset=".733" style="stop-color:#2475f6"/>
                <stop offset=".936" style="stop-color:#1b4cfa"/>
                <stop offset="1" style="stop-color:#183efb"/>
            </linearGradient>
            <path style="fill:url(#bing-b)" d="M32.682 27.904 20 35.5l-2.428 1.457c-3.191 1.915-7.203-.209-7.54-3.804C10.372 38.922 15.145 43.5 21 43.5c1.963 0 3.888-.536 5.568-1.551l6.834-4.126a11 11 0 0 0 2.15-1.707c2.354-2.701 1.187-7.447-2.87-8.212"/>
            <linearGradient id="bing-c" gradientUnits="userSpaceOnUse" x1="24.223" y1="17.113" x2="45.699" y2="38.588">
                <stop offset="0" style="stop-color:#3dbffd"/>
                <stop offset="1" style="stop-color:#1de9b6"/>
            </linearGradient>
            <path style="fill:url(#bing-c)" d="m33.636 19.568-7.607-3.803c-1.234-.617-2.576.618-2.064 1.899l1.755 5.886a5 5 0 0 0 2.719 2.758L32.5 28c4.057.766 5.352 5.251 3.052 8.117 4.847-4.877 4.536-13.323-1.916-16.549"/> `
    },
    "https://duckduckgo.com/": {
        placeholder: "Search on DuckDuckGo . . .",
        outlineColor: "#DE5933",
        viewBox: "4 4 41 41", // Thêm viewBox cho DuckDuckGo
        svgHtml: `
            <path style="fill:#ff3d00" d="M44 24c0 11-9 20-20 20S4 35 4 24 13 4 24 4s20 9 20 20" />
            <path style="fill:#fff" d="M26 16.2c-.6-.6-1.5-.9-2.5-1.1-.4-.5-1-1-1.9-1.5-1.6-.8-3.5-1.2-5.3-.9h-.4c-.1 0-.2.1-.4.1.2 0 1 .4 1.6.6-.3.2-.8.2-1.1.4h-.1l-.2.2c-.1.2-.2.4-.2.5 1.3-.1 3.2 0 4.6.4-1.1.1-2.1.4-2.8.8-.5.3-1 .6-1.3 1.1-1.2 1.3-1.7 3.5-1.3 5.9.5 2.7 2.4 11.4 3.4 16.3l.3 1.6s3.5.4 5.6.4c1.2 0 3.2.3 3.7-.2-.1 0-.6-.6-.8-1.1-.5-1-1-1.9-1.4-2.6-1.2-2.5-2.5-5.9-1.9-8.1.1-.4.1-2.1.4-2.3 2.6-1.7 2.4-.1 3.5-.8.5-.4 1-.9 1.2-1.5.7-2.3-.9-6.4-2.7-8.2" />
            <path style="fill:#fff" d="M24 42c-9.9 0-18-8.1-18-18S14.1 6 24 6s18 8.1 18 18-8.1 18-18 18m0-34C15.2 8 8 15.2 8 24s7.2 16 16 16 16-7.2 16-16S32.8 8 24 8" />
            <path style="fill:#0277bd" d="M19 21.1c-.6 0-1.2.5-1.2 1.2 0 .6.5 1.2 1.2 1.2.6 0 1.2-.5 1.2-1.2-.1-.6-.6-1.2-1.2-1.2m.5 1.1q-.3 0-.3-.3t.3-.3c.3 0 .3.1.3.3s-.2.3-.3.3m7.3-1.6c-.6 0-1 .5-1 1 0 .6.5 1 1 1 .6 0 1-.5 1-1s-.5-1-1-1m.4.9c-.1 0-.3-.1-.3-.3 0-.1.1-.3.3-.3.1 0 .3.1.3.3s-.1.3-.3.3m-7.9-2.6s-.9-.4-1.7.1c-.9.5-.8 1.1-.8 1.1s-.5-1 .8-1.5c1.1-.5 1.7.3 1.7.3m8.1-.1s-.6-.4-1.1-.4c-1 0-1.3.5-1.3.5s.2-1.1 1.5-.9c.6.2.9.8.9.8" />
            <path style="fill:#8bc34a" d="M23.3 35.7s-4.3-2.3-4.4-1.4 0 4.7.5 5 4.1-1.9 4.1-1.9zm1.7-.1s2.9-2.2 3.6-2.1c.6.1.8 4.7.2 4.9s-3.9-1.2-3.9-1.2z" />
            <path style="fill:#689f38" d="M22.5 35.7c0 1.5-.2 2.1.4 2.3.6.1 1.9 0 2.3-.3s.1-2.2-.1-2.6c-.1-.3-2.6 0-2.6.6" />
            <path style="fill:#ffca28" d="M22.3 26.8c.1-.7 2-2.1 3.3-2.2s1.7-.1 2.8-.3c1.1-.3 3.9-1 4.7-1.3.8-.4 4.1.2 1.8 1.5-1 .6-3.7 1.6-5.7 2.2-1.9.6-3.1-.6-3.8.4-.5.8-.1 1.8 2.2 2 3.1.3 6.2-1.4 6.5-.5s-2.7 2-4.6 2.1c-1.8 0-5.6-1.2-6.1-1.6s-1.2-1.3-1.1-2.3" />
        `
    }
};

// Hàm để cập nhật icon, placeholder, màu outline và viewBox
function updateSearchUI(engineUrl) {
    const data = engineData[engineUrl];
    if (data) {
        searchForm.action = engineUrl;
        searchBar.placeholder = data.placeholder;
        searchBar.style.outlineColor = data.outlineColor;
        searchIconContainer.setAttribute('viewBox', data.viewBox);
        searchIconContainer.innerHTML = data.svgHtml;
    }
}
// Toggle options visibility
searchIconContainer.addEventListener('click', () => {
    searchOptions.classList.toggle('active');
    blurElement.classList.toggle('active');
});

// Change search engine and placeholder
searchOptions.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link) {
        event.preventDefault();

        const engine = link.getAttribute('data-engine');
        updateSearchUI(engine);
        searchOptions.classList.remove('active');
        blurElement.classList.remove('active');
    }
});

// Close options when clicking outside
document.addEventListener('click', (event) => {
    if (!searchIconContainer.contains(event.target) && !searchOptions.contains(event.target)) {
        searchOptions.classList.remove('active');
        blurElement.classList.remove('active');
    }
});

// Lắng nghe sự kiện submit form
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let query = searchBar.value.trim();

    // Biểu thức chính quy kiểm tra URL (đã cải tiến)
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;

    if (urlRegex.test(query)) {
        // Nếu là URL hợp lệ, chuyển hướng đến URL đó
        if (!/^https?:\/\//i.test(query)) {
            query = 'https://' + query; // Thêm "https://" để đảm bảo an toàn
        }
        window.location.href = query;
    } else {
        // Nếu không phải URL, tìm kiếm theo công cụ đã chọn
        const searchEngineUrl = searchForm.action;
        window.location.href = searchEngineUrl + '?q=' + encodeURIComponent(query);
    }
});

// Thiết lập trạng thái ban đầu khi tải trang
document.addEventListener('DOMContentLoaded', function () {
    // Tìm URL của công cụ tìm kiếm mặc định từ action của form (ban đầu là Google)
    const defaultEngineUrl = searchForm.action;
    updateSearchUI(defaultEngineUrl);
});


// Segment mappings for digits 0-9
const digitSegments = {
    0: ['top', 'top-right', 'top-left', 'bot', 'bot-right', 'bot-left'],
    1: ['top-right', 'bot-right'],
    2: ['top', 'top-right', 'between', 'bot-left', 'bot'],
    3: ['top', 'top-right', 'between', 'bot-right', 'bot'],
    4: ['top-left', 'top-right', 'between', 'bot-right'],
    5: ['top', 'top-left', 'between', 'bot-right', 'bot'],
    6: ['top', 'top-left', 'between', 'bot-right', 'bot', 'bot-left'],
    7: ['top', 'top-right', 'bot-right'],
    8: ['top', 'top-right', 'top-left', 'between', 'bot', 'bot-right', 'bot-left'],
    9: ['top', 'top-left', 'top-right', 'between', 'bot-right', 'bot']
};

// Function to update the clock
function updateClock() {
    // Get Vietnam time (UTC+7)
    const now = new Date();
    const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const hours = vietnamTime.getUTCHours().toString().padStart(2, '0');
    const minutes = vietnamTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = vietnamTime.getUTCSeconds().toString().padStart(2, '0');

    // Update hours
    updateDigit('h1', hours[0]);
    updateDigit('h2', hours[1]);

    // Update minutes
    updateDigit('m1', minutes[0]);
    updateDigit('m2', minutes[1]);

    // Update seconds
    updateDigit('s1', seconds[0]);
    updateDigit('s2', seconds[1]);
}

// Function to update a single digit
function updateDigit(prefix, digit) {
    const segments = ['top', 'top-right', 'top-left', 'between', 'bot', 'bot-right', 'bot-left'];
    const activeSegments = digitSegments[digit] || [];

    segments.forEach(segment => {
        const element = document.getElementById(`${prefix}-${segment}`);
        if (element) {
            if (activeSegments.includes(segment)) {
                element.style.fill = 'rgb(57, 162, 255)';
                element.style.transition = 'fill 0.3s ease';
            } else {
                element.style.fill = 'rgba(0, 0, 0, 0.1)';
                element.style.transition = 'fill 0.3s ease';
            }
        }
    });
}

setInterval(updateClock, 1000);
updateClock();








// Function to open or close the Google popup
function toggleGooglePopup(event) {
    event.preventDefault();
    event.stopPropagation();

    const googlePopup = document.getElementById('google-popup');
    const googleBookmark = document.getElementById('google-bookmark');

    if (!googlePopup || !googleBookmark) {
        console.error("Popup or Google bookmark element not found.");
        return;
    }

    const isPopupOpen = googlePopup.classList.contains('active');

    if (isPopupOpen) {
        closeGooglePopup();
    } else {
        // 1. Đảm bảo display là 'block' trước tiên để phần tử có mặt trong DOM
        googlePopup.style.display = 'block';

        // 2. Sử dụng requestAnimationFrame hoặc setTimeout ngắn
        // để trình duyệt có thể áp dụng các kiểu ban đầu (scale 0.1, opacity 0)
        // trước khi thêm class 'active' kích hoạt transition.
        requestAnimationFrame(() => {
            googlePopup.classList.add('active');
        });
        // Hoặc bạn có thể dùng:
        // setTimeout(() => {
        //     googlePopup.classList.add('active');
        // }, 10); // Một độ trễ nhỏ, ví dụ 10ms
    }
}

// Function to close the GooglePopup (giữ nguyên)
function closeGooglePopup() {
    const googlePopup = document.getElementById('google-popup');
    if (googlePopup) {
        googlePopup.classList.remove('active');
        // Chờ animation đóng kết thúc trước khi ẩn hẳn phần tử
        setTimeout(() => {
            googlePopup.style.display = 'none';
        }, 300); // Phải khớp với transition duration trong CSS
    }
}

// Close popup when clicking outside the content (on the window)
window.onclick = function (event) {
    const googlePopup = document.getElementById('google-popup');
    const googleBookmark = document.getElementById('google-bookmark');

    // Chỉ thực hiện nếu popup đang hiển thị
    if (googlePopup.classList.contains('active') && googlePopup.style.display === 'block') {
        // Kiểm tra nếu click không phải là popup và không phải là con của popup
        // VÀ KHÔNG PHẢI LÀ CHÍNH BIỂU TƯỢNG GOOGLE
        if (!googlePopup.contains(event.target) && !googleBookmark.contains(event.target)) {
            closeGooglePopup(); // Gọi hàm đóng
        }
    }
};

// Ngăn chặn việc click bên trong popup đóng nó và gán sự kiện cho bookmark
document.addEventListener('DOMContentLoaded', (event) => {
    const googlePopupContent = document.querySelector('#google-popup .popup-content');
    const googleBookmarkElement = document.getElementById('google-bookmark');

    if (googlePopupContent) {
        googlePopupContent.addEventListener('click', function (e) {
            e.stopPropagation(); // Ngăn chặn sự kiện click bên trong popup lan truyền lên window.onclick
        });
    }

    // THAY ĐỔI QUAN TRỌNG: Gán hàm toggle cho sự kiện click của bookmark Google
    // Đảm bảo phần tử tồn tại trước khi gán sự kiện
    if (googleBookmarkElement) {
        googleBookmarkElement.onclick = toggleGooglePopup;
    }
});

document.querySelectorAll('.popup-bookmarks-grid .bookmark-item')
    .forEach((el, index) => {
        const delay = Math.floor(index / 3) * 0.08;
        el.style.animationDelay = `${delay}s`;
    });














// ngôi sao //
function createBoxShadows(count, maxX, maxY) {
    let shadows = [];
    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);
        shadows.push(`${x}px ${y}px #FFF`);
    }
    return shadows.join(', ');
}

const starsElement = document.getElementById('stars');
const stars2Element = document.getElementById('stars2');
const stars3Element = document.getElementById('stars3');

const expandedWidth = 900;
const expandedHeight = 1200;
const bufferHeight = 100;

if (starsElement) {
    starsElement.style.boxShadow = createBoxShadows(700, expandedWidth, expandedHeight + bufferHeight);
    starsElement.style.setProperty('--star-animation-height', `${expandedHeight + bufferHeight}px`);
}
if (stars2Element) {
    stars2Element.style.boxShadow = createBoxShadows(200, expandedWidth, expandedHeight + bufferHeight);
    stars2Element.style.setProperty('--star-animation-height', `${expandedHeight + bufferHeight}px`);
}
if (stars3Element) {
    stars3Element.style.boxShadow = createBoxShadows(100, expandedWidth, expandedHeight + bufferHeight);
    stars3Element.style.setProperty('--star-animation-height', `${expandedHeight + bufferHeight}px`);
}



















// --- Hàm lấy SVG icon cho từng loại file ---
function getFileIconSvg(extension) {
    extension = extension.toLowerCase();
    switch (extension) {
        case 'html':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#FE490F" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M13 22.5v-6 12-6h6v-6 12-6m5-6h6-3v12-12ZM35 24v4.5-12l3 7.5 3-7.5v12V24m5-7.5v12h6-6Z"/><path fill="#FF9E6B" d="M56 50h5L44 85h-5Zm24 21-15 8v-5l15-8-15-8v5l10 5.66L80 66m-60 5 15 8v-5l-15-8 15-8v5l-10 5.66L20 66"/></svg>`;
        case 'css':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#03A1E5" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M24 19a6 6 0 1 0 0 7 6 6 0 1 1 0-7Zm13.7-1 .3.5c-4-6-14 1.5-4 4M30.3 27l-.3-.5c4 6 14-1.5 4-4M51.7 18l.3.5c-4-6-14 1.5-4 4M44.3 27l-.3-.5c4 6 14-1.5 4-4" fill="#03A1E5" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path fill="#fff" stroke="#76CEF3" stroke-width="5" stroke-linejoin="round" d="M32 47c-11 0 1 20-10 20m10 20c-11 0 1-20-10-20m46-20c11 0-1 20 10 20M68 87c11 0-1-20 10-20"/><circle fill="#76CEF3" cx="50" cy="80" r="4"/><circle fill="#76CEF3" cx="60" cy="80" r="4"/><circle fill="#76CEF3" cx="40" cy="80" r="4"/></svg>`;
        case 'js':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#FFB42A" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M28 17v-.5 8a4 4 0 1 1-8 0l.1.5m22.6-7 .3.5c-4-6-14 1.5-4 4M35.3 27l-.3-.5c4 6 14-1.5 4-4" fill="#FFB42A" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path fill="#fff" stroke="#FDCC73" stroke-width="5" stroke-linejoin="round" d="M60 50q5 0 5 5v8q0 5 5 5"/><path fill="#fff" stroke="#FDCC73" stroke-width="5" d="M60 86q5 0 5-5v-8q0-5 5-5M40 50q-5 0-5 5v8q0 5-5 5m10 18q-5 0-5-5v-8q0-5-5-5"/><circle fill="#FDCC73" cx="50" cy="63" r="5"/><path fill="#FDCC73" d="M47 75h8l-4 14h-6Z"/></svg>`;
        case 'doc':
        case 'docx':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#068EFE" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><g fill="#068EFE" stroke="#fff" stroke-width="3" stroke-linejoin="round" transform="translate(-1)"><path d="M13 16.5v12h3c9 0 9-12 0-12Z"/><circle cx="34" cy="22.5" r="6"/><path d="m55 27 .5-.5a6 6 0 1 1 0-8L55 18" fill="none"/></g><path d="M25 50h35Zm0 9h35Zm0 9h50Zm0 9h50Zm0 9h50Z" stroke="#88DAFF" stroke-width="4" stroke-linejoin="round"/></svg>`;
        case 'xls':
        case 'xlsx':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#00DF01" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path fill="#00DF01" stroke="#fff" stroke-width="3" stroke-linejoin="round" d="m15 28.5 8-12-4 6-4-6 8 12-4-6Zm14-12v12h8-8ZM50.7 18l.3.5c-4-6-14 1.5-4 4M43.3 27l-.3-.5c4 6 14-1.5 4-4"/><path fill="#89EB89" d="M20 45h27v11H20zm33 0h27v11H53zM20 61h27v11H20zm33 0h27v11H53zM20 77h27v11H20zm33 0h27v11H53z"/></svg>`;
        case 'pdf':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="red" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M13.5 28.5v-12h4c7 0 7 7.5 0 7.5h-4Zm15.5-12v12h4c8 0 8-12 0-12Zm24 0h-8v6h8-8v6-12Z" fill="red" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path fill="#fff" stroke="#fd797d" stroke-width="3" d="M46 51q9 24-15 38c-4 2-8.3 1-4-4q17-18 47-8c5 1.5 7 6.5-1 5q-24-5-34-32c-2.5-8 4-8 7 1Z"/></svg>`;
        case 'mp3':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#FD05E4" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path fill="#FD05E4" stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M14 17v11.5-12l4.5 6.5 4.5-6.5v12V17m7 11.5v-12h4c5 0 5 7 0 7h-4Zm21-12h-8 8l-4 5a4 3.5 0 1 1-4 3.5 4 3.5 0 1 0 4-3.5"/><path fill="#FF92F4" d="M68.199 46.4v28a7.212 7.212 0 1 1-3.2-5.982v-11.97l-22.4 5.6v18.751a7.212 7.212 0 1 1-3.2-5.98v-22.02a1.6 1.6 0 0 1 1.212-1.551l25.6-6.4a1.58 1.58 0 0 1 1.372.29A1.6 1.6 0 0 1 68.2 46.4"/></svg>`;
        case 'm4a':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#FD05E4" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path fill="#FD05E4" stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M14 17v11.5-12l4.5 6.5 4.5-6.5v12V17m6 7 3-7.5-3 7.5h8v4.5-12 12m6 0 4-12h2l4 12-1.5-4h-7Z"/><path fill="#FF92F4" d="M68.199 46.4v28a7.212 7.212 0 1 1-3.2-5.982v-11.97l-22.4 5.6v18.751a7.212 7.212 0 1 1-3.2-5.98v-22.02a1.6 1.6 0 0 1 1.212-1.551l25.6-6.4a1.58 1.58 0 0 1 1.372.29A1.6 1.6 0 0 1 68.2 46.4"/></svg>`;
        case 'wav':
        case 'aac':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#FD05E4" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path fill="#FD05E4" stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M14 17v11.5-12l4.5 6.5 4.5-6.5v12V17m7 11.5v-12h4c5 0 5 7 0 7h-4Zm21-12h-8 8l-4 5a4 3.5 0 1 1-4 3.5 4 3.5 0 1 0 4-3.5"/><path fill="#FF92F4" d="M68.199 46.4v28a7.212 7.212 0 1 1-3.2-5.982v-11.97l-22.4 5.6v18.751a7.212 7.212 0 1 1-3.2-5.98v-22.02a1.6 1.6 0 0 1 1.212-1.551l25.6-6.4a1.58 1.58 0 0 1 1.372.29A1.6 1.6 0 0 1 68.2 46.4"/></svg>`;
        case 'csv':
            return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM12 12L15 15L12 18L9 15L12 12Z"></path></svg>`;
        case 'ppt':
        case 'pptx':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#F97316" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path fill="#F97316" stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M15 28.5V16.6l5-.1c4 0 4 7.5 0 7.5h-5Zm14 0V16.6l5-.1c4 0 4 7.5 0 7.5h-5Z"/><path stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M52 16.5h-9 4.5v12-12Z"/><g fill="#FFC875"><circle cx="50" cy="68" r="20"/><path stroke-width="4" stroke="#fff" d="M52 66V44a22 22 0 0 1 22 22Z"/></g></svg>`;
        case 'apk':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#3ddc84" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path fill="#3ddc84" stroke="#fff" stroke-width="3" stroke-linejoin="round" d="m13 28.5 4.5-12h2l4.5 12-1.3-3.5h-8.4Zm17 0v-12h5c4 0 4 7.5 0 7.5h-5Z"/><path stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M44 16.5v12V25l8-8.5-4 4.5 4 7.5-4-7.5-4 4Z"/><g transform="translate(0 -1)" fill="#7ee8ad"><path d="M25 71a26 26 0 0 1 50 0Z"/><path stroke="#7ee8ad" stroke-width="3" stroke-linejoin="round" d="m39 57-6-9Zm23 0 6-9Z"/><circle cx="41" cy="63" r="3" fill="#fff"/><circle cx="59" cy="63" r="3" fill="#fff"/><path d="M25 75h50v15H25z"/></g></svg>`;
        case 'zip':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#ff4e00" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M27 16.5h-7.5H27V18l-7.5 9v1.5H27h-7.5m14.5-12v12Zm7 0h3c6 0 6 6.5 0 6.5h-3v5.5Z" fill="#ff4e00" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><g fill="#FDB67F" transform="matrix(.9 0 0 .9 5.4 1.8)"><path d="M50 45h5v5h-5zm-5 5h5v5h-5zm5 5h5v5h-5zm-5 5h5v5h-5zm5 5h5v5h-5zm-5 5h5v5h-5z"/><rect x="45" y="76" width="10" height="10" rx="2.5" ry="2.5"/><path d="m50 83 6 15q1 2-1 2H45q-2 0-1-2Z"/></g></svg>`;
        case 'rar':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#700BFD" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M15 28.5v-12h5c5 0 5 7 0 7h-5Zv-5h4.5l4 5-4-5m10 5 4-12H35l4 12-1.2-3.5h-7.1Zm15.5 0v-12h5c5 0 5 7 0 7h-5Zv-5h4.5l4 5-4-5" fill="#700BFD" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><g fill="#BE96FF" stroke="#BE96FF"><path stroke-width="13" d="M25 50h30M25 65h30M25 80h30"/><path stroke-width="6" d="M57 46.5h11"/><path d="M57 51.5h11v13h-4V58h-3v6.5h-4" stroke="none"/><path stroke-width="20" d="M57 76.5h11"/><path stroke-width="13" d="M70 50h5m-5 15h5m-5 15h5"/></g></svg>`;
        case '7z':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#ff4e00" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path d="M27 16.5h-7.5H27V18l-7.5 9v1.5H27h-7.5m14.5-12v12Zm7 0h3c6 0 6 6.5 0 6.5h-3v5.5Z" fill="#ff4e00" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><g fill="#FDB67F" transform="matrix(.9 0 0 .9 5.4 1.8)"><path d="M50 45h5v5h-5zm-5 5h5v5h-5zm5 5h5v5h-5zm-5 5h5v5h-5zm5 5h5v5h-5zm-5 5h5v5h-5z"/><rect x="45" y="76" width="10" height="10" rx="2.5" ry="2.5"/><path d="m50 83 6 15q1 2-1 2H45q-2 0-1-2Z"/></g></svg>`;
        case 'exe':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#01e200" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M23 16.5h-8v6h8-8v6h8-8v-12Zm6 12 9-12-4.5 6-4.5-6 9 12-4.5-6Zm23-12h-8v6h8-8v6h8-8v-12Z"/><rect x="22" y="46" width="48" height="35" rx="5" ry="5" fill="#78FC5A"/><rect x="25" y="49" width="42" height="24" rx="3" ry="3" fill="#fff"/><rect x="29" y="53" width="48" height="35" rx="5" ry="5" fill="#78FC5A"/><rect x="32" y="56" width="42" height="24" rx="3" ry="3" fill="#fff"/></svg>`;
        case 'txt':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#0086fe" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M23 16.5h-9 4.5v12-12Z"/><path fill="#F97316" stroke="#fff" stroke-width="3" stroke-linejoin="round" d="m29 28.5 8.5-12-4.25 6-4.25-6 8.5 12-4.25-6Z"/><path stroke="#fff" stroke-width="3" stroke-linejoin="round" d="M52 16.5h-9 4.5v12-12Z"/><path fill="#63bffe" d="M30 45h40v10h-4l-1-6h-7.5v37l7.5 1v3H35v-3l7.5-1V49H35l-1 6h-4Z"/></svg>`;
        case 'xml':
            return `<svg viewBox="0 0 100 100"><path fill="#fefefe" d="m70 0 20 20v70q0 10-10 10H20q-10 0-10-10V10Q10 0 20 0Z"/><path fill="#d5d5d5" d="m70 0 20 20H73q-3 0-3-3Z"/><path fill="#FE490F" d="M60 32q0 3-3 3H10v7q-4 0-4-5V13q0-3 3-3h48q3 0 3 3Z"/><path fill="#FE490F" stroke="#fff" stroke-width="3" stroke-linejoin="round" d="m14.5 28.5 8.5-12-4.25 6-4.25-6 8.5 12-4.25-6Zm15-8.5v8.5-12L34 24l4.5-7.5v12-12m6.5 0v12h8-8Z"/><path fill="#FF9E6B" d="M56 50h5L44 85h-5Zm24 21-15 8v-5l15-8-15-8v5l10 5.66L80 66m-60 5 15 8v-5l-15-8 15-8v5l-10 5.66L20 66"/></svg>`;
        case 'json':
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#FD7E14" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM384 128L256 0H64c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128z"/></svg>`;
        default:
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#6c757d" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64L256 0H64c-22.1 0-40 17.9-40 40V472c0 22.1 17.9 40 40 40H320c22.1 0 40-17.9 40-40V128z"/></svg>`; // Icon mặc định mới
    }
}




















// --- HÀM ẨN CÁC NÚT TƯƠNG TÁC ---
function hideInteractionButtons() {
    if (currentActiveMessageBox) {
        const buttons = currentActiveMessageBox.querySelectorAll('.interaction-button');
        buttons.forEach(button => {
            button.classList.remove('active');
            button.classList.add('hide');
            button.addEventListener('transitionend', function handler() {
                button.remove();
                button.removeEventListener('transitionend', handler);
            }, { once: true });
        });
        currentActiveMessageBox = null;
    }
}

// --- HÀM XỬ LÝ SỰ KIỆN CLICK VÀO MESSAGE BOX ---
function handleMessageBoxClick(event) {
    event.stopPropagation();
    if (currentActiveMessageBox && currentActiveMessageBox !== this) {
        hideInteractionButtons();
    }
    showInteractionButtons(this);
}

// --- Scroll to Bottom Button Functions ---
function isAtBottom() {
    if (!chatContentArea) return true;
    const threshold = 100;
    return chatContentArea.scrollTop + chatContentArea.clientHeight >= chatContentArea.scrollHeight - threshold;
}

function updateScrollButton() {
    if (!scrollToBottomBtn || (chatBubble && !chatBubble.classList.contains('expanded'))) {
        if (scrollToBottomBtn) scrollToBottomBtn.classList.remove('show');
        return;
    }
    if (isAtBottom()) {
        scrollToBottomBtn.classList.remove('show');
    } else {
        scrollToBottomBtn.classList.add('show');
    }
}

// --- Scroll to Bottom Function ---
function scrollToBottom() {
    if (chatContentArea) {
        chatContentArea.scrollTo({
            top: chatContentArea.scrollHeight,
            behavior: 'smooth'
        });
    }
}

// --- HÀM HIỂN THỊ THÔNG BÁO TẠM THỜI ---
function showTemporaryNotification(message) {
    const notificationBox = document.createElement('div');
    notificationBox.classList.add('temporary-notification');
    notificationBox.textContent = message;
    document.body.appendChild(notificationBox);
    setTimeout(() => notificationBox.classList.add('show'), 10);
    setTimeout(() => {
        notificationBox.classList.remove('show');
        notificationBox.addEventListener('transitionend', () => notificationBox.remove(), { once: true });
    }, 3000);
}


// --- HÀM HIỆN THỊ CÁC NÚT TƯƠNG TÁC (CẬP NHẬT) ---
function showInteractionButtons(messageBox) {
    hideInteractionButtons();
    currentActiveMessageBox = messageBox;

    // Kiểm tra loại message để quyết định icon cho button đầu tiên
    const messageIndex = messageBox.dataset.messageIndex;
    const isTextMessage = messageBox.querySelector('p') !== null;

    // Tạo button đầu tiên (copy hoặc download)
    const firstButton = document.createElement('div');
    firstButton.classList.add('interaction-button', 'blue');
    const firstImg = document.createElement('img');

    if (isTextMessage) {
        // Nếu là text message, dùng copy icon SVG
        const svgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="none" stroke="#fff" stroke-width="10" stroke-linejoin="round" d="M46 5H36h35q20 0 20 20v45-10"/><path fill="none" stroke="#fff" stroke-width="10" stroke-linejoin="round" d="M61 25q10 0 10 10v50q0 10-10 10H21q-10 0-10-10V35q0-10 10-10Z"/></svg>';
        firstImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
        firstImg.alt = 'Copy';
        firstButton.setAttribute('data-action', 'copy');
    } else {
        // Nếu là file message, dùng download icon SVG
        const downloadSvgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="none" stroke="#fff" stroke-width="10" stroke-linejoin="round" d="M50 5v65L25 45l25 25 25-25-25 25ZM9 80 5 70l4 10q6 15 21 15h40q15 0 21-15l4-10-4 10"/></svg>';
        firstImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(downloadSvgString);
        firstImg.alt = 'Download';
        firstButton.setAttribute('data-action', 'download');
    }

    firstButton.appendChild(firstImg);
    messageBox.appendChild(firstButton);
    // Tạo delete button (giữ nguyên)
    const deleteButton = document.createElement('div');
    deleteButton.classList.add('interaction-button', 'red');
    const deleteImg = document.createElement('img');
    const deleteSvgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round" d="M5 15h30V5h30v10h30v5H5Z"/><path fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round" d="m12 15 8 70q0 10 10 10h40q10 0 10-10l8-70Zm25 20 3 40Zm26 0-3 40Z"/></svg>';
    deleteImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(deleteSvgString);
    deleteImg.alt = 'Delete';
    deleteButton.appendChild(deleteImg);
    messageBox.appendChild(deleteButton);

    // Hiển thị buttons với animation
    setTimeout(() => {
        firstButton.classList.add('active');
        deleteButton.classList.add('active');
    }, 10);
    // Event listener cho button đầu tiên
    firstButton.addEventListener('click', function (event) {
        event.stopPropagation();

        const action = this.getAttribute('data-action');
        if (action === 'copy') {
            handleCopyText(messageBox);
        } else if (action === 'download') {
            handleDownloadFile(messageBox);
        }


        hideInteractionButtons();

    });
    // Event listener cho delete button (giữ nguyên)
    deleteButton.addEventListener('click', async function (event) {
        event.stopPropagation();
        const messageIndex = messageBox.dataset.messageIndex;

        // Đã xóa bỏ đoạn if (confirm(...))
        try {
            toolbarLoadingOverlay.classList.add('active');

            const response = await fetch(GAS_WEB_APP_URL + '?action=delete&index=' + messageIndex, {

                method: 'GET',
            });
            const result = await response.json();

            if (result.status === 'success') {
                console.log('Tin nhắn đã được xóa thành công.');
                await loadAllMessages(false);

                showTemporaryNotification('Đã xóa tin nhắn thành công!');
            } else {
                console.error('Lỗi khi xóa tin nhắn:', result.message);
                alert('Lỗi khi xóa tin nhắn: ' + result.message);
            }
        } catch (error) {

            console.error('Lỗi kết nối hoặc API khi xóa:', error);
            alert('Lỗi kết nối hoặc API: ' + error.message);
        } finally {
            toolbarLoadingOverlay.classList.remove('active');
        }
        hideInteractionButtons();
    });
}

// --- HÀM XỬ LÝ COPY TEXT ---
function handleCopyText(messageBox) {
    const textToCopy = messageBox.querySelector('p') ?
        messageBox.querySelector('p').textContent : '';
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Đã sao chép vào clipboard:', textToCopy);
                showTemporaryNotification('Đã sao chép!');
            })
            .catch(err => {

                console.error('Không thể sao chép:', err);
                alert('Không thể sao chép. Vui lòng thử lại hoặc sao chép thủ công.');
            });
    }
}

// --- Hàm format kích thước file ---
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// --- HÀM HỖ TRỢ RÚT GỌN TÊN FILE ---
function shortenFileName(fileName, maxLength = 35, isAudioFile = false) {
    if (isAudioFile) {
        return fileName;
    }

    const parts = fileName.split('.');
    const extension = parts.length > 1 ? '.' + parts.pop() : '';
    let nameWithoutExt = parts.join('.');

    if (nameWithoutExt.length + extension.length > maxLength) {
        const charsToShow = maxLength - extension.length - 3;
        if (charsToShow <= 0) {
            return fileName.substring(0, Math.max(0, maxLength - 3)) + '...';
        }
        return nameWithoutExt.substring(0, charsToShow) + '...' + extension;
    }
    return fileName;
}

















// Cấu hình Google Apps Script Web App URL
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxVaRVU65_OhQWNgAl0wdMqiAsIKgbYYYOWyVIVd5XNgDPmiRnXzejEuTFjgHwUYcte/exec';
// Khai báo biến toàn cục
let currentActiveMessageBox = null;
let chatContentArea = null;
let toolbarLoadingOverlay = null;
let scrollToBottomBtn = null;
let chatBubble = null;

// --- HÀM XỬ LÝ DOWNLOAD FILE (ĐÃ CẬP NHẬT) ---
function handleDownloadFile(messageBox) {
    const messageIndex = messageBox.dataset.messageIndex;
    const fileInfo = getFileInfoByMessageIndex(messageIndex);

    if (fileInfo && fileInfo.fileUrl) {
        let downloadUrl = fileInfo.fileUrl;
        const safeFileName = fileInfo.fileName || 'download_file';

        // Xử lý URL Dropbox để tải trực tiếp
        if (fileInfo.filePlatform === 'Dropbox' && downloadUrl.includes('dropbox.com')) {
            if (!downloadUrl.includes('raw=1')) {
                downloadUrl = downloadUrl.replace('dl=0', 'raw=1').replace('dl=1', 'raw=1');
                if (!downloadUrl.includes('raw=1')) {
                    downloadUrl += (downloadUrl.includes('?') ? '&' : '?') + 'raw=1';
                }
            }
        }
        // Cloudinary URL thường đã là link trực tiếp, không cần xử lý thêm

        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = safeFileName;
        downloadLink.style.display = 'none';

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        showTemporaryNotification('Đang tải xuống file...');
        console.log('Downloading file:', safeFileName, 'from URL:', downloadUrl);
    } else {
        alert('Không thể tải xuống file. URL không hợp lệ.');
        console.error('File info not found for message index:', messageIndex);
    }
}


// --- HÀM LẤY THÔNG TIN FILE THEO MESSAGE INDEX ---
function getFileInfoByMessageIndex(messageIndex) {
    if (window.messagesData && window.messagesData.messages) {
        const message = window.messagesData.messages.find(msg => msg.index.toString() === messageIndex.toString());
        if (message && message.type === 'file') {
            return {
                fileName: message.fileName,
                fileUrl: message.fileUrl,
                mimeType: message.mimeType,
                fileSize: message.fileSize,
                filePlatform: message.filePlatform, // Thêm platform
                fileId: message.fileId
            };
        }
    }
    return null;
}

function createSafeFileName(originalName) {
    if (/^[\x00-\x7F]*$/.test(originalName)) {
        return originalName;
    }
    const extension = originalName.split('.').pop();
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'));
    const timestamp = Date.now();
    return {
        original: originalName,
        safe: `file_${timestamp}.${extension}`,
        needsRename: true
    };
}

async function uploadFileToDropboxWithVietnamese(file, accessToken) {
    try {
        const fileNameInfo = createSafeFileName(file.name);
        const isComplexName = typeof fileNameInfo === 'object';
        const uploadName = isComplexName ? fileNameInfo.safe : fileNameInfo;
        const originalName = isComplexName ? fileNameInfo.original : fileNameInfo;
        const fileToUpload = isComplexName ? new File([file], uploadName, { type: file.type, lastModified: file.lastModified }) : file;
        const result = await uploadFileToDropbox(fileToUpload, accessToken);
        if (isComplexName) {
            try {
                await renameFileOnDropbox('/' + uploadName, '/' + originalName, accessToken);
                result.fileName = originalName;
            } catch (renameError) {
                console.warn('Could not rename file back to original name:', renameError);
            }
        }
        return result;
    } catch (error) {
        console.error('Upload with Vietnamese characters failed:', error);
        throw error;
    }
}

async function renameFileOnDropbox(fromPath, toPath, accessToken) {
    const response = await fetch('https://api.dropboxapi.com/2/files/move_v2', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from_path: fromPath,
            to_path: toPath,
            allow_shared_folder: false,
            autorename: false,
            allow_ownership_transfer: false
        })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error('Rename failed: ' + (error.error_summary || 'Unknown error'));
    }
    return await response.json();
}

async function uploadFileToDropboxSafe(file, accessToken) {
    const sanitizedName = sanitizeFileName(file.name);
    const fileToUpload = new File([file], sanitizedName, {
        type: file.type,
        lastModified: file.lastModified
    });
    return await uploadFileToDropbox(fileToUpload, accessToken);
}

// --- HÀM THÊM EVENT LISTENER CHO CÁC MESSAGE BOX ---
function addMessageBoxEventListeners() {
    document.querySelectorAll('.message-box').forEach(box => {
        box.removeEventListener('click', handleMessageBoxClick);
        box.addEventListener('click', handleMessageBoxClick);
    });
}

// --- HÀM TẢI TẤT CẢ TIN NHẮN VÀ HIỂN THỊ ---
async function loadAllMessages(scrollToEnd = false) {
    try {
        const response = await fetch(GAS_WEB_APP_URL + '?action=getAllMessages');
        const data = await response.json();
        if (data.status === 'success') {
            window.messagesData = data;
            chatContentArea.innerHTML = '';
            data.messages.forEach(message => {
                appendMessageToChat(message);
            });
            addMessageBoxEventListeners();
            if (scrollToEnd) {
                scrollToBottom();
            }
        } else {
            console.error("Lỗi khi tải tin nhắn:", data.message);
            alert("Không thể tải tin nhắn: " + data.message);
        }
    } catch (error) {
        console.error("Lỗi kết nối hoặc API khi tải tin nhắn:", error);
    }
}

// --- HÀM ESCAPE HTML ---
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// --- HÀM APPEND TIN NHẮN VÀO CHAT ---
function appendMessageToChat(message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    messageBox.dataset.messageIndex = message.index;

    let contentHtml = '';
    if (message.type === 'text') {
        const escapedText = escapeHtml(message.textContent);
        contentHtml = `<p>${escapedText}</p>`;
    } else if (message.type === 'file') {
        const fileExtension = message.fileName ? message.fileName.split('.').pop().toLowerCase() : '';
        const fileSizeFormatted = formatFileSize(message.fileSize);
        const fileIconSvg = typeof getFileIconSvg === 'function' ? getFileIconSvg(fileExtension) : '';
        const isAudio = message.mimeType.startsWith('audio/');
        const displayFileName = shortenFileName(message.fileName, 35, isAudio);
        if (message.mimeType.startsWith('image/')) {
            contentHtml = `<img src="${message.fileUrl}" alt="${escapeHtml(message.fileName)}" class="chat-image">`;
        } else if (message.mimeType.startsWith('video/')) {
            contentHtml = `<video controls src="${message.fileUrl}" class="chat-video"></video>`;
        } else if (isAudio) {
            contentHtml = `
                <div class="chat-audio">
                    <div class="file-info">
                        <div class="file-avatar-container svg">${fileIconSvg}</div>
                        <div class="file-details">
                            <span class="file-name">${escapeHtml(displayFileName)}</span>
                            <span class="file-size">${fileSizeFormatted}</span>
                        </div>
                    </div>
                    <audio controls src="${message.fileUrl}"></audio>
                </div>`;
        } else {
            contentHtml = `
                <div class="chat-file">
                    <div class="file-info">
                        <div class="file-avatar-container svg">${fileIconSvg}</div>
                        <div class="file-details">
                            <span class="file-name">${escapeHtml(displayFileName)}</span>
                            <span class="file-size">${fileSizeFormatted}</span>
                        </div>
                    </div>
                </div>`;
        }
    }

    messageBox.innerHTML = `
        <div class="message-content">
            ${contentHtml}
        </div>
    `;
    chatContentArea.appendChild(messageBox);
}

document.addEventListener('DOMContentLoaded', function () {
    chatBubble = document.getElementById('chat-bubble');
    const backgroundBlurChat = document.querySelector('.background-blur-chat');
    const sendButton = document.querySelector('.chat-toolbar .send-button');
    const textInput = document.querySelector('.chat-toolbar .text-input');
    chatContentArea = document.querySelector('.chat-content-area');
    toolbarLoadingOverlay = document.getElementById('toolbar-loading-overlay');
    const noteBackground = document.getElementById('note-background');
    const syncLoadingOverlay = document.getElementById('sync-loading-overlay');
    scrollToBottomBtn = document.getElementById('scroll-to-bottom-btn');
    const plusButton = document.querySelector('.plus-button');
    const fileInput = document.getElementById('file-input');

    async function initializeChat() {
        if (syncLoadingOverlay) {
            syncLoadingOverlay.classList.add('active');
        }
        try {
            await loadAllMessages(true);
        } catch (error) {
            console.error("Lỗi khi tải tin nhắn ban đầu:", error);
        } finally {
            if (syncLoadingOverlay) {
                syncLoadingOverlay.classList.remove('active');
            }
        }
    }

    initializeChat();
    if (chatContentArea) {
        chatContentArea.addEventListener('scroll', updateScrollButton);
    }

    if (scrollToBottomBtn) {
        scrollToBottomBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            scrollToBottom();
            setTimeout(() => {
                updateScrollButton();
            }, 300);
        });
    }

    if (chatBubble) {
        chatBubble.addEventListener('click', function (event) {
            if (!this.classList.contains('expanded')) {
                if (!event.target.closest('#note-background') && !event.target.closest('.chat-toolbar') && !event.target.closest('.message-box')) {
                    this.classList.add('expanded');
                    document.body.classList.add('no-scroll');
                    if (backgroundBlurChat) {
                        backgroundBlurChat.classList.add('active');
                    }
                    scrollToBottom();
                    setTimeout(updateScrollButton, 100);
                }
            }
        });
    }

    document.addEventListener('click', function (event) {
        if (currentActiveMessageBox && !currentActiveMessageBox.contains(event.target)) {
            hideInteractionButtons();
        }
        if (chatBubble.classList.contains('expanded') && !chatBubble.contains(event.target) && !event.target.closest('.chat-toolbar')) {
            chatBubble.classList.remove('expanded');
            document.body.classList.remove('no-scroll');
            if (backgroundBlurChat) {
                backgroundBlurChat.classList.remove('active');
            }
            if (scrollToBottomBtn) {
                scrollToBottomBtn.classList.remove('show');
            }
        }
    });
    if (noteBackground && syncLoadingOverlay && chatBubble) {
        noteBackground.addEventListener('click', async function (event) {
            event.stopPropagation();
            if (!chatBubble.classList.contains('expanded')) {
                chatBubble.classList.add('expanded');
                document.body.classList.add('no-scroll');
                if (backgroundBlurChat) {
                    backgroundBlurChat.classList.add('active');
                }
                scrollToBottom();
                setTimeout(updateScrollButton, 100);
                return;
            }
            if (chatBubble.classList.contains('expanded')) {
                syncLoadingOverlay.classList.add('active');
                try {
                    await loadAllMessages(true);
                    console.log("Đồng bộ dữ liệu từ Google Sheet thành công!");
                    showTemporaryNotification('Dữ liệu đã được đồng bộ!');
                } catch (error) {
                    console.error("Lỗi khi đồng bộ dữ liệu từ Google Sheet:", error);
                    alert("Lỗi khi đồng bộ dữ liệu: " + error.message);
                } finally {
                    syncLoadingOverlay.classList.remove('active');
                }
            }
        });
    }

    const maxTextAreaHeight = 400;
    const minTextAreaHeight = 40;
    if (textInput) {
        function adjustHeight() {
            const currentHeight = parseInt(textInput.style.height) || minTextAreaHeight;
            textInput.style.transition = 'none';
            textInput.style.height = 'auto';
            let newHeight = Math.max(Math.ceil(textInput.scrollHeight), minTextAreaHeight);
            if (newHeight > maxTextAreaHeight) {
                newHeight = maxTextAreaHeight;
                textInput.style.overflowY = 'auto';
            } else {
                textInput.style.overflowY = 'hidden';
            }
            if (Math.abs(newHeight - currentHeight) > 3) {
                textInput.style.height = currentHeight + 'px';
                textInput.offsetHeight;
                textInput.style.transition = 'height 0.3s ease';
                textInput.style.height = newHeight + 'px';
            } else {
                textInput.style.height = newHeight + 'px';
            }
        }
        textInput.addEventListener('input', adjustHeight);
        adjustHeight();
        window.addEventListener('resize', adjustHeight);
    }

    if (sendButton && textInput && chatContentArea && toolbarLoadingOverlay) {
        sendButton.addEventListener('click', async function () {
            const messageText = textInput.value.trim();
            if (messageText) {
                toolbarLoadingOverlay.classList.add('active');
                try {
                    const response = await fetch(GAS_WEB_APP_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify({ action: 'postMessage', message: messageText })
                    });
                    const result = await response.json();
                    if (result.status === 'success') {
                        textInput.value = '';
                        adjustHeight();
                        await loadAllMessages(true);
                        showTemporaryNotification('Đã gửi tin nhắn!');
                    } else {
                        alert('Lỗi khi gửi tin nhắn: ' + result.message);
                    }
                } catch (error) {
                    alert('Lỗi kết nối hoặc API: ' + error.message);
                } finally {
                    toolbarLoadingOverlay.classList.remove('active');
                }
            }
        });
        textInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendButton.click();
            }
        });
    }

    if (plusButton && fileInput) {
        plusButton.addEventListener('click', () => {
            fileInput.click();
        });
        fileInput.addEventListener('change', async (event) => {
            const files = event.target.files;
            if (files.length === 0) return;

            toolbarLoadingOverlay.classList.add('active');
            try {
                for (const file of files) {
                    await handleFileUpload(file);
                }
                showTemporaryNotification('Upload file thành công!');
                await loadAllMessages(true);
            } catch (error) {
                console.error('Lỗi trong quá trình tải lên:', error);
                alert('Lỗi trong quá trình tải lên: ' + error.message);
            } finally {
                toolbarLoadingOverlay.classList.remove('active');
                fileInput.value = '';
            }
        });
    }

    // --- HÀM XỬ LÝ TẢI LÊN TỆP (LOGIC MỚI) ---
    async function handleFileUpload(file) {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        const imageSizeLimit = 10 * 1024 * 1024; // 10MB
        const videoSizeLimit = 100 * 1024 * 1024; // 100MB

        let uploaded = false;
        // Ưu tiên Cloudinary cho ảnh và video trong giới hạn
        if ((isImage && file.size <= imageSizeLimit) || (isVideo && file.size <= videoSizeLimit)) {
            try {
                console.log(`Attempting to upload ${file.name} to Cloudinary...`);
                await uploadFileToCloudinary(file);
                uploaded = true;
            } catch (cloudinaryError) {
                console.warn(`Cloudinary upload failed for ${file.name}. Falling back to Dropbox. Error:`, cloudinaryError);
                // Không cần làm gì thêm, sẽ tự chuyển sang Dropbox
            }
        }

        // Nếu không phải ảnh/video, quá giới hạn, hoặc Cloudinary lỗi, dùng Dropbox
        if (!uploaded) {
            console.log(`Uploading ${file.name} to Dropbox...`);
            try {
                const tokenResponse = await fetch(GAS_WEB_APP_URL + '?action=getAccessToken');
                const tokenData = await tokenResponse.json();
                if (tokenData.status === 'success' && tokenData.dropboxAccessToken) {
                    await uploadFileToDropbox(file, tokenData.dropboxAccessToken);
                } else {
                    throw new Error('Không thể lấy Dropbox Access Token. ' + (tokenData.message || ''));
                }
            } catch (dropboxError) {
                console.error(`Dropbox upload failed for ${file.name}:`, dropboxError);
                throw dropboxError; // Ném lỗi nếu cả hai đều thất bại
            }
        }
    }

    // --- HÀM TẢI LÊN CLOUDINARY ---
    async function uploadFileToCloudinary(file) {
        // 1. Lấy chữ ký từ GAS
        const sigResponse = await fetch(GAS_WEB_APP_URL + '?action=getCloudinarySignature');
        const sigData = await sigResponse.json();

        if (sigData.status !== 'success') {
            throw new Error('Could not get Cloudinary signature: ' + sigData.message);
        }

        // 2. Chuẩn bị form data để tải lên
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', sigData.apiKey);
        formData.append('timestamp', sigData.timestamp);
        formData.append('signature', sigData.signature);

        const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
        const uploadUrl = `https://api.cloudinary.com/v1_1/${sigData.cloudName}/${resourceType}/upload`;
        // 3. Tải lên Cloudinary
        const uploadResponse = await fetch(uploadUrl, {
            method: 'POST',
            body: formData
        });
        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
            throw new Error('Cloudinary upload failed: ' + (uploadData.error ? uploadData.error.message : 'Unknown error'));
        }

        // 4. Lưu metadata vào Google Sheet
        await saveFileMetadataToSheet({
            fileName: file.name,
            fileSize: file.size,
            fileMimeType: file.type,
            filePlatform: 'Cloudinary',
            fileUrl: uploadData.secure_url,
            fileId: uploadData.public_id // Lưu public_id để xóa
        });
    }

    // --- HÀM TẢI LÊN DROPBOX ---
    async function uploadFileToDropbox(file, accessToken) {
        try {
            const path = '/' + file.name;
            const dropboxApiArg = JSON.stringify({
                path: path,
                mode: 'overwrite',
                autorename: false,
                mute: false
            });
            const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/octet-stream',
                    'Dropbox-API-Arg': dropboxApiArg
                },
                body: file
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Lỗi khi tải lên Dropbox: ' + (data.error_summary || 'Unknown error'));
            }

            let fileUrl = '';
            try {
                const shareResponse = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        path: data.path_lower,
                        settings: { requested_visibility: "public" }
                    })
                });
                const shareData = await shareResponse.json();
                if (shareResponse.ok) {
                    fileUrl = shareData.url.replace('dl=0', 'raw=1');
                } else if (shareData.error && shareData.error['.tag'] === 'shared_link_already_exists') {
                    const existingLinksResponse = await fetch('https://api.dropboxapi.com/2/sharing/list_shared_links', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ path: data.path_lower, direct_only: true })
                    });
                    const existingLinksData = await existingLinksResponse.json();
                    if (existingLinksResponse.ok && existingLinksData.links.length > 0) {
                        fileUrl = existingLinksData.links[0].url.replace('dl=0', 'raw=1');
                    }
                }
            } catch (shareError) {
                console.error('Error handling Dropbox shared link:', shareError);
                fileUrl = 'Error creating shared link';
            }

            await saveFileMetadataToSheet({
                fileName: file.name,
                fileSize: file.size,
                fileMimeType: file.type,
                filePlatform: 'Dropbox',
                fileUrl: fileUrl,
                fileId: data.id
            });
            return { success: true };
        } catch (error) {
            console.error('Dropbox upload failed:', error);
            throw error;
        }
    }

    // --- HÀM LƯU METADATA FILE VÀO GOOGLE SHEET ---
    async function saveFileMetadataToSheet(fileMetadata) {
        const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify({
                action: 'postFileMetadata',
                ...fileMetadata
            })
        });
        const result = await response.json();
        if (result.status !== 'success') {
            throw new Error('Lỗi khi lưu metadata file: ' + result.message);
        }
    }
});

