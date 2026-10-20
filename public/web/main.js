// to.Morrow「Web制作・運用」LP の動き
// 1. スクロールで軽くフェードイン
// 2. スマホ下部の申し込みボタンを、フォームが見えている間は隠す
// 3. お問い合わせフォームの入力チェックと送信（送信先は index.html の form の action）
// 4. フォントの読み込み（使っている文字だけ）
// 5. アクセス計測の読み込み（表示が終わってから）

(function () {
  'use strict';

  // フォーム送信時などに JavaScript から表示する文章（フォントの文字集めにも使います）
  var TEXT = {
    valueMissing: 'この項目を入力してください。',
    typeMismatch: 'メールアドレスの形をご確認ください（例：info@example.com）。',
    invalid: '入力が足りない項目があります。赤い欄をご確認ください。',
    noEndpoint: '（制作者向け）フォームの送信先がまだ設定されていません。index.html の form の action を差し替えてください。',
    sending: '送信しています…',
    success: '送信しました。ありがとうございます。内容を確認して、メールでご連絡します。',
    error: '送信できませんでした。お手数ですが、少し時間をおいてもう一度お試しください。'
  };

  // ---------- 4. フォント ----------
  // 日本語フォントは丸ごと読むと重いので、ページ内で使っている文字だけを Google Fonts に頼みます。
  // 文章を書き換えても、ここが自動で文字を集め直すので作業は要りません。
  var FONT_FAMILIES = 'family=Noto+Sans+JP:wght@400;700&family=Zen+Kaku+Gothic+New:wght@700';

  function loadFonts() {
    var text = document.body.textContent;
    document.querySelectorAll('[placeholder]').forEach(function (el) { text += el.placeholder; });
    Object.keys(TEXT).forEach(function (k) { text += TEXT[k]; });
    var seen = {};
    var chars = '';
    Array.from(text.replace(/\s/g, '')).forEach(function (c) {
      if (!seen[c]) { seen[c] = true; chars += c; }
    });
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?' + FONT_FAMILIES + '&display=swap&text=' + encodeURIComponent(chars);
    document.head.appendChild(link);
  }
  // 文字の表示を先に済ませてから、フォントを読み込む
  if (document.readyState === 'complete') loadFonts();
  else window.addEventListener('load', loadFonts);

  // ---------- 5. アクセス計測（表示が終わってから読み込む） ----------
  window.addEventListener('load', function () {
    var start = function () {
      var s = document.createElement('script');
      s.src = '/analytics.js';
      document.head.appendChild(s);
    };
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 3000 });
    else setTimeout(start, 1500);
  });

  // ---------- 1. フェードイン ----------
  var fades = document.querySelectorAll('.fade');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduce) {
    fades.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    fades.forEach(function (el) { fadeObserver.observe(el); });
  }

  // ---------- 2. スマホ下部のボタン ----------
  var sticky = document.getElementById('sticky-cta');
  var contact = document.getElementById('contact');
  var hero = document.getElementById('top');

  if (sticky && contact && hero && 'IntersectionObserver' in window) {
    var heroVisible = true;
    var contactVisible = false;
    var update = function () {
      sticky.classList.toggle('is-hidden', heroVisible || contactVisible);
    };
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (e) { contactVisible = e[0].isIntersecting; update(); }).observe(contact);
    update();
  }

  // ---------- 3. フォーム ----------
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var button = form.querySelector('button[type="submit"]');

  function showError(field) {
    clearError(field);
    var v = field.validity;
    var text = v.valueMissing ? TEXT.valueMissing : v.typeMismatch ? TEXT.typeMismatch : '';
    if (!text) return;
    var p = document.createElement('p');
    p.className = 'form__error';
    p.id = field.id + '-error';
    p.textContent = text;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', p.id);
    field.insertAdjacentElement('afterend', p);
  }

  function clearError(field) {
    var old = document.getElementById(field.id + '-error');
    if (old) old.remove();
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }

  var fields = form.querySelectorAll('input[id], textarea[id]');
  fields.forEach(function (field) {
    field.addEventListener('blur', function () {
      if (field.value !== '') field.checkValidity() ? clearError(field) : showError(field);
    });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') && field.checkValidity()) clearError(field);
    });
  });

  function setStatus(text, type) {
    status.textContent = text;
    status.className = 'form__status' + (type ? ' is-' + type : '');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var firstInvalid = null;
    fields.forEach(function (field) {
      if (!field.checkValidity()) {
        showError(field);
        if (!firstInvalid) firstInvalid = field;
      } else {
        clearError(field);
      }
    });
    if (firstInvalid) {
      firstInvalid.focus();
      setStatus(TEXT.invalid, 'error');
      return;
    }

    if (form.action.indexOf('XXXXXXXX') !== -1) {
      setStatus(TEXT.noEndpoint, 'error');
      return;
    }

    button.disabled = true;
    setStatus(TEXT.sending, '');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('send failed');
        form.reset();
        setStatus(TEXT.success, 'success');
      })
      .catch(function () {
        setStatus(TEXT.error, 'error');
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
