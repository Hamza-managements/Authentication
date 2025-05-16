function signup() {
  const getEmail = document.getElementById('email').value.trim();
  const getPass = document.getElementById('password').value.trim();
  const getFullName = document.getElementById('fullName').value.trim();

  // Get existing users from localStorage or create a new array
  const userArray = JSON.parse(localStorage.getItem('userData')) || [];

  if (getEmail && getPass && getFullName) {
    const dataObj = {
      email: getEmail,
      password: getPass,
      fullname: getFullName
    };

    // Optional: Prevent duplicate emails
    const emailExists = userArray.some(user => user.email === getEmail);
    if (emailExists) {
      Swal.fire({
        title: 'Error!',
        text: 'Email already exists. Please use a different email.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    userArray.push(dataObj);
    localStorage.setItem("userData", JSON.stringify(userArray));

    Swal.fire({
      title: 'Sign Up Successful!',
      text: 'Redirecting to login page...',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true
    }).then(() => {
      window.location.href = './login.html';
    });
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Please fill out all fields.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}


// ===== TOGGLE PASSWORD VISIBILITY =====
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('togglePassword');
  if (toggle) {
    toggle.addEventListener('click', function () {
      const password = document.getElementById('password');
      const icon = this.querySelector('i');
  
      if (password.type === 'password') {
        password.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        password.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  }
});

// ===== LOGIN FUNCTION =====
function login() {
  const getEmail = document.getElementById('email').value.trim();
  const getPass = document.getElementById('password').value.trim();
  const users = JSON.parse(localStorage.getItem('userData')) || [];

  // Find matching user
  const matchedUser = users.find(
    (user) => user.email === getEmail && user.password === getPass
  );

  if (matchedUser) {
    // Optionally save current login (e.g., for auth check later)
    localStorage.setItem('currentUser', JSON.stringify(matchedUser));

    Swal.fire({
      title: 'Login Successful!',
      text: 'Redirecting to Home page...',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true
    }).then(() => {
      window.location.href = './posts.html';
    });
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Invalid email or password.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}


// ===== POST FUNCTION =====
function post() {
  const getTitle = document.getElementById('productTitle').value.trim();
  const getPrice = document.getElementById('price').value.trim();
  const getImgURL = document.getElementById('imgUrl').value.trim();
  const getImgContent = document.getElementById('imgContent').value.trim();
  const posts = JSON.parse(localStorage.getItem('postData')) || [];
 

  if (getTitle && getPrice && getImgURL && getImgContent) {
    const postObj = {
      title: getTitle,
      img: getImgURL,
      price: getPrice,
      content: getImgContent
    };
    posts.push(postObj);
    localStorage.setItem("postData", JSON.stringify(posts));
    Swal.fire({
      title: 'Post Created Successfully!',
      text: 'Redirecting to Home page...',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true
    }).then(() => {
      window.location.href = './index.html';
    });
  } else {
    Swal.fire('Error!', 'Please fill out all post fields.', 'error');
  }
}

document.addEventListener('DOMContentLoaded', function () {

function getPost() {
  const postData = JSON.parse(localStorage.getItem("postData"));
  if (!postData) return;
  // console.log(postData);
  
  const getCard = document.getElementById('product-card-container');
  getCard.innerHTML = '';
  for (let i = 0; i < postData.length; i++) {
    const { title, img, price, content } = postData[i];
    console.log(postData, title, img, price, content);
  getCard.innerHTML += `
  <div class="product-card" id="product-card">
      <span class="product-badge">Sale</span>
      <div class="product-image">
        <img src="${img}" alt="Product Image">
        <div class="quick-actions">
          <div class="quick-btn" title="Add to Wishlist">
            <i class="far fa-heart"></i>
          </div>
          <div class="quick-btn" title="Quick View">
            <i class="far fa-eye"></i>
          </div>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">Electronics</span>
        <h3 class="product-title">${title}</h3>
        <p class="product-content">${content}</p>
        <div class="product-rating">
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
          <span class="review-count">(128 reviews)</span>
        </div>
        <div class="price-section">
          <div>
            <span class="current-price">$${price}</span>
            <span class="original-price">$199.99</span>
          </div>
          <span class="discount">35% OFF</span>
        </div>
        <button class="add-to-cart">
          <i class="fas fa-shopping-cart"></i>
          Add to Cart
        </button>
      </div>
    </div>`;
  }

 
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
  document.getElementById('currentUser').innerText = currentUser.fullname;
}

}
 getPost();
});

