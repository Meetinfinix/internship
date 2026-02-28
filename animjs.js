//  index
// Generate diagonal elements for entire home area
function createDiagonalGrid() {
   const grid = document.querySelector('.diagonal-grid');
   if (!grid) return;

// Create 6 solid light grey diagonal blocks in bottom-left corner, moved down and spread out
   const blocks = [{
         width: 80,
         bottom: -400,
         left: -100,
         delay: 0,
/*22*/   duration: 25 
      },
      {
         width: 60,
         bottom: -300,
         left: 100,
         delay: 2,
/*20*/  duration: 23
      },
      {
         width: 100,
         bottom: -370,
         left: 350,
         delay: 1,
/*24*/   duration: 25
      },
      {
         width: 70,
         bottom: -230,
         left: 200,
         delay: 1.5,
/*21*/   duration: 23
      },
      {
         width: 90,
         bottom: -170,
         left: 500,
         delay: 0.5,
/*23*/   duration: 25
      },
      {
         width: 50,
         bottom: -270,
         left: 400,
         delay: 3,
/*25*/   duration: 23
      }
   ];

   blocks.forEach(block => {
      const element = document.createElement('div');
      element.className = 'soft-block';
      element.style.width = `${block.width}px`;
      element.style.bottom = `${block.bottom}px`;
      element.style.left = `${block.left}px`;
      element.style.animationDelay = `${block.delay}s`;
      element.style.animationDuration = `${block.duration}s`;
      grid.appendChild(element);
   });
}

// Create static decoration blocks
function createStaticDecoration() {
   const decoration = document.querySelector('.static-decoration');
   if (!decoration) return;

   // 9 blocks for top-right corner decoration (6 outline, 3 filled) with sizes from 40px to 120px
   const staticBlocks = [{
         size: 85,
         top: '20px',
         right: '30px',
         outline: true
      },
      {
         size: 120,
         top: '80px',
         right: '120px',
         outline: false
      },
      {
         size: 100,
         top: '140px',
         right: '50px',
         outline: true
      },
      {
         size: 40,
         top: '50px',
         right: '180px',
         outline: true
      },
      {
         size: 95,
         top: '200px',
         right: '150px',
         outline: false
      },
      {
         size: 60,
         top: '100px',
         right: '280px',
         outline: true
      },
      {
         size: 75,
         top: '180px',
         right: '220px',
         outline: true
      },
      {
         size: 50,
         top: '300px',
         right: '180px',
         outline: true
      },
      {
         size: 90,
         top: '60px',
         right: '320px',
         outline: false
      }
   ];

   staticBlocks.forEach(block => {
      const element = document.createElement('div');
      element.className = block.outline ? 'static-block-outline' : 'static-block';
      element.style.width = `${block.size}px`;
      element.style.height = `${block.size}px`;
      element.style.top = block.top;
      element.style.right = block.right;
      decoration.appendChild(element);
   });
}

// Create red decoration blocks for bottom right
function createBottomRightDecoration() {
   const decoration = document.querySelector('.bottom-right-decoration');
   if (!decoration) return;

   // 6 blocks for bottom-right corner (4 filled red + 2 outline)
   const redBlocks = [{
         size: 65,
         bottom: '20px',
         right: '40px',
         outline: false
      },
      {
         size: 45,
         bottom: '60px',
         right: '120px',
         outline: false
      },
      {
         size: 85,
         bottom: '120px',
         right: '60px',
         outline: false
      },
      {
         size: 35,
         bottom: '100px',
         right: '150px',
         outline: false
      },
      {
         size: 55,
         bottom: '40px',
         right: '200px',
         outline: true
      },
      {
         size: 70,
         bottom: '160px',
         right: '140px',
         outline: true
      }
   ];

   redBlocks.forEach(block => {
      const element = document.createElement('div');
      element.className = block.outline ? 'red-block-outline' : 'red-block';
      element.style.width = `${block.size}px`;
      element.style.height = `${block.size}px`;
      element.style.bottom = block.bottom;
      element.style.right = block.right;
      decoration.appendChild(element);
   });
}
// Initialize all elements when page loads
document.addEventListener('DOMContentLoaded', () => {
   // Create all decorative elements
   createDiagonalGrid();
   createStaticDecoration();
   createBottomRightDecoration(); 
 // Set minimum date to today
/*    const dateInput = document.getElementById('date');
    if (dateInput) {
       const today = new Date().toISOString().split('T')[0];
       dateInput.setAttribute('min', today);
    } */
});

// brand --------------------------------------------

let reviews = {};
let selectedShop = null;
let selectedRating = 0;

/* Render */
function renderShops(floor){

  const grid = document.getElementById("shopGrid");
  grid.innerHTML="";

  const filtered = floor==="all"
    ? mallData
    : mallData.filter(s=>s.floor===floor);

  filtered.forEach(shop=>{

    grid.innerHTML+=`
      <div class="shop-card">

        <div class="logo-box">
          <img src="${shop.image}" alt="${shop.name}">
        </div>

        <div class="shop-info">
          <div class="category">${shop.category}</div>
          <div class="floor">${shop.id} FLOOR</div>
          <div class="rating">${getAverageRating(shop.id)}</div>
        </div>

        <div class="shop-buttons">

          <!-- Location Button (No Alert) -->
          <button class="location-btn"
            onclick="goToMap('${shop.floor}', ${shop.id})">
            <svg viewBox="0 0 640 640">
              <path fill="currentColor"
              d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
            </svg>
            Location
          </button>

          <!-- Review Button -->
          <button class="review-btn"
            onclick="openReview(${shop.id})">

            Review

            <svg viewBox="0 0 576 512">
              <path fill="currentColor"
              d="M287.9 17.8L354 150.2L499.2 171.5C518.3 174.3 525.9 197.7 512 211.6L403 320.6L427.8 465.3C431.1 484.3 411.2 498.2 394.3 489.5L288 433.8L181.7 489.5C164.8 498.2 144.9 484.3 148.2 465.3L173 320.6L64 211.6C50.1 197.7 57.7 174.3 76.8 171.5L222 150.2L288.1 17.8z"/>
            </svg>

          </button>

        </div>
      </div>
    `;
  });
}

