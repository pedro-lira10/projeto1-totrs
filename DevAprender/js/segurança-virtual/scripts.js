function VeficarEntrada() {
    NomeConvidado = document.getElementById('nome').value;
    convidadosCristian = ['Amanda', 'Sarisa', 'Rafael', 'Jonas', 'carol']
    if (ConvidadsoCristian.includes(NomeConvidado)) {
        document.getElementById('PermissaDeEntrada').innerText = 'Você pode Entrar!'

    } else {
        document.getElementById('PermissaDeEntrada').innerText = 'Você não pode Entrar!'
    }

} 