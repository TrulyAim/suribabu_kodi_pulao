// Smooth scroll to footer on nav click
document.querySelectorAll('a[href="#contact"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
});

// Slow spin animation for hero image
TailwindCSS = window.tailwind || {};
TailwindCSS.config = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      }
    }
  }
};

let cart = [];

// Toggle mobile menu
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('hidden');
  navMenu.classList.add('animate__fadeInDown');
});

// Add to cart
function addToCart(item) {
  cart.push(item);
  updateCart();
  window.scrollTo({ top: document.getElementById('cart').offsetTop - 80, behavior: 'smooth' });
  const cartCount = document.getElementById('alert(item.name added)');
}

// Update cart display
function updateCart() {
  const cartContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartContainer.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const cartItem = document.createElement('div');
    cartItem.className = 'flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-lg animate__animated animate__fadeInUp';
    cartItem.innerHTML = `
      <span class="text-base sm:text-lg font-semibold text-gray-700">${item.name} - $${item.price.toFixed(2)}</span>
      <button class="text-red-500 hover:text-red-700 text-base sm:text-lg mt-2 sm:mt-0 transition-all duration-300" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Update cart count badge
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? 'inline' : 'none';
  }
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Thank you for your order!');
    cart = [];
    updateCart();
  }
});

// Animate on scroll (simple fade-in)
function animateOnScroll() {
  document.querySelectorAll('.animate__animated').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('animate__fadeInUp');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// 3D Burger with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-bg').appendChild(renderer.domElement);

// Bun Top
const bunTopGeometry = new THREE.SphereGeometry(2, 64, 64, 0, Math.PI * 2, 0, Math.PI / 1.5);
const bunTopMaterial = new THREE.MeshPhongMaterial({ color: 0xf5c16c, shininess: 60 });
const bunTop = new THREE.Mesh(bunTopGeometry, bunTopMaterial);
bunTop.position.y = 1.2;
scene.add(bunTop);

// Bun Bottom
const bunBottomGeometry = new THREE.CylinderGeometry(2, 2, 0.7, 64);
const bunBottomMaterial = new THREE.MeshPhongMaterial({ color: 0xf5c16c, shininess: 60 });
const bunBottom = new THREE.Mesh(bunBottomGeometry, bunBottomMaterial);
bunBottom.position.y = -1.2;
scene.add(bunBottom);

// Patty
const pattyGeometry = new THREE.CylinderGeometry(1.7, 1.7, 0.5, 64);
const pattyMaterial = new THREE.MeshPhongMaterial({ color: 0x7c4a03 });
const patty = new THREE.Mesh(pattyGeometry, pattyMaterial);
patty.position.y = 0.2;
scene.add(patty);

// Cheese
const cheeseGeometry = new THREE.CylinderGeometry(1.8, 1.8, 0.15, 64);
const cheeseMaterial = new THREE.MeshPhongMaterial({ color: 0xffe066 });
const cheese = new THREE.Mesh(cheeseGeometry, cheeseMaterial);
cheese.position.y = 0.5;
scene.add(cheese);

// Lettuce
const lettuceGeometry = new THREE.CylinderGeometry(1.9, 1.9, 0.1, 64);
const lettuceMaterial = new THREE.MeshPhongMaterial({ color: 0x22c55e });
const lettuce = new THREE.Mesh(lettuceGeometry, lettuceMaterial);
lettuce.position.y = 0.7;
scene.add(lettuce);

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.z = 7;

function animate() {
  requestAnimationFrame(animate);
  bunTop.rotation.y += 0.005;
  bunBottom.rotation.y += 0.005;
  patty.rotation.y += 0.005;
  cheese.rotation.y += 0.005;
  lettuce.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
// Simple search filter for special dishes
    document.getElementById('special-search').addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      const dishes = document.querySelectorAll('#special-dishes-list > div');
      dishes.forEach(dish => {
        const name = dish.querySelector('h3').textContent.toLowerCase();
        dish.style.display = name.includes(query) ? '' : 'none';
      });
    });

    // Special Dishes Search Functionality
    const searchInput = document.getElementById('special-search');
    const dishesList = document.getElementById('special-dishes-list');
    const dishCards = Array.from(dishesList.children);
    const noDishMsg = document.getElementById('no-dish-message');

    searchInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      let anyVisible = false;
      dishCards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) {
          card.style.display = '';
          anyVisible = true;
        } else {
          card.style.display = 'none';
        }
      });
      if (!anyVisible) {
        noDishMsg.classList.remove('hidden');
      } else {
        noDishMsg.classList.add('hidden');
      }
    });