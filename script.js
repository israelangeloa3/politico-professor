document.getElementById('upload').addEventListener('change', handleImage);
document.getElementById('borderPattern').addEventListener('change', applyBorder);
document.getElementById('download').addEventListener('click', downloadImage);

let img = new Image();
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function handleImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                applyBorder();
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

function applyBorder() {
    let borderPattern = document.getElementById('borderPattern').value;
    let borderWidth = 20; // Largura da borda

    // Redesenha a imagem
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // Adiciona a borda com base no padrão selecionado
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = 'black'; // Cor da borda

    if (borderPattern === 'solid') {
        ctx.setLineDash([]); // Linha sólida
    } else if (borderPattern === 'dotted') {
        ctx.setLineDash([5, 15]); // Pontilhada
    } else if (borderPattern === 'dashed') {
        ctx.setLineDash([10, 10]); // Tracejada
    } else {
        ctx.setLineDash([]); // Sem borda
    }

    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function downloadImage() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'imagem_com_borda.png';
    link.click();
}
