// this is a partially revealing module pattern - just a variation on what we've already done


const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch
    let userButtons = document.querySelectorAll('.u-link'),
        lightbox = document.querySelector('.lightbox');

    function renderSocialMedia(socialMedia) {
        return `<ul class="u-social">
        ${socialMedia.map(item => `<li>${item}</li>`).join('')}
        </ul>`
    }

    function parseUserData(person) { // person is the database result
        let targetDiv = document.querySelector('.lb-content'),
        targetImg = lightbox.querySelector('img');

        let bioContent = `
            <p>${person.bio}</p>
            <h4>Social Media:</h4>
            ${renderSocialMedia(person.social)}
        `;

        console.log(bioContent);

        targetDiv.innerHTML = bioContent;
        targetImg.src = person.imgsrc;

        lightbox.classList.add('show-lb');
    }

    function getUserData(event) {
        event.preventDefault(); // kill default anchor behavior, no more link
        //debugger;
        let imgSrc = this.previousElementSibling.getAttribute('src'); // find image closest to the anchor tag property

        let url = `/users/${this.getAttribute('href')}`;

        fetch(url) // get data
            .then(res => res.json()) // parse JSON result into plain obj
            .then(data => {
                console.log('Database result is: ', data)

                data[0].imgsrc = imgSrc;

                parseUserData(data[0]);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    userButtons.forEach(button => button.addEventListener('click', getUserData));

    lightbox.querySelector('.close').addEventListener('click', function() {
        lightbox.classList.remove('show-lb');
    })
})();