// Dữ liệu tĩnh đã được thay thế bằng Shopify Liquid
// import { homepageLookbooks, staticBanners, allProducts, megaMenuData } from './data.js'

/* ══════════════════════════════════════════════
   GLOBAL: Size click → Add to cart (all pages)
   ══════════════════════════════════════════════ */
function globalCartFormatMoney(cents) {
  return 'A$' + Math.round(cents / 100).toLocaleString('en-AU');
}

function globalUpdateCartBadge(count) {
  var badge = document.querySelector('.cart-badge');
  var cartBtn = document.getElementById('cartBtn');
  if (!cartBtn) return;
  if (count > 0) {
    if (badge) { badge.textContent = count; }
    else {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      badge.textContent = count;
      cartBtn.appendChild(badge);
    }
  } else {
    if (badge) badge.remove();
  }
}

function globalOpenCart() {
  var overlay = document.getElementById('cartOverlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Attach to all .size-avail on the page (collection, search, wishlist)
  document.querySelectorAll('.size-avail').forEach(function(span) {
    span.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var variantId = this.dataset.variantId;
      if (!variantId) return;

      // Visual feedback
      var overlay = this.closest('.size-overlay');
      if (overlay) {
        overlay.querySelectorAll('.size-avail').forEach(function(s) { s.style.textDecoration = 'none'; });
      }
      this.style.textDecoration = 'underline';
      this.style.textUnderlineOffset = '3px';

      var el = this;
      var orig = el.textContent;
      el.textContent = '…';
      el.style.pointerEvents = 'none';

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(variantId), quantity: 1 })
      })
      .then(function(r) { return r.json(); })
      .then(function() { return fetch('/cart.js'); })
      .then(function(r) { return r.json(); })
      .then(function(cart) {
        globalUpdateCartBadge(cart.item_count);
        if (typeof cartRenderItems === 'function') cartRenderItems(cart);
        globalOpenCart();
      })
      .catch(function(err) { console.error('ATC error', err); })
      .finally(function() {
        el.textContent = orig;
        el.style.pointerEvents = 'auto';
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  /* --- 1. Mobile Hamburger Menu --- */
  const menuBtn = document.querySelector('.header__menu-btn');
  const body = document.body;

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      body.classList.toggle('mobile-menu-active');
      
      // Khóa scroll khi mở menu
      if (body.classList.contains('mobile-menu-active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });
  }

  // Đóng menu khi click vào một link
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('mobile-menu-active');
      body.style.overflow = '';
    });
  });

  /* --- 2. Xử lý Header khi Scroll --- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  /* --- 3. Animation On Scroll --- */
  // Fade-in animation on scroll using IntersectionObserver
  const faders = document.querySelectorAll('.fade-up');
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // ==========================================
  // MEGA MENU LOGIC (DYNAMIC HOVER)
  // ==========================================
  const headerLeftLinks = document.querySelectorAll('.header__left a');
  const megaMenu = document.getElementById('megaMenu');
  const megaMenuContent = document.getElementById('megaMenuContent');
  const closeBtn = document.getElementById('closeMegaMenu');
  
  if(megaMenu && megaMenuContent && closeBtn) {
    let hoverTimeout;
    
    headerLeftLinks.forEach(link => {
      link.addEventListener('mouseenter', (e) => {
        const text = e.target.textContent.toLowerCase().trim();
        // Kiểm tra xem text có trong megaMenuData không
        if (typeof megaMenuData !== 'undefined' && megaMenuData[text]) {
          clearTimeout(hoverTimeout);
          megaMenu.classList.add('active');
          
          // Render HTML for this category
          const colsHtml = megaMenuData[text].map(col => {
            const linksHtml = col.items.map(item => {
              // Convert text like 'New Arrivals' to 'new-arrivals'
              const subHandle = item.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
              // Đặc biệt: "View all clothing" -> trỏ về clothing, etc...
              return `<a href="/collection.html?handle=${text}&sub=${subHandle}" style="display:block; margin-bottom:12px; color:black; text-decoration:none;">${item}</a>`;
            }).join('');
            
            return `
              <div class="mega-menu__col" style="flex: 1; min-width: 150px;">
                <span class="mega-menu__title" style="display:block; font-weight:bold; margin-bottom:20px; font-size:11px; text-transform:uppercase;">${col.title}</span>
                ${linksHtml}
              </div>
            `;
          }).join('');
          
          megaMenuContent.innerHTML = colsHtml;
        } else {
           // Đóng nếu hover vào link không có menu (như HOME)
           megaMenu.classList.remove('active');
        }
      });
    });

    const headerEl = document.querySelector('.header');
    if (headerEl) {
      headerEl.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
          megaMenu.classList.remove('active');
        }, 300);
      });
    }
    
    megaMenu.addEventListener('mouseenter', () => clearTimeout(hoverTimeout));
    megaMenu.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => { megaMenu.classList.remove('active'); }, 300);
    });

    closeBtn.addEventListener('click', () => megaMenu.classList.remove('active'));
  }

  // ==========================================
  // DYNAMIC COLLECTION TITLE & DESC
  // ==========================================
  const collectionTitleEl = document.getElementById('dynamic-collection-title');
  if (collectionTitleEl) {
    const urlParams = new URLSearchParams(window.location.search);
    const handle = urlParams.get('handle');
    if (handle) {
      const formattedTitle = handle.replace(/-/g, ' ').toUpperCase();
      collectionTitleEl.textContent = formattedTitle;
      document.title = "Arlena - " + formattedTitle;
      
      const backLinkEl = document.getElementById('back-link-text');
      if (backLinkEl) backLinkEl.textContent = handle === 'man' ? 'Man' : 'Woman';

      // SUB NAV ACTIVE STATE
      // Thêm class active cho link đang được chọn ở sub-nav
      const subNavLinks = document.querySelectorAll('.sub-nav-links a');
      subNavLinks.forEach(link => {
        if(link.getAttribute('href').includes(handle)) {
           link.classList.add('active');
        } else {
           link.classList.remove('active');
        }
      });

      const descEl = document.getElementById('dynamic-collection-desc');
      // Set default video
      window.currentCollectionVideo = "https://cdn.acnestudios.com/video/products/A20931-ALG/A20931-ALG-default-mobile.mp4";

      if (descEl) {
        if (handle === 'woman') descEl.textContent = "Soft satin dresses meet shirts and suits in fluid fabrics, creating relaxed silhouettes for SS26.";
        else if (handle === 'fluid-dressing') {
           descEl.textContent = "Soft satin dresses meet shirts and suits in fluid fabrics, creating relaxed silhouettes for SS26.";
           window.currentCollectionVideo = "https://cdn.acnestudios.com/video/products/FN-WN-OUTW001018_Pink_grey/FN-WN-OUTW001018_Pink_grey-default-mobile.mp4"; // Example alternative video
        }
        else if (handle === 'new-arrivals') {
           descEl.textContent = "Discover our latest arrivals. The newest pieces embodying our signature aesthetic.";
        }
        else if (handle === 'runway-collection') {
           descEl.textContent = "Key looks and standout pieces straight from our Spring/Summer 26 runway presentation.";
        }
        else if (handle === 'seasonal-denim') {
           descEl.textContent = "Classic silhouettes and new fits in unique washes. Explore our seasonal denim selection.";
        }
        else if (handle === 'logo-garments') {
           descEl.textContent = "Archive-inspired essentials featuring our iconic 1996 logo.";
        }
        else if (handle === 'man') descEl.textContent = "Tailored outwear, relaxed denim, and elevated basics defining the modern man.";
        else if (handle === 'shoes') descEl.textContent = "From chunky boots to sleek formalwear, step into luxury with our latest footwear.";
        else if (handle === 'bags') descEl.textContent = "Sculptural silhouettes and premium leathers crafted to carry your world.";
        else descEl.textContent = "Discover our exclusive curation of modern design and effortless aesthetics.";
      }
    }
  }

  // ==========================================
  // DYNAMIC RENDERINGS REMOVED FOR SHOPIFY LIQUID
  // ==========================================
});
// ==========================================
// SEARCH OVERLAY LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const searchProductsGrid = document.getElementById('searchProductsGrid');

  if (searchBtn && searchOverlay && closeSearch) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Ngăn cuộn trang nền

      // Random 8 sản phẩm gợi ý (Đã chuyển sang dùng Liquid rendering hoac API Ajax)
    });

    closeSearch.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Đóng khi click ngoài vùng (nếu cần)
    // Thực ra Form Search này trượt ra từ bên phải nên có thể không cần.
  }
});

