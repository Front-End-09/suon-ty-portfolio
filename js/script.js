document.addEventListener("DOMContentLoaded", function() {
    let words = document.querySelectorAll(".word");
    words.forEach((word) => {
        let letters = word.textContent.split("");
        word.textContent = "";
        letters.forEach((letter) => {
            let span = document.createElement("span");
            span.textContent = letter;
            span.className = letter;
            word.append(span);
        });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";

    let changeText = () => {
        let currentWord = words[currentWordIndex];
        let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

        Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
                letter.className = "letter out";
            }, i * 80);
        });

        nextWord.style.opacity = "1";
        Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = "letter behind";
            setTimeout(() => {
                letter.className = "letter in";
            }, 340 + i * 80);
        });
        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };
    changeText();
    setInterval(changeText, 3000);

    // Circle Skill
    const circles = document.querySelectorAll('.circle');
    circles.forEach(elem => {
        var dots = elem.getAttribute("data-dots");
        var marked = elem.getAttribute("data-parent");
        var percent = Math.floor(dots * marked / 100);
        var points = "";
        var rotate = 360 / dots;

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i};--rot:${rotate}deg"></div>`;
        }
        elem.innerHTML = points;

        const pointsMarked = elem.querySelectorAll('.points');
        for (let i = 0; i < percent; i++) {
            pointsMarked[i].classList.add('marked');
        }
    });

    // MixItUp
    if (typeof mixitup !== 'undefined') {
        var mixer = mixitup('.portfolio-gallery');
    }

    // Active Menu
    let menuli = document.querySelectorAll('header ul li a');
    let section = document.querySelectorAll('section');

    function activeMenu() {
        let len = section.length;
        while (--len && window.scrollY + 97 < section[len].offsetTop) {}
        menuli.forEach(sec => sec.classList.remove("active"));
        menuli[len].classList.add("active");
    }

    activeMenu();
    window.addEventListener("scroll", activeMenu);

    // Sticky Navbar
    var header = document.getElementById('header');
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("sticky", window.scrollY > 50);
        });
    }

    // Toggle icon navbar
    let menuIcon = document.querySelector("#menu-icon");
    let navlist = document.querySelector(".navlist");

    menuIcon.onclick = () => {
        menuIcon.classList.toggle("bx-x");
        navlist.classList.toggle("open");
    };

    // Close sidebar when a menu item is clicked
    menuli.forEach((menuItem) => {
        menuItem.onclick = () => {
            menuIcon.classList.remove("bx-x");
            navlist.classList.remove("open");
        };
    });

    // Parallax
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-items");
            } else {
                entry.target.classList.remove("show-items");
            }
        });
    });

    const scrollScale = document.querySelectorAll(".scroll-scale");
    scrollScale.forEach((el) => observer.observe(el));

    const scrollBottom = document.querySelectorAll(".scroll-bottom");
    scrollBottom.forEach((el) => observer.observe(el));

    const scrollTop = document.querySelectorAll(".scroll-top");
    scrollTop.forEach((el) => observer.observe(el));


    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let spots = [];
    let hue = 0;

    const mouse = {
        x: undefined,
        y: undefined
    }

    canvas.addEventListener('mousemove', function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        for(let i = 0; i < 3; i++){
            spots.push(new Particle());
        }
    });

    class Particle{
        constructor(){
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 2 + 0.3;
            this.speedX = Math.random() * 2 - 1; // Corrected speedX range
            this.speedY = Math.random() * 2 - 1; // Corrected speedY range
            this.color = '#12f7ff';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.size > 0.1) this.size -= 0.03;
        }
        draw(){
            ctx.fillStyle = this.color; // Corrected fillStyle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function handleParticle(){
        for(let i = 0; i < spots.length; i++){
            spots[i].update();
            spots[i].draw();
            for(let j = i; j < spots.length; j++){
                const dx = spots[i].x - spots[j].x;
                const dy = spots[i].y - spots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < 90){
                    ctx.beginPath();
                    ctx.strokeStyle = spots[i].color;
                    ctx.lineWidth = spots[i].size / 10; // Corrected lineWidth
                    ctx.moveTo(spots[i].x, spots[i].y);
                    ctx.lineTo(spots[j].x, spots[j].y); // Connects to a different particle
                    ctx.stroke();
                }
            }
            if(spots[i].size <= 0.3){
                spots.splice(i, 1);
                i--;
            }
        }
    }

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticle();
        hue++;
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        // Removed the undefined `init` function call
    });

    window.addEventListener('mouseout', function(){
        mouse.x = undefined;
        mouse.y = undefined;
    });

    animate(); // Call animate to start the animation
});
