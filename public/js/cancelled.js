//fetch json data from db
const cancelledItems=[
    {
        name:"Phone",
        Description:"Latest Android mobile",
        SoldBy:"Seller Name",
        prize:50000,
        photo:"https://assetscdn1.paytm.com/images/catalog/product/M/MO/MOBOPPO-A52-6-GFUTU6297453D3D253C/1592019058170_0..png",
    },
    {
        name:"Speakers",
        Description:"High sound with waterproofing with great volume",
        SoldBy:"Seller Name",
        prize:1000,
        photo:"https://images-na.ssl-images-amazon.com/images/I/91zCZLVUg8L._SX466_.jpg",
    },
    
    {
        name:"Charger",
        Description:"Fast charging with C-type port",
        SoldBy:"Seller Name",
        prize:500,
        photo:"https://www.insasta.com/image/catalog/1a/n/100-original-charger-for-all-asus-zenfone-2amp-usb-cable-3902.jpg",
    },
    
];


//HTML template function
function ItemTemplate(items){
    return `
    <div class="item">
        <div class="pic">
            <img src="${items.photo}" alt="${items.name}"/>
        </div>

        <div class="info">
            <h2 class="item-name ">${items.name}</h2>
            <span class="seller">Sold By: ${items.SoldBy}</span> 
            <p><strong>Description:</strong>${items.Description}</p>
            <p><strong>Cost:</strong>₹ ${items.prize}</p>
        </div>

        <div class="align-buttons">
            <button class="btn btn-outline-warning" id="archive-order" onclick=archiving() > Archive</button>
        </div>
    </div>
    `
}


var element=document.getElementById("app");

//make fragment to render the array and then display it together.
var fragment=document.createDocumentFragment();

const mydiv=document.createElement('div')

mydiv.innerHTML=`
<h1 class="app-title">Cancelled Orders: ${cancelledItems.length}</h1>
${cancelledItems.map(ItemTemplate).join('')}
`
//append the html template in fragment
fragment.appendChild(mydiv);

//append fragment in element to display the template
element.appendChild(fragment);

//calling Itemtemplate
document.getElementById("app").innerHTML=`
    <h1 class="app-title">Cancelled Orders: ${cancelledItems.length}</h1>
    ${cancelledItems.map(ItemTemplate).join('')}
`


var archiving = ()=>{
    //clicking Archive Order button
    console.log("Archiving")
}