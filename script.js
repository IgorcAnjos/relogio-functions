const hoursHand = document.querySelector('.hand.hours')
const minutesHand = document.querySelector('.hand.minutes')
const secondsHand = document.querySelector('.hand.seconds')
let timer
const setRotation = (element, rotationPercentage) => {
  element.style.setProperty("--rotation", rotationPercentage * 360)
}


const setClock = () => {
  const currentDate = new Date()

  const secondsPercentage = currentDate.getSeconds() / 60
  const minutesPercentage =(secondsPercentage + currentDate.getMinutes()) / 60
  const hoursPercentage = (minutesPercentage + currentDate.getHours()) / 12

  setRotation(secondsHand, secondsPercentage)
  setRotation(minutesHand, minutesPercentage)
  setRotation(hoursHand, hoursPercentage)

  timer = setTimeout(setClock, 500)
}

setClock()

let timeHora
let timePomodoro
let timeCronometro

const componenteHora = document.querySelector('#hora')
const componentePopupHora = document.querySelector('#wrapper-hora')
const pararexecucao = document.getElementById('popup-close-hora')
const botaoHoraAtual = document.querySelector('.botao-hora') 

botaoHoraAtual.addEventListener('click', horario = () => {

  // Declarando variáveis de hora, minuto e segundo.
  let hora = new Date().getHours()
  let minutos = new Date().getMinutes()
  let segundos = new Date().getSeconds()

  // Conferindo condições de formatação de horário --> 00:00:00
  if (segundos < 10) {
    segundos = `0${segundos}`
  }
  if (minutos < 10) {
    minutos = `0${minutos}`
  }
  if (hora < 10) {
    hora = `0${hora}`
  }

  // mostrando no componente htmls
  componentePopupHora.style.display = 'block'
  componenteHora.innerHTML = ''
  componenteHora.innerHTML = `${hora}:${minutos}:${segundos}`

  // Configurando loop de atualização de hora
  timeHora = setTimeout(horario, 1000);
})

// parandro loop de Hora Atual
componentePopupHora.addEventListener('click', event => {
  const comandoFechar = event.target.classList[0]
  const listaParaFechar = ['popup-close', 'popup-wrapper']
  const fechar = listaParaFechar.some(listaParaFechar => listaParaFechar === comandoFechar)
  
  if (fechar) {
    componentePopupHora.style.display = 'none'
    clearTimeout(timeHora)
  }
})

// Configurando Relógio Pomodoro.
const componentePomoro = document.querySelector('#pomodoro')
const componentePopupPomodoro = document.querySelector('#wrapper-pomodoro')
const pararExecucaoPomodoro = document.getElementById('.popup-close-pomodoro')
const botaoPomodoro = document.querySelector('.botao-pomodoro') 
const botaoInicioPomodoro = document.getElementById('botao-inicio-pomodoro')
const botaoPararPomodoro = document.getElementById('botao-pausa-pomodoro')

botaoPararPomodoro.style.display = 'none'

// Abrir Popup Pomodoro
botaoPomodoro.addEventListener('click', AbrirPopupPomodoro = () => {
  componentePopupPomodoro.style.display = 'block'
})


// Iniciar Cronometro Pomodoro
botaoInicioPomodoro.addEventListener('click', relogioPomodoro = () => {
  
  botaoInicioPomodoro.style.display = 'none'
  botaoPararPomodoro.style.display = 'block'

  let cronometroPomodoro = 25 * 60
  let count = 0
  contagem()

  function contagem() {
    cronometroPomodoro--
    let minutosPomodoro = parseInt(cronometroPomodoro / 60)
    let segundosPomodoro = parseInt(cronometroPomodoro % 60)
    if (minutosPomodoro < 10) {
      minutosPomodoro = `0${minutosPomodoro}`
    }
    if (segundosPomodoro < 10) {
      segundosPomodoro = `0${segundosPomodoro}`
    }
    componentePomoro.innerHTML = `${minutosPomodoro}:${segundosPomodoro}`
    if (cronometroPomodoro >= 1) {
      timePomodoro = setTimeout(contagem, 1000)
    } else {
      count++
      if (count % 2 !== 0) { 
        clearTimeout(timePomodoro)
        cronometroPomodoro = 5 * 60
        alert('Hora do Descanso')
        contagem()
      } else {
        clearTimeout(timePomodoro)
        cronometroPomodoro = 25 * 60
        alert('Hora do Trabalho')
        contagem()
      }
      
    }
  }

})

// Parar Cronometro Pomodoro
botaoPararPomodoro.addEventListener('click', parar = () => {
  clearTimeout(timePomodoro)
  botaoPararPomodoro.style.display = 'none'
  botaoInicioPomodoro.style.display = 'block'
})

// Fechar Popup Pomodoro
componentePopupPomodoro.addEventListener('click', event => {

  const comandoFechar = event.target.classList[0]
  const listaParaFechar = ['popup-close', 'popup-wrapper']
  const fechar = listaParaFechar.some(listaParaFechar => listaParaFechar === comandoFechar)
  
  if (fechar) {
    componentePopupPomodoro.style.display = 'none'
    clearTimeout(timePomodoro)
    botaoPararPomodoro.style.display = 'none'
    botaoInicioPomodoro.style.display = 'block'
  }
})

// Configurando funcionamento do cronometro
const componenteCronometro = document.getElementById('cronometro')
const componentePopupCronometro = document.getElementById('wrapper-cronometro')
const botaoiniciarCronometro = document.querySelector('.botao-iniciar-cronometro')
const botaoPararCronometro = document.getElementById('botao-pausa-cronometro')

// Abrir Popup iniciar cronometro
botaoiniciarCronometro.addEventListener('click', cronometrar = () => {
  const valorCronometro = Number(document.getElementById('contagem-cronometro').value)
  
  componentePopupCronometro.style.display = 'block'
  let cronometro = valorCronometro * 60
  contagemCronometro()

  function contagemCronometro() {
    if (cronometro === NaN) {
      cronometro = 0
    }
    let minutoCronometro = parseInt(cronometro / 60)
    let segundoCronometro = parseInt(cronometro % 60)

    if (minutoCronometro < 10) {
      minutoCronometro = `0${minutoCronometro}`
    }
    if (segundoCronometro < 10) {
      segundoCronometro = `0${segundoCronometro}`
    }

    componenteCronometro.innerHTML = `${minutoCronometro}:${segundoCronometro}`
    timeCronometro = setTimeout(contagemCronometro, 1000)

    if (cronometro === 0) {
      clearTimeout(timeCronometro)
      confirm('Acabou!')
    } else {
      cronometro--
    }
  }
  this.contagemCronometro = contagemCronometro
})

// Parar e iniciar cronometro
botaoPararCronometro.addEventListener('click', pararIniciarCronometro = () => {
  if (botaoPararCronometro.value === 'Parar') {
    botaoPararCronometro.value = 'Voltar'
    componenteCronometro.innerHTML = ''
    clearTimeout(timeCronometro)
  } else {
    botaoPararCronometro.value = 'Parar'
    contagemCronometro()
  }
} )

// Fechar Popup Pomodoro
componentePopupCronometro.addEventListener('click', event => {
  const comandoFechar = event.target.classList[0]
  const listaParaFechar = ['popup-close', 'popup-wrapper']
  const fechar = listaParaFechar.some(listaParaFechar => listaParaFechar === comandoFechar)
  
  if (fechar) {
    componentePopupCronometro.style.display = 'none'
    clearTimeout(timeCronometro)
  }
})