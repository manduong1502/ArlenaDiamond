/* =============================================
   WISHLIST ENGINE — localStorage based
   ============================================= */
const WL_KEY = 'glueStore_wishlists';

window.WishlistEngine = {
  getAll: function() {
    try { return JSON.parse(localStorage.getItem(WL_KEY)) || []; }
    catch(e) { return []; }
  },

  save: function(lists) {
    localStorage.setItem(WL_KEY, JSON.stringify(lists));
  },

  createList: function(name) {
    const lists = this.getAll();
    // Ensure default list exists
    const newList = { id: 'wl_' + Date.now(), name: name || 'My Wishlist', products: [] };
    lists.push(newList);
    this.save(lists);
    return newList;
  },

  deleteList: function(id) {
    const lists = this.getAll().filter(l => l.id !== id);
    this.save(lists);
  },

  addProduct: function(listId, product) {
    const lists = this.getAll();
    const list = lists.find(l => l.id === listId);
    if (!list) return;
    if (!list.products.find(p => p.id === product.id)) {
      list.products.push(product);
      this.save(lists);
    }
    return list;
  },

  removeProduct: function(listId, productId) {
    const lists = this.getAll();
    const list = lists.find(l => l.id === listId);
    if (!list) return;
    list.products = list.products.filter(p => p.id !== productId);
    this.save(lists);
  },

  isInAnyList: function(productId) {
    return this.getAll().some(l => l.products.find(p => p.id === productId));
  }
};

