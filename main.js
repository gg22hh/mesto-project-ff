(()=>{"use strict";var t="https://nomoreparties.co/v1/cohort-magistr-2",e="8914c2f0-088a-4d42-a690-f4fee1444b54",n=function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))},o=document.querySelector("#card-template").content,r=function(r,c,i){var a=o.querySelector(".card").cloneNode(!0),u=a.querySelector(".card__like-button"),l=a.querySelector(".card__like-number"),s=a.querySelector(".card__delete-button");r.owner._id!==i?s.style.display="none":s.addEventListener("click",(function(){return function(o,r){return o.remove(),fetch("".concat(t,"/cards/").concat(r._id),{method:"DELETE",headers:{authorization:e}}).then((function(t){return n(t)}))}(a,r).catch((function(t){return console.log(t)}))})),r.likes.some((function(t){return t._id===i}))&&u.classList.add("card__like-button_is-active"),u.addEventListener("click",(function(){u.classList.value.includes("card__like-button_is-active")?function(o){return fetch("".concat(t,"/cards/likes/").concat(o._id),{method:"DELETE",headers:{authorization:e}}).then((function(t){return n(t)}))}(r).then((function(t){console.log(t.likes,"likes after delete"),l.textContent=t.likes.length,u.classList.remove("card__like-button_is-active")})).catch((function(t){return console.log(t)})):function(o){return fetch("".concat(t,"/cards/likes/").concat(o._id),{method:"PUT",headers:{authorization:e}}).then((function(t){return n(t)}))}(r).then((function(t){console.log(t.likes,"after Like"),l.textContent=t.likes.length,u.classList.add("card__like-button_is-active")})).catch((function(t){return console.log(t)}))}));var d=a.querySelector(".card__image");return l.textContent=r.likes.length,d.src=r.link,d.alt=r.name,a.querySelector(".card__title").textContent=r.name,d.addEventListener("click",(function(){return c(d,r.name)})),a},c=function(t){"Escape"===t.code&&a(document.querySelector(".popup_is-opened"))},i=function(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",c)},a=function(t){t.classList.remove("popup_is-opened"),document.removeEventListener("click",c)},u=function(t){(t.target.classList.contains("popup__close")||t.target.classList.contains("popup"))&&a(t.currentTarget)},l=function(t){return t.some((function(t){return!t.validity.valid}))},s=function(t,e){t.disabled=!1,t.classList.remove(e.inactiveButtonClass)},d=function(t,e,n){console.log(l(t),"ni "),l(t)?(e.disabled=!0,e.classList.add(n.inactiveButtonClass)):s(e,n)},p=document.querySelector(".places__list"),f=document.querySelector(".profile__add-button"),_=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_image"),h=document.querySelector(".popup_type_edit-profile-avatar"),S=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),C=document.forms["edit-profile"],b=C.name,q=C.description,L=document.forms["new-place"],E=L["place-name"],g=L.link,x=document.forms["edit-profile-avatar"].link,T=document.querySelector(".profile__title"),z=document.querySelector(".profile__description"),A=document.querySelector(".profile__image"),B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",linkClass:"popup__input_type_url"};!function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);d(n,o,e),n.forEach((function(r){r.addEventListener("input",(function(){var c=t.querySelector(".".concat(r.id,"-error"));!function(t,e,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(t,e,n){n.textContent="",t.classList.remove(e.inputErrorClass)}(t,e,n):function(t,e,n,o){o.textContent=e,t.classList.add(n.inputErrorClass)}(t,t.validationMessage,e,n)}(r,e,c),d(n,o,e)}))}))}(e,t)}))}(B),Promise.all([fetch("".concat(t,"/users/me"),{headers:{authorization:e}}).then((function(t){return n(t)})),fetch("".concat(t,"/cards"),{headers:{authorization:e}}).then((function(t){return n(t)}))]).then((function(t){T.textContent=t[0].name,z.textContent=t[0].about,A.style.backgroundImage="url(".concat(t[0].avatar,")"),t[1].forEach((function(e){var n=r(e,P,t[0]._id);p.append(n)}))})).catch((function(t){return console.log(t)}));var P=function(t,e){i(y);var n=y.querySelector(".popup__image");n.src=t.src,n.alt=t.alt,y.querySelector(".popup__caption").textContent=e};f.addEventListener("click",(function(){i(m)})),_.addEventListener("click",(function(){i(v),b.value=S.textContent,q.value=k.textContent})),A.addEventListener("click",(function(){i(h)})),v.addEventListener("click",(function(t){u(t),function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(n){t.querySelector(".".concat(n.id,"-error")).textContent="",n.classList.remove(e.inputErrorClass),s(o,e)}))}(C,B)})),v.addEventListener("submit",(function(o){o.preventDefault();var r,c,i=v.querySelector(".popup__button");i.textContent="Сохранение...",(r=b.value,c=q.value,fetch("".concat(t,"/users/me"),{method:"PATCH",headers:{authorization:e,"Content-Type":"application/json"},body:JSON.stringify({name:r,about:c})}).then((function(t){return n(t)}))).then((function(t){S.textContent=t.name,k.textContent=t.about,a(v)})).catch((function(t){return console.log(t)})).finally((function(){return i.textContent="Сохранение"}))})),m.addEventListener("click",u),m.addEventListener("submit",(function(o){o.preventDefault();var c,i,u=m.querySelector(".popup__button");u.textContent="Сохранение...",(c=E.value,i=g.value,fetch("".concat(t,"/cards"),{method:"POST",headers:{authorization:e,"Content-Type":"application/json"},body:JSON.stringify({name:c,link:i})}).then((function(t){return n(t)}))).then((function(t){p.prepend(r(t,P,t.owner._id)),a(m),form.reset()})).catch((function(t){return console.log(t)})).finally((function(){return u.textContent="Сохранение"}))})),y.addEventListener("click",u),h.addEventListener("submit",(function(o){o.preventDefault();var r,c=h.querySelector(".popup__button");c.textContent="Сохранение...",(r=x.value,fetch("".concat(t,"/users/me/avatar"),{method:"PATCH",headers:{authorization:e,"Content-Type":"application/json"},body:JSON.stringify({avatar:r})}).then((function(t){return n(t)}))).then((function(t){A.style.backgroundImage="url(".concat(t.avatar,")"),a(h)})).catch((function(t){return console.log(t)})).finally((function(){c.textContent="Сохранение"}))})),h.addEventListener("click",u)})();