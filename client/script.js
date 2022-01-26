import { io } from 'socket.io-client'


const joiningRoomButton = document.getElementById("room-button")
const messageinput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")
const create = document.getElementById("create-button")

const socket = io('http://localhost:3000')

socket.on('connect', () => {
    displayMessage(`You -- ${socket.id}`)
})

socket.on("recieve-message", message => {
    displayMessage(message)
})

form.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageinput.value
    const room = roomInput.value

    if(message === "") return
    displayMessage(message)
    socket.emit('send-message', message, room)

    messageinput.value = ""
})

create.addEventListener("click", () => {

    roomInput.value = Math.round(Math.random() * (999999 - 100000) + 100000)
    console.log(roomInput.value)
    roomInput.innerHTML = create.value
})

joiningRoomButton.addEventListener("click", () => {
    const room = roomInput.value
    socket.emit("join-room", room)
})

function displayMessage(message) {
    const div = document.createElement("div")
    div.textContent = message
    document.getElementById("message-container").append(div)
}