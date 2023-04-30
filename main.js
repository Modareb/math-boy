
const results = []
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const checked = []
for (let i = 0; i < numbers.length; i++) {
    const a = numbers[i]
    for (let y = 0; y < numbers.length; y++) {
        const b = numbers[y]
        if (checked.includes(a + ',' + b) || checked.includes(b + ',' + a)) {
            // pass
            continue
        }
        checked.push(a + ',' + b)

        const product = a * b
        const pos = results.findIndex(r => r[0] === product)
        if (pos !== -1) {
            results[pos].push([a, b])
        } else {
            results.push(
                [product, [a, b]]
            )
        }
    }
}

const sorted = [...results].sort((a, b) => (a[0] - b[0]))

function numbersOf(n) {
    return sorted.filter(e => e.length === (n + 1)).map(e => {
        return [e[0], e.slice(1).map(e => `<div class='right'>${e[0]}</div><div class='middle'>x</div><div class='left'>${e[1]}</div>`).join(',')]
    })
}

const data = [numbersOf(3), numbersOf(2), numbersOf(1)]

const items = document.querySelector('.items');

data.forEach((dt, dtIndex) => {
    dt.forEach(n => {
        items.insertAdjacentHTML('beforeend', `
        <div role='button' tabindex="0" class="item" data-data-index="${dtIndex}" data-answer="${n[1]}">
            <div class="num">${n[0]}</div>
        </div>
        `)
    })
})

const itemsChildren = Array.from(document.querySelectorAll('.item'));
const answerDiv = document.querySelector('.answer')
const answerText = answerDiv.querySelector('.text');

answerDiv.onclick = function () {
    answerDiv.classList.remove('visible')
}

itemsChildren.forEach(item => {
    item.addEventListener('click', function () {
        let self = this
        answerText.innerHTML = "<ul>" + self.dataset.answer.split(',').map(e => "<li>" + e + "</li>").join('') + "</ul>"
        answerDiv.classList.add('visible')
    })
})



window.addEventListener('load', function () {
    window.history.pushState({ noBackExitsApp: true }, '')
})

window.addEventListener('popstate', function (event) {
    if (event.state && event.state.noBackExitsApp) {
        window.history.pushState({ noBackExitsApp: true }, '')
    }
})