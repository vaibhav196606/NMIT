var tb = document.querySelector('#cont');
var sub = document.querySelector('#sub');
var res = document.querySelector('#result');
var marks = 0;
var ar =[
    {
        left: '<i class="fas fa-star"></i>',
        right: "आसन्द", //Chair
        ans: 5
    },
    {
        left: '<i class="fas fa-briefcase"></i>',
        right: "चक्षन्", //Eyes
        ans: 4
    },
    {
        left: '<i class="fas fa-glasses"></i>',
        right: "नक्षत्र", //Star
        ans: 1
    },
    {
        left: '<i class="fas fa-eye"></i>',
        right: "स्यूत", //Bag
        ans: 2
    },
    {
        left: '<i class="fas fa-couch"></i>',
        right: "उपनेत्र", //Spectacles
        ans: 3
    }
];
var l = ar.length;
var g ='';
for(var i=0; i<l; i++){
	if(i==0){
		g = 'Eg:2';
	}
	else{
		g = '';
	}
    tb.innerHTML+=`<tr>
    <td>
        ${i+1}
    </td>
    <td style="font-size:1.6em">
        ${ar[i].left}
    </td>
    <td style="font-size:1.4em">
        ${ar[i].right}
    </td>
    <td>
    <input type="number" id="${i}inp" placeholder=${g}>
    </td>
</tr>`
}
sub.addEventListener('click',()=>{
    for(var i=0; i<l; i++){
        var y = `${i}inp`;
        var x = document.getElementById(y);
       
        if(x.value==ar[i].ans){
            marks++;
            x.style.backgroundColor ='rgba(76, 175, 80, 0.5)';
        }
        else{
            x.style.backgroundColor ='rgba(255, 0, 0,0.5)';
        }
        
    }

    res.innerHTML = `Your Total marks is ${marks} out of ${l}`;
    sub.innerHTML =`Re-Submit <i class="fas fa-sign-in-alt"></i>`;
    marks=0;
})



