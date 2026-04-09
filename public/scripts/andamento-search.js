(function() {
  var items = window.__SEARCH_ITEMS__ || [];
  var input = document.getElementById('search-input');
  var list = document.getElementById('search-results');
  var wrap = document.getElementById('andamento-search');
  var activeIdx = -1;

  // Only autofocus on desktop
  if (window.innerWidth >= 768) input.focus();

  function render(matches) {
    list.innerHTML = '';
    activeIdx = -1;
    if (!matches.length) {
      wrap.classList.remove('andamento__search--open');
      return;
    }
    wrap.classList.add('andamento__search--open');
    matches.forEach(function(item, i) {
      var li = document.createElement('li');
      li.className = 'andamento__search-item';
      var a = document.createElement('a');
      a.href = item.path;
      a.className = 'andamento__search-link';
      var title = document.createElement('span');
      title.className = 'andamento__search-title';
      title.textContent = item.title;
      var type = document.createElement('span');
      type.className = 'andamento__search-type';
      type.textContent = item.type;
      a.appendChild(title);
      a.appendChild(type);
      li.appendChild(a);
      li.addEventListener('mouseenter', function() { setActive(i); });
      list.appendChild(li);
    });
  }

  function setActive(idx) {
    var items = list.querySelectorAll('.andamento__search-item');
    items.forEach(function(li) { li.classList.remove('andamento__search-item--active'); });
    activeIdx = idx;
    if (idx >= 0 && idx < items.length) {
      items[idx].classList.add('andamento__search-item--active');
    }
  }

  input.addEventListener('input', function() {
    var q = input.value.trim().toLowerCase();
    if (!q) { render([]); return; }
    var matches = items.filter(function(item) {
      return item.title.toLowerCase().indexOf(q) !== -1 ||
             item.type.toLowerCase().indexOf(q) !== -1 ||
             item.path.toLowerCase().indexOf(q) !== -1;
    });
    render(matches);
    if (matches.length) setActive(0);
  });

  input.addEventListener('keydown', function(e) {
    var items = list.querySelectorAll('.andamento__search-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIdx + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIdx - 1, 0));
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      var link = items[activeIdx].querySelector('a');
      if (link) window.location.href = link.href;
    } else if (e.key === 'Escape') {
      input.value = '';
      render([]);
      input.blur();
    }
  });

  // Close on click outside
  document.addEventListener('click', function(e) {
    if (!wrap.contains(e.target)) {
      render([]);
    }
  });

  // Reopen on focus if there's a query
  input.addEventListener('focus', function() {
    if (input.value.trim()) input.dispatchEvent(new Event('input'));
  });
})();
