
fetch("/current_deck").then((response) => response.json()).then(json => renderDeckList(json))
window.setInterval(() => {
    fetch("/current_deck").then((response) => response.json()).then(json => renderDeckList(json))
}, 10000)


window.deck = '';

function renderDeckList(deck) {
    if (window.deck === deck.Id) {
        return
    } console.log(deck)
    window.deck = deck.Id;
    const deck_el = document.querySelector('#deck');
    deck_el.innerHTML = "";
    deck.Cards.forEach(element => {

        let name = element.CardDefId.replace(/([A-Z])/g, ' $1')
            .trim()
            .replace(/\s/, '-')
            .replace('13', '-13')
            .toLowerCase();

        if (name === 'starlord') {
            name = "star-lord"
        }
        if (name === 'infinaut') {
            name = "the-infinaut"
        }
        let deck_name = `Decklist`
        document.querySelector('#title').textContent = deck_name;

        let card = document.createElement("img");
        card.classList.add('card')
        card.src = `https://marvelsnapzone.com/wp-content/themes/blocksy-child/assets/media/cards/${name}.webp`;
        deck_el.appendChild(card)

    });


}