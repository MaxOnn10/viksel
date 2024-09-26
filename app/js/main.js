let burger = document.querySelector(".burger");
let burgerItem = document.querySelectorAll(".header__menu-item");
let body = document.body;

//burger-menu
burger.addEventListener('click', function () {
    burger.classList.toggle("burger--active");
    document.querySelector(".header__nav").classList.toggle("active"),
    document.querySelector(".header__menu").classList.toggle("active"),
    document.querySelector(".header__menu-list").classList.toggle("active"),
    document.querySelector(".header__menu-item").classList.toggle("active"),
    document.querySelector(".header__right").classList.toggle("active"),
    body.classList.toggle("disable-scroll");
  
  });
  
  burgerItem.forEach(function(item) {
    item.addEventListener('click', function () {
      document.querySelector(".header__nav").classList.remove("active"),
      document.querySelector(".header__menu").classList.remove("active"),
      document.querySelector(".header__menu-list").classList.remove("active"),
      document.querySelector(".header__right").classList.remove("active"),
      burger.classList.remove("burger--active"),
      item.classList.remove("active"),
      body.classList.remove("disable-scroll");
    });
  });

  document.querySelectorAll('.form').forEach((form) => {
    const telSelector = form.querySelector('input[type="tel"]');
    const inputMask = new Inputmask('+382-##-###-###');
    inputMask.mask(telSelector);
  
    const validation = new JustValidate(form);
  
    validation
      .addField('.input-name', [
        {
          rule: 'minLength',
          value: 2,
        },
        {
          rule: 'maxLength',
          value: 50,
        },
        {
          rule: 'required',
          value: true,
          errorMessage: 'Enter a First name'
        }
      ])
      .addField('.input-mail', [
        {
          rule: 'required',
          value: true,
          errorMessage: 'Email is required',
        },
        {
          rule: 'email',
          value: true,
          errorMessage: 'Enter a valid Email',
        },
      ])
      .addField('.input-tel', [
        {
          rule: 'required',
          value: true,
          errorMessage: 'Phone is required',
        },
        {
          rule: 'function',
          validator: function() {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 8;
          },
          errorMessage: 'Enter the correct phone number',
        },
      ])
      .onSuccess((event) => {
        console.log('Validation passes and form submitted', event);
  
        let formData = new FormData(event.target);
  
        console.log(...formData);
  
        let xhr = new XMLHttpRequest();
  
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Send');
              setTimeout(function () {
                // window.location.href = '/submitting.html';
                alert("Спасибо, ваша заявка отправлена")
              }, 3000);
            }
          }
        }
  
        xhr.open('POST', '../mail.php', true);
        xhr.send(formData);
  
        event.target.reset();
      });
  });