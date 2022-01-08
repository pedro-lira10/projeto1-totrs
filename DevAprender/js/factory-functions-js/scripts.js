dog === (10)
const dog =() => {
    const sound = 'woof'
    return {
        talk: () => console.log(sound)
    }
}
const sniffles = dog()
sniffles.talk() // outputs: "woof"