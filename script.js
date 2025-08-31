const form         = document.getElementById('contactForm');
const button       = document.getElementById('send-button');
const nameField    = document.getElementById('name-field');
const emailField   = document.getElementById('email-field');
const messageField = document.getElementById('message-field');
const errName      = document.getElementById('err-name');
const errEmail     = document.getElementById('err-email');
const errMessage   = document.getElementById('err-message');
const msgArea      = document.getElementById('formMessage');
// 実用的なメール形式チェック（ブラウザの <input type="email"> も併用推奨）
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
function setError(el, errEl, msg) {
  el.classList.add('is-error');
  el.setAttribute('aria-invalid', 'true');
  errEl.textContent = msg;
}
function clearError(el, errEl) {
  el.classList.remove('is-error');
  el.removeAttribute('aria-invalid');
  errEl.textContent = '';
}
// 入力中にエラーを消す（メールは形式も見る）
[[nameField, errName], [emailField, errEmail], [messageField, errMessage]].forEach(([el, errEl]) => {
  el.addEventListener('input', () => {
    const v = el.value.trim();
    if (el === emailField) {
      if (v && emailRegex.test(v)) clearError(el, errEl);
    } else {
      if (v) clearError(el, errEl);
    }
  });
});
function validateAll() {
  let firstInvalid = null;
  // お名前
  if (nameField.value.trim() === '') {
    setError(nameField, errName, 'お名前を入力してください。');
    firstInvalid = firstInvalid || nameField;
  } else {
    clearError(nameField, errName);
  }
  // メール
  const emailVal = emailField.value.trim();
  if (emailVal === '') {
    setError(emailField, errEmail, 'メールアドレスを入力してください。');
    firstInvalid = firstInvalid || emailField;
  } else if (!emailRegex.test(emailVal) || !emailField.checkValidity()) {
    setError(emailField, errEmail, 'メールアドレスの形式が正しくありません。');
    firstInvalid = firstInvalid || emailField;
  } else {
    clearError(emailField, errEmail);
  }
  // お問い合わせ内容
  if (messageField.value.trim() === '') {
    setError(messageField, errMessage, 'お問い合わせ内容を入力してください。');
    firstInvalid = firstInvalid || messageField;
  } else {
    clearError(messageField, errMessage);
  }
  return firstInvalid;
}
async function handleSubmit(e) {
  if (e) e.preventDefault(); 
  if (msgArea) {
    msgArea.className = 'message-area';
    msgArea.textContent = '';
  }
  const firstInvalid = validateAll();
  if (firstInvalid) {
    firstInvalid.focus();
    if (msgArea) {
      msgArea.textContent = '未入力または形式に誤りがあります。各項目をご確認ください。';
      msgArea.classList.add('is-error');
    }
    return;
  }
  const original = button.textContent;
  button.textContent = '送信中…';
  button.disabled = true;
  try {
    const fd = new FormData(form);
    // （任意）reCAPTCHA v3 を使う場合
    // const token = await getRecaptchaToken(); // 事前に定義しておく
    // fd.append('recaptchaToken', token);
    const res = await fetch('/api/contact', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('send_failed');
    // 返り値を確認したい場合：
    // const data = await res.json();
    // if (!data.ok) throw new Error('send_failed');
    // 成功したのでメッセージを表示（ここでだけ msgArea を触る）
    if (msgArea) {
      msgArea.textContent = '送信が完了しました。担当よりご連絡いたします。';
      msgArea.classList.add('is-success');
    }
    // form.reset(); // 送信後クリアしたい場合
  } catch (err) {
    if (msgArea) {
      msgArea.textContent = '送信に失敗しました。時間をおいて再度お試しください。';
      msgArea.classList.add('is-error');
    }
  } finally {
    button.textContent = original;
    button.disabled = false;
  }
}
if (button) button.addEventListener('click', handleSubmit);
// Enter送信にも対応したい場合
if (form) form.addEventListener('submit', handleSubmit);
const targets = document.querySelectorAll(
  '.card, .card-grid-item, #card1, #card2, #card3'
);
targets.forEach((el, i) => {
  el.classList.add('reveal');
  const delay = (i % 4) * 100;
  el.setAttribute('data-delay', String(delay));
});
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
}, {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1
});
targets.forEach(el => io.observe(el));
