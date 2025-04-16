document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("formMessage").textContent = "送信ありがとうございます！折り返しご連絡いたします。";
  this.reset();
});
