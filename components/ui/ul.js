export const tagName = 'ul'

export const items = []
export default function (...args) {
    const inputs = args.flat()
    inputs.forEach(input => {
        if (typeof input === 'string'){
            const li = document.createElement('li')
            li.innerText = input
            this.esElement.appendChild(li)
            items.push(input)
        }
    })
    return [items]
}