/* ──────────────────────────────────────────
   WISHLIST MODAL
──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {

  /* Create modal DOM once */
  const modal = document.createElement('div');
  modal.id = 'wishlistModal';
  modal.innerHTML = `
    <div id="wishlistModalBackdrop" style="position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:19998;display:none;"></div>
    <div id="wishlistModalBox" style="
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      background:#fff;z-index:19999;width:90%;max-width:520px;
      box-shadow:0 8px 40px rgba(0,0,0,0.18);display:none;
      font-family:var(--font-base);
    ">
      <!-- Modal header -->
      <div style="padding:20px 24px 14px;border-bottom:1px solid #eee;display:flex;align-items:flex-start;gap:14px;">
        <img id="wlModalImg" src="" style="width:48px;height:60px;object-fit:cover;background:#f4f4f4;" />
        <div style="flex:1;">
          <div id="wlModalTitle" style="font-weight:700;font-size:14px;color:#111;line-height:1.4;"></div>
          <div id="wlModalVariant" style="font-size:11px;color:#888;margin-top:3px;"></div>
        </div>
        <button id="wlModalClose" style="background:none;border:none;font-size:20px;cursor:pointer;color:#444;padding:0;line-height:1;">×</button>
      </div>

      <!-- Lists section -->
      <div style="padding:16px 24px;">
        <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:12px;">Add To List</div>
        <div id="wlListCheckboxes" style="display:flex;flex-direction:column;gap:10px;max-height:200px;overflow-y:auto;"></div>
      </div>

      <!-- Footer buttons -->
      <div style="padding:14px 24px;border-top:1px solid #eee;display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <button id="wlCreateNewBtn" style="
          border:1.5px solid #111;background:none;padding:10px 18px;
          font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;
          cursor:pointer;color:#111;font-family:var(--font-base);
        ">CREATE NEW LIST</button>
        <button id="wlAddToListBtn" disabled style="
          background:#ccc;color:#fff;border:none;padding:10px 22px;
          font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;
          cursor:not-allowed;font-family:var(--font-base);
          transition:background 0.2s;
        ">ADD TO LIST</button>
      </div>

      <!-- Create new list input (hidden by default) -->
      <div id="wlNewListForm" style="display:none;padding:0 24px 16px;">
        <input id="wlNewListInput" type="text" placeholder="List name (e.g. My Wishlist)"
          style="width:100%;padding:10px 12px;border:1.5px solid #000;font-size:13px;font-family:var(--font-base);box-sizing:border-box;" />
        <div style="display:flex;gap:10px;margin-top:8px;">
          <button id="wlNewListCancel" style="flex:1;padding:9px;border:1px solid #ccc;background:none;cursor:pointer;font-size:12px;font-family:var(--font-base);">Cancel</button>
          <button id="wlNewListConfirm" style="flex:1;padding:9px;border:none;background:#111;color:#fff;cursor:pointer;font-size:12px;font-weight:700;font-family:var(--font-base);">CREATE</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  let currentProduct = null;
  let selectedListId = null;

  function openModal(product) {
    currentProduct = product;
    selectedListId = null;

    document.getElementById('wlModalImg').src = product.image || '';
    document.getElementById('wlModalTitle').textContent = product.title || '';
    document.getElementById('wlModalVariant').textContent = product.vendor || '';

    renderListCheckboxes();

    document.getElementById('wishlistModalBackdrop').style.display = 'block';
    document.getElementById('wishlistModalBox').style.display = 'block';
    document.getElementById('wlNewListForm').style.display = 'none';
    document.getElementById('wlAddToListBtn').disabled = true;
    document.getElementById('wlAddToListBtn').style.background = '#ccc';
    document.getElementById('wlAddToListBtn').style.cursor = 'not-allowed';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('wishlistModalBackdrop').style.display = 'none';
    document.getElementById('wishlistModalBox').style.display = 'none';
    document.body.style.overflow = '';
    currentProduct = null;
    selectedListId = null;
  }

  function renderListCheckboxes() {
    const lists = WishlistEngine.getAll();
    const container = document.getElementById('wlListCheckboxes');
    if (lists.length === 0) {
      container.innerHTML = '<div style="font-size:12px;color:#888;">No lists yet. Create one below.</div>';
      return;
    }
    container.innerHTML = lists.map(list => `
      <label style="display:flex;align-items:center;gap:12px;cursor:pointer;padding:6px 0;border-bottom:1px solid #f4f4f4;">
        <div style="width:36px;height:36px;background:#f4f4f4;flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden;">
          ${list.products[0] ? `<img src="${list.products[0].image}" style="width:100%;height:100%;object-fit:cover;" />` : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><path d="M4 4h16v16H4z"/></svg>'}
        </div>
        <span style="flex:1;font-size:13px;color:#111;">${list.name} <span style="color:#888;">(${list.products.length})</span></span>
        <input type="checkbox" data-listid="${list.id}" style="width:18px;height:18px;cursor:pointer;accent-color:#111;" />
      </label>
    `).join('');

    container.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', function() {
        // Only allow one selection
        container.querySelectorAll('input[type=checkbox]').forEach(other => {
          if (other !== this) other.checked = false;
        });
        selectedListId = this.checked ? this.dataset.listid : null;
        const btn = document.getElementById('wlAddToListBtn');
        btn.disabled = !selectedListId;
        btn.style.background = selectedListId ? '#111' : '#ccc';
        btn.style.cursor = selectedListId ? 'pointer' : 'not-allowed';
      });
    });
  }

  /* ── Close handlers ── */
  document.getElementById('wlModalClose').addEventListener('click', closeModal);
  document.getElementById('wishlistModalBackdrop').addEventListener('click', closeModal);

  /* ── Add to list ── */
  document.getElementById('wlAddToListBtn').addEventListener('click', function() {
    if (!selectedListId || !currentProduct) return;
    WishlistEngine.addProduct(selectedListId, currentProduct);
    // Update bookmark icon fill
    updateBookmarkIcons(currentProduct.id);
    closeModal();
    showWLToast('Added to wishlist ✓');
  });

  /* ── Create new list ── */
  document.getElementById('wlCreateNewBtn').addEventListener('click', function() {
    const form = document.getElementById('wlNewListForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    if (form.style.display === 'block') document.getElementById('wlNewListInput').focus();
  });

  document.getElementById('wlNewListCancel').addEventListener('click', function() {
    document.getElementById('wlNewListForm').style.display = 'none';
    document.getElementById('wlNewListInput').value = '';
  });

  document.getElementById('wlNewListConfirm').addEventListener('click', function() {
    const name = document.getElementById('wlNewListInput').value.trim();
    if (!name) return;
    WishlistEngine.createList(name);
    document.getElementById('wlNewListInput').value = '';
    document.getElementById('wlNewListForm').style.display = 'none';
    renderListCheckboxes();
  });

  /* ── Toast ── */
  function showWLToast(msg) {
    let toast = document.getElementById('wl-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wl-toast';
      toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);background:#111;color:#fff;padding:12px 24px;font-family:var(--font-base);font-size:13px;opacity:0;transition:all 0.3s ease;z-index:20000;pointer-events:none;white-space:nowrap;';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2500);
  }

  /* ── Update bookmark icon fill ── */
  function updateBookmarkIcons(productId) {
    document.querySelectorAll(`.bookmark-icon[data-product-id="${productId}"] path`).forEach(p => {
      p.setAttribute('fill', '#111');
    });
  }

  /* ── Init all bookmark icons ── */
  document.querySelectorAll('.bookmark-icon').forEach(icon => {
    const pid = parseInt(icon.dataset.productId);
    if (pid && WishlistEngine.isInAnyList(pid)) {
      const path = icon.querySelector('path');
      if (path) path.setAttribute('fill', '#111');
    }
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const card = this.closest('.grid-item');
      if (!card) return;
      const product = {
        id: parseInt(this.dataset.productId),
        title: this.dataset.title,
        vendor: this.dataset.vendor,
        price: parseInt(this.dataset.price),
        image: this.dataset.image,
        url: this.dataset.url
      };
      openModal(product);
    });
  });

  /* ── Expose globally ── */
  window.openWishlistModal = openModal;
});
