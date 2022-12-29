const root = document.getElementById('content');


// var page = ``;

// getPage('satuan.html')

// function getPage(file_name) {
//     var Ajax = new XMLHttpRequest();
//     Ajax.open("GET", "page/" + file_name, true);
//     Ajax.onreadystatechange = function () {
//         if (Ajax.readyState == 4 && Ajax.status == 200) {
//             page = Ajax.responseText;
//             root.innerHTML = page;
//         }
//     }
//     Ajax.onerror = function () {
//         console.error("Error");
//     };
//     Ajax.send();
// }

// // fungsi pembulatan
// function round(value, pembulat) {
//     // ya sudah, kalo mau pake ini, silahkan
//     return (Math.round(parseInt(value) / parseInt(pembulat)) * parseInt(pembulat));
// }
// // fungsi pembulatan

//fungsi pembulatan
function round(value, pembulat) {
    // ya sudah, kalo mau pake ini, silahkan
    return (Math.round(parseInt(value) / parseInt(pembulat)) * parseInt(pembulat));
}

function GetResult(id, pembulat) {
    const hasil_pembulatan = document.getElementById('hasil_pembulatan');
    var input = document.getElementById(id);
    let result = 0
    console.log()
    if (pembulat >= 10) {
        result = round(input.value, pembulat);
    } else {
        result = Math.round(input.value)
    }
    hasil_pembulatan.innerHTML = input.value + ' dapat dibulatkan menjadi <b>' + result + '</b>';
    //    alert(result);

}
//fungsi random float number
function randomFloat(min, max) {
    var randomFloat = (Math.random() * (max - min) + min).toFixed(1)
    isTrue = 0
    while (isTrue == 0) {
        if((randomFloat.toString().split('.')[1][0]) != '0')
        {
            isTrue = 1
            return parseFloat(randomFloat)
        }else{
            randomFloat = (Math.random() * (max - min) + min).toFixed(1)
        }
    }
   
}
var soal = [];

function generateSoalDanJawaban(jumlahSoal, pembulat) {
    soal = [];
    if (pembulat == 10) {
        for (let i = 0; i < jumlahSoal; i++) {
            var angka = parseInt((Math.random() * (100 - 10 + 1)), 10) + 10
            soal.push({
                soal: angka,
                jawaban: round(angka, 10)
            });
        }
    } else if (pembulat == 100) {
        for (let i = 0; i < jumlahSoal; i++) {
            var angka = parseInt((Math.random() * (1000 - 10 + 1)), 10) + 10
            soal.push({
                soal: angka,
                jawaban: round(angka, 100)
            });
        }
    } else {
        for (let i = 0; i < jumlahSoal; i++) {
            var angka = randomFloat(10, 100)
            soal.push({
                soal: angka,
                jawaban: Math.round(angka)
            });
        }
    }

    renderSoal();
}

function renderSoal() {
    const element = document.getElementById('card_soal');
    var html = '';
    soal.forEach((item, index) => {
        html += `
        <tr>
        <td>`+ (index + 1) + `</td>
        <td>`+ item['soal'] + ` dapat dibulatkan menjadi ...</td>
        <td><input type="number" id="input-`+ index + `" placeholder="jawab" class="form-control"></td>
    </tr>
        `
    })
    element.innerHTML = html;
}

function cekJawaban() {

    var benar = 0;
    var salah = 0;
    console.log(soal.length)
    if (soal.length > 0) {
        soal.forEach((item, index) => {
            var jawaban = document.getElementById('input-' + index).value;
            console.log("jawaban = "+ jawaban)
            console.log("jawaban_benar = "+ item['jawaban'])
            if (jawaban == item['jawaban']) {
                benar++;
            } else {
                salah++;
            }
        })
        
    }
    var nilai = (benar / soal.length) * 100;
    console.log(benar)
    $("#nilai_akhir").html(nilai);
    $("#logoutModal").modal('show');
}



