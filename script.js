document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('response').innerText = "Thank you for reaching out, " + document.getElementById('name').value + "!";
    document.getElementById('contactForm').reset();
    document.getElementById('response').style.opacity = "1";
    setTimeout(function () {
        document.getElementById('response').style.opacity = "0";
    }, 2500);
});
