
const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyuSP9xr1yOqRF3RNo2NOCY-I2BGdD7zjdGJvHIauXfT8Se_RoRxWIqJjh3X1xRKaws/exec";

const jumlahMurid = {

    // Tingkatan 1
    "1 Mawar": 35,
    "1 Melati": 30,
    "1 Melur": 34,


    // Tingkatan 2
    "2 Mawar": 31,
    "2 Melati": 33,
    "2 Melur": 29,


    // Tingkatan 3
    "3 Mawar": 35,
    "3 Melati": 32,
    "3 Melur": 30,


    // Tingkatan 4
    "4 Bakawali": 28,
    "4 Cempaka": 34,
    "4 Kenanga": 31,
    "4 Seroja": 33,


    // Tingkatan 5
    "5 Bakawali": 30,
    "5 Cempaka": 29,
    "5 Kenanga": 32,
    "5 Seroja": 34

};

let tarikh = new Date();

document.getElementById("tarikhHariIni").innerHTML =
tarikh.toLocaleDateString("ms-MY",{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
});


loadRekod();


function kira(){


let jumlah =
Number(document.getElementById("jumlah").value);

document.getElementById("jumlahLabel").innerHTML =
jumlah + " Orang";


let hadirInput =
document.getElementById("hadir");



let hadir =
Number(hadirInput.value);



// kalau kosong
if(hadirInput.value === ""){

document.getElementById("hadirView").innerHTML = "0";

document.getElementById("takHadir").innerHTML = "-";

document.getElementById("peratus").innerHTML = "-";

return;

}


// kalau lebih daripada jumlah
if(hadir > jumlah){

document.getElementById("takHadir").innerHTML = "??";

document.getElementById("peratus").innerHTML = "Tidak sah";

hadirInput.style.borderColor = "red";

return;

}


// kalau normal

hadirInput.style.borderColor = "";


let tak =
jumlah-hadir;


let peratus =
((hadir/jumlah)*100).toFixed(2);

console.log("Hadir:", hadir);

document.getElementById("hadirView").innerHTML = hadir;

document.getElementById("takHadir").innerHTML = tak;


document.getElementById("peratus").innerHTML = peratus;


}




function simpan(){


let hadirValue =
document.getElementById("hadir").value;


let hadir =
Number(hadirValue);


let jumlah =
Number(document.getElementById("jumlah").value);



if(hadirValue === ""){

alert("?? Sila masukkan bilangan murid hadir.");

return;

}



if(hadir > jumlah){

alert(
"?? Bilangan hadir tidak boleh melebihi jumlah murid (" 
+ jumlah + 
" orang)."
);

return;

}



if(hadir < 0){

alert(
"?? Bilangan hadir tidak boleh negatif."
);

return;

}




let button =
document.getElementById("btnSimpan");


button.innerHTML="? Menyimpan...";

button.disabled=true;



let data={

kelas:
document.getElementById("kelas").value,

jumlah:
jumlah,

hadir:
hadir

};



fetch(SCRIPT_URL,{

method:"POST",

body:JSON.stringify(data)

})


.then(res=>res.json())


.then(response=>{


document.getElementById("status").innerHTML =

`
<div class="success-card">

    <div class="success-icon">
        ✓
    </div>

    <h3>
        Kehadiran Berjaya Disimpan
    </h3>

    <p>
        🏫 ${data.kelas}
    </p>

    <p>
        👥 Hadir:
        <b>${data.hadir}/${data.jumlah}</b>
    </p>

    <p>
        ❌ Tidak hadir:
        <b>${data.jumlah-data.hadir}</b>
    </p>

    <p>
        📈 Kehadiran:
        <b>${((data.hadir/data.jumlah)*100).toFixed(2)}%</b>
    </p>

</div>
`;


button.innerHTML="SIMPAN KEHADIRAN";

button.disabled=false;


loadRekod();


})


.catch(err=>{


document.getElementById("status").innerHTML =
"? Gagal simpan";


button.innerHTML="SIMPAN KEHADIRAN";

button.disabled=false;


});


}



function loadRekod(){


fetch(SCRIPT_URL)

.then(res=>res.json())

.then(data=>{


let table =
document.getElementById("rekod");



table.innerHTML = `

<tr>

<th>Kelas</th>

<th>Murid</th>

<th>Hadir</th>

<th>Tidak Hadir</th>

<th>%</th>

<th>Tindakan</th>

</tr>

`;



data.forEach(item=>{


table.innerHTML += `

<tr>


<td>
<b>${item.kelas}</b>
</td>


<td>
${item.jumlah}
</td>


<td class="hadir-text">
${item.hadir}
</td>


<td class="tidak-text">
${item.tidakHadir}
</td>


<td>

<span class="peratus-badge">

${item.peratus}%

</span>

</td>


<td>


<button 
class="edit-btn"
onclick="editKelas('${item.kelas}',${item.hadir})">

✏️

</button>


</td>


</tr>


`;

});


});


}



function editKelas(kelas,hadir){


document.getElementById("kelas").value = kelas;


document.getElementById("hadir").value = hadir;


kira();


window.scrollTo({
top:0,
behavior:"smooth"
});


}

function tukarKelas(){

let kelas =
document.getElementById("kelas").value;


let jumlah =
jumlahMurid[kelas];


document.getElementById("jumlah").value = jumlah;


document.getElementById("jumlahLabel").innerHTML =
jumlah + " Orang";


document.getElementById("hadir").value = "";


document.getElementById("hadirView").innerHTML = "0";

document.getElementById("takHadir").innerHTML = "0";

document.getElementById("peratus").innerHTML = "0";


document.getElementById("hadir").max = jumlah;

}

