import{i as o,a as y,S as v}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const b="44296746-7471de79088029a055864728c",w="https://pixabay.com/api/",$=document.getElementById("search-form"),u=document.querySelector(".gallery");let d="",a=1,f=0,m,E=!0;o.settings({position:"topRight"});const g=async(s,t)=>{const c=`${w}?key=${b}&q=${s}&image_type=photo&orientation=horizontal&safesearch=false&page=${t}&per_page=40`;try{return(await y.get(c)).data}catch(i){console.error("Error fetching images:",i),o.error({title:"Error",message:"Failed to fetch images"})}},L=({webformatURL:s,largeImageURL:t,tags:c,likes:i,views:e,comments:r,downloads:l})=>`
  <div class="photo-card">
    <a href="${t}" data-lightbox="gallery">
      <img src="${s}" alt="${c}" loading="lazy" />
    </a>
    <div class="info">
        <div class="info-item-wrapper">
            <p class="info-item"><b>Likes</b></p>
            <p class="info-item">${i}</p>
        </div>
        <div class="info-item-wrapper">
            <p class="info-item"><b>Views</b></p>
            <p class="info-item">${e}</p>
        </div>

        <div class="info-item-wrapper">
            <p class="info-item"><b>Comments</b></p>
            <p class="info-item">${r}</p>
        </div>

        <div class="info-item-wrapper">
            <p class="info-item"><b>Downloads</b></p>
            <p class="info-item">${l}</p>
        </div>
    </div>
  </div>
`,h=s=>{const t=s.map(L).join("");u.insertAdjacentHTML("beforeend",t),m?m.refresh():m=new v(".gallery a",{captionsData:"alt",captionDelay:250})},I=async s=>{if(s.preventDefault(),d=s.currentTarget.elements.searchQuery.value.trim(),p.unobserve(n),!d){o.warning({title:"Warning",message:"Please enter a valid search query."});return}a=1,u.innerHTML="";const t=await g(d,a);if(f=t.totalHits,t.hits.length===0){o.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again."});return}o.success({title:"Hooray!",message:`We found ${f} images.`}),h(t.hits),p.observe(n),f!==0&&t.hits.length<40&&o.warning({title:"End of results",message:"We're sorry, but you've reached the end of search results."})};$.addEventListener("submit",I);const O=async()=>{if(d&&a*40<f){a+=1;const s=await g(d,a);h(s.hits),(s.hits.length<40||a*40>=f)&&(o.warning({title:"End of results",message:"We're sorry, but you've reached the end of search results."}),p.unobserve(n))}},P=s=>{s.forEach(t=>{t.isIntersecting&&E&&O()})},p=new IntersectionObserver(P,{rootMargin:"200px"}),n=document.createElement("div");n.className="sentinel";document.body.appendChild(n);p.observe(n);
//# sourceMappingURL=commonHelpers.js.map
