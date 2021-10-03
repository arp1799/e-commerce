//fetch json data from db
const orderedItems=[
    {
        name:"Phone",
        Description:"Latest Android mobile",
        SoldBy:"Seller Name",
        dateOrdered:'26 September 2021',
        dateArriving:'28 September 2021',
        prize:50000,
        photo:"https://assetscdn1.paytm.com/images/catalog/product/M/MO/MOBOPPO-A52-6-GFUTU6297453D3D253C/1592019058170_0..png",
        OrderId:12346
    },
    {
        name:"Speakers",
        Description:"High sound with waterproofing with great volume",
        SoldBy:"Seller Name",
        dateOrdered:'23 September 2021',
        dateArriving:'29 September 2021',
        prize:1000,
        photo:"https://images-na.ssl-images-amazon.com/images/I/91zCZLVUg8L._SX466_.jpg",
        OrderId:12345

    },
    
    {
        name:"Charger",
        Description:"Fast charging with C-type port",
        SoldBy:"Seller Name",
        dateOrdered:'23 September 2021',
        dateArriving:'29 September 2021',
        prize:500,
        photo:"https://www.insasta.com/image/catalog/1a/n/100-original-charger-for-all-asus-zenfone-2amp-usb-cable-3902.jpg",
        OrderId:12346
    },
    
];


//HTML template function
function ItemTemplate(items){
    return `
    <div class="item">
        <img class="item-photo" src="${items.photo}">
        <div class="info">
            <h2 class="item-name ">${items.name}</h2>
            <span class="seller">Sold By: ${items.SoldBy}</span> 
            <p><strong>Description:</strong>${items.Description}</p>
            <p><strong>Ordered Date:</strong>${items.dateOrdered}</p>
            <p><strong>Arriving Date:</strong>${items.dateArriving}</p>
            <p><strong>Cost:</strong>₹ ${items.prize}</p>
            <p><strong>Order Id:</strong>${items.OrderId}</p>
        </div>
        <div class="align-buttons">
        <button class="btn btn-outline-primary" id="track-order" onclick=tracking() > Track Package</button>
        <button class="btn btn-outline-warning" id="archive-order" onclick=archiving() > Archive Order</button>
        <button class="btn btn-outline-danger" id="cancel-order" onclick=cancelling() > Cancel Order</button>
        </div>
    </div>
    `
}


var element=document.getElementById("app");

//make fragment to render the array and then display it together.
var fragment=document.createDocumentFragment();

const mydiv=document.createElement('div')

mydiv.innerHTML=`
<h1 class="app-title">Open Orders: ${orderedItems.length}</h1>
${orderedItems.map(ItemTemplate).join('')}
`
//append the html template in fragment
fragment.appendChild(mydiv);

//append fragment in element to display the template
element.appendChild(fragment);

//calling Itemtemplate
document.getElementById("app").innerHTML=`
    <h1 class="app-title">Open Orders: ${orderedItems.length}</h1>
    ${orderedItems.map(ItemTemplate).join('')}
`

//button click actions
// const trackBtn=document.getElementById("track-order")
// trackBtn.addEventListener("click", ()=>{
//     console.log('Track order')
// })

// const cancelBtn=document.getElementById("archive-order")
// cancelBtn.addEventListener("click", ()=>{
//     console.log('Cancel order')
// })

// const archiveBtn=document.getElementById("cancel-order")
// archiveBtn.addEventListener("click", ()=>{
//     console.log('Archive order')
// })

var tracking = ()=>{
    //clicking Track package
    console.log("Tracking")
}

var archiving = ()=>{
    //clicking Archive Order
    console.log("Archiving")
}

var cancelling = ()=>{
    //clicking Cancel Order
    console.log("Cancelling")
}