/* Open Rating */
function openReview(id){
  selectedShop=id;
  selectedRating=0;
  document.getElementById("reviewModal").style.display="flex";
  const shop=mallData.find(s=>s.id===id);
  document.getElementById("modalTitle").innerText="Rate "+shop.name;
  renderStars();
}

/* Stars */
function renderStars(){
  const container=document.getElementById("starContainer");
  container.innerHTML="";
  for(let i=1;i<=5;i++){
    const star=document.createElement("span");
    star.innerHTML="★";
    if(i<=selectedRating) star.classList.add("active");
    star.onclick=()=>{selectedRating=i; renderStars();};
    container.appendChild(star);
  }
}

/* Submit */
function submitReview(){
  if(selectedRating===0){ alert("Select rating"); return; }
  
  if(!reviews[selectedShop]) reviews[selectedShop]=[];
  reviews[selectedShop].push({rating:selectedRating});
  
  // Update the rating display in real time
  const shopCards = document.querySelectorAll(".shop-card");
  shopCards.forEach(card => {
    const floorDiv = card.querySelector(".floor");
    // Check if this card matches selectedShop id
    if(floorDiv && floorDiv.textContent.includes(selectedShop)){
      const ratingDiv = card.querySelector(".rating");
      ratingDiv.textContent = getAverageRating(selectedShop);
    }
  });

  document.getElementById("reviewModal").style.display="none";
}

/* Average */
function getAverageRating(id){
  if(!reviews[id]) return "No ratings yet";
  const total=reviews[id].reduce((s,r)=>s+r.rating,0);
  const avg=(total/reviews[id].length).toFixed(1);
  return `⭐ ${avg} / 5`;
}

function filterFloor(floor,el){
  document.querySelectorAll(".side-menu a")
    .forEach(a=>a.classList.remove("active"));
  el.classList.add("active");
  renderShops(floor);
}

renderShops("ground");

/* ---------- REDIRECT TO MAP ---------- */
function goToMap(floor, shopId){
  window.location.href =
    "map.html?floor=" + floor + "&shop=" + shopId;
}

// map --------------------------------------------

// Time
function updateTime() {
  const now = new Date();
  document.getElementById("current-time").textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

updateTime();
setInterval(updateTime, 60000);

function updateStoreText(stores) {
  stores.forEach((store, index) => {
    const textElement = document.getElementById(`shop-${index + 1}-text`);
    if (textElement) {
      textElement.textContent = store.name;

      const theme = shopThemes[store.category];
      if (theme) {
        textElement.setAttribute("fill", theme.text);
      }

      textElement.setAttribute("x", store.x);
      textElement.setAttribute("y", store.y);
    }
  });
}

/* READ URL PARAMETERS */

function getQueryParams(){
  const params = new URLSearchParams(window.location.search);
  return {
    floor: params.get("floor"),
    shop: params.get("shop")
  };
}

const query = getQueryParams();

let currentHighlightedRect = null;

/* FIX FLOOR ACTIVATION */

if(query.floor){

  const floorLinks = document.querySelectorAll(".side-menu a");

  // Remove active from ALL first
  floorLinks.forEach(link => link.classList.remove("active"));

  // Activate correct floor + trigger existing logic
  floorLinks.forEach(link=>{
    if(link.innerText.toLowerCase().includes(query.floor)){
      link.classList.add("active");

      // Trigger your existing filterFloor function
      filterFloor(query.floor, link);
    }
  });
}

/* HIGHLIGHT SHOP */

function highlightShop(shopId){

  const shopMap = {
    101: "shop-1-rect",
    102: "shop-2-rect",
    103: "shop-8-rect"
  };

  const rectId = shopMap[shopId];

  if(rectId){
    const rect = document.getElementById(rectId);

    rect.setAttribute("stroke", "red");
    rect.setAttribute("stroke-width", "6");

    currentHighlightedRect = rect;
  }
}

if(query.shop){
  highlightShop(query.shop);
}

// remove borders of Floors
const floorLinks = document.querySelectorAll(".side-menu a");

floorLinks.forEach(link=>{
  link.addEventListener("click", function(){

    // Remove border from previously highlighted shop
    if(currentHighlightedRect){
      currentHighlightedRect.removeAttribute("stroke");
      currentHighlightedRect.removeAttribute("stroke-width");
      currentHighlightedRect = null;
    }
  });
});

function filterFloor(floor, el) {
document.querySelectorAll(".side-menu a")
   .forEach(a => a.classList.remove("active"));
el.classList.add("active");
if(floor == "ground")
{
   document.getElementById("svgEntry").style.visibility = '';
}
else document.getElementById("svgEntry").style.visibility = 'hidden';
}

updateStoreText(stores);