// ==========================================
// PDP LOGIC (PRODUCT DETAIL PAGE) 
// Slider actions are still needed, data injections are removed.
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const pdpGallery = document.getElementById('pdp-gallery');
  
  // Slider Controls
  if (pdpGallery) {
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        pdpGallery.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        pdpGallery.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
      });
    }
  }
});

// ==========================================
// MOBILE MENU & CART OVERLAY LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  if (mobileMenuBtn && mobileMenu && closeMobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden'; // Chống cuộn nền
    });

    closeMobileMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // --- Cart Drawer ---
  const cartBtn = document.getElementById('cartBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');

  if (cartBtn && cartOverlay && closeCart) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Removed static Flow blocks to allow standard Shopify E-commerce behavior
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeCart.addEventListener('click', () => {
      cartOverlay.classList.remove('active');
      document.body.style.overflow = '';
      // Clear flag url if present
      const url = new URL(window.location);
      if (url.searchParams.get('opencart')) {
        url.searchParams.delete('opencart');
        window.history.replaceState({}, '', url);
      }
    });

    // Auto open cart if returning from Policy Success
    if (new URLSearchParams(window.location.search).get('opencart') === 'true') {
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
});

// ==========================================
// FOOTER ACCORDION LOGIC
// ==========================================
function fixFooterDesktop() {
  const accordions = document.querySelectorAll('.rl-accordion');
  if(window.innerWidth > 768) {
    accordions.forEach(a => a.setAttribute('open', ''));
  } else {
    // Drop open attribute on mobile to allow manual toggle
    accordions.forEach(a => {
       // Only close if it's naturally rendered, don't interrupt active user reading
       if(!a.hasAttribute('data-touched')) {
         a.removeAttribute('open');
       }
       
       // Mark when user touches it
       a.addEventListener('click', () => {
         a.setAttribute('data-touched', 'true');
       }, {once: true});
    });
  }
}
window.addEventListener('resize', fixFooterDesktop);
document.addEventListener('DOMContentLoaded', fixFooterDesktop);
// Run immediately as well
fixFooterDesktop();
