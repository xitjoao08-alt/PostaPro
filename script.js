/* ==========================================
   POSTAPRO — V1
========================================== */


/* ELEMENTOS */

const generateButton = document.getElementById("generateButton");

const businessInput = document.getElementById("business");
const productInput = document.getElementById("product");
const priceInput = document.getElementById("price");
const offerInput = document.getElementById("offer");
const descriptionInput = document.getElementById("description");
const styleInput = document.getElementById("style");

const generatedPost = document.getElementById("generatedPost");

const captionOutput = document.getElementById("captionOutput");
const whatsappOutput = document.getElementById("whatsappOutput");

const copyTextButton = document.getElementById("copyTextButton");
const copyWhatsappButton = document.getElementById("copyWhatsappButton");

const copyCaptionButton = document.getElementById("copyCaptionButton");
const downloadButton = document.getElementById("downloadButton");

const toast = document.getElementById("toast");


let currentCaption = "";
let currentWhatsapp = "";
let currentPostData = null;


/* ==========================================
   GERAR POST
========================================== */

generateButton.addEventListener("click", generatePost);


function generatePost() {

  const business =
    businessInput.value.trim() || "Minha Empresa";

  const product =
    productInput.value.trim() || "Produto Especial";

  const price =
    priceInput.value.trim() || "R$ 29,90";

  const offer =
    offerInput.value.trim() || "Oferta especial";

  const description =
    descriptionInput.value.trim() ||
    "Uma experiência especial esperando por você.";

  const style =
    styleInput.value;


  generateButton.classList.add("loading");

  generateButton.textContent = "✨ Criando...";


  setTimeout(() => {

    currentPostData = {
      business,
      product,
      price,
      offer,
      description,
      style
    };


    createPostPreview(currentPostData);

    createCaption(currentPostData);

    createWhatsapp(currentPostData);


    generateButton.classList.remove("loading");

    generateButton.textContent = "✨ Gerar novamente";

    downloadButton.disabled = false;
    copyCaptionButton.disabled = false;

  }, 700);

}


/* ==========================================
   CRIAR PRÉVIA
========================================== */

function createPostPreview(data) {

  let background;


  switch (data.style) {

    case "premium":

      background = `
        radial-gradient(
          circle at 85% 75%,
          #6c3bff 0,
          transparent 30%
        ),
        linear-gradient(
          145deg,
          #242126,
          #08080a 70%
        )
      `;

      break;


    case "vibrante":

      background = `
        radial-gradient(
          circle at 80% 80%,
          #8b5cff 0,
          transparent 35%
        ),
        linear-gradient(
          145deg,
          #331477,
          #100817
        )
      `;

      break;


    case "minimalista":

      background = `
        linear-gradient(
          145deg,
          #29292d,
          #101014
        )
      `;

      break;


    default:

      background = `
        radial-gradient(
          circle at 80% 75%,
          #6c3bff 0,
          transparent 32%
        ),
        linear-gradient(
          145deg,
          #222227,
          #09090b 70%
        )
      `;

  }


  generatedPost.innerHTML = `

    <div
      class="generated-design"
      style="background: ${background}"
    >

      <div class="generated-brand">
        ${escapeHTML(data.business)}
      </div>


      <div class="generated-main">

        <small>PROMOÇÃO ESPECIAL</small>

        <h3>
          ${escapeHTML(data.product)}
        </h3>

        <p>
          ${escapeHTML(data.description)}
        </p>

      </div>


      <div class="generated-bottom">

        <div>

          <div class="generated-price">
            ${escapeHTML(data.price)}
          </div>

        </div>


        <div class="generated-offer">
          ${escapeHTML(data.offer)}
        </div>

      </div>

    </div>

  `;

}


/* ==========================================
   GERAR LEGENDA
========================================== */

function createCaption(data) {

  currentCaption =
`🔥 ${data.product} em destaque!

${data.description}

💰 ${data.price}

🎁 ${data.offer}

📲 Chame a gente e aproveite!

#${createHashtag(data.business)}
#promocao #oferta #negocio`;

  captionOutput.textContent = currentCaption;

}


/* ==========================================
   GERAR WHATSAPP
========================================== */

function createWhatsapp(data) {

  currentWhatsapp =
`🔥 Opa! Temos uma oferta especial!

${data.product}
💰 ${data.price}

${data.offer}

${data.description}

Quer aproveitar? Fale com a gente agora!`;

  whatsappOutput.textContent = currentWhatsapp;

}


/* ==========================================
   COPIAR TEXTO
========================================== */

copyTextButton.addEventListener("click", () => {

  if (!currentCaption) {

    showToast("Gere um post primeiro.");

    return;
  }

  copyToClipboard(currentCaption);

});


copyWhatsappButton.addEventListener("click", () => {

  if (!currentWhatsapp) {

    showToast("Gere um post primeiro.");

    return;
  }

  copyToClipboard(currentWhatsapp);

});


copyCaptionButton.addEventListener("click", () => {

  if (!currentCaption) {

    return;
  }

  copyToClipboard(currentCaption);

});


async function copyToClipboard(text) {

  try {

    await navigator.clipboard.writeText(text);

    showToast("Copiado com sucesso!");

  } catch (error) {

    showToast("Não foi possível copiar.");

  }

}


/* ==========================================
   DOWNLOAD
========================================== */

downloadButton.addEventListener("click", async () => {

  if (!currentPostData) {

    showToast("Gere um post primeiro.");

    return;
  }


  /*
    V1:
    Como o PostaPro ainda é um site estático,
    o download será feito capturando a área
    visual do post.
  */


  try {

    const canvas =
      await createCanvasFromPost(currentPostData);

    const link =
      document.createElement("a");

    link.download =
      "post-postapro.png";

    link.href =
      canvas.toDataURL("image/png");

    link.click();

    showToast("Post baixado!");

  } catch (error) {

    console.error(error);

    showToast(
      "Use uma captura de tela nesta primeira versão."
    );

  }

});


/* ==========================================
   CANVAS PARA DOWNLOAD
========================================== */

async function createCanvasFromPost(data) {

  const canvas =
    document.createElement("canvas");

  canvas.width = 1080;
  canvas.height = 1080;

  const ctx =
    canvas.getContext("2d");


  /*
    Fundo
  */

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      1080,
      1080
    );

  gradient.addColorStop(
    0,
    "#25252b"
  );

  gradient.addColorStop(
    1,
    "#09090b"
  );

  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    1080,
    1080
  );


  /*
    Glow
  */

  const glow =
    ctx.createRadialGradient(
      850,
      850,
      20,
      850,
      850,
      400
    );

  glow.addColorStop(
    0,
    "rgba(108,59,255,0.75)"
  );

  glow.addColorStop(
    1,
    "rgba(108,59,255,0)"
  );

  ctx.fillStyle =
    glow;

  ctx.fillRect(
    0,
    0,
    1080,
    1080
  );


  /*
    Empresa
  */

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "bold 32px Inter, Arial";

  ctx.fillText(
    data.business,
    70,
    90
  );


  /*
    Label
  */

  ctx.fillStyle =
    "#c9baff";

  ctx.font =
    "bold 20px Inter, Arial";

  ctx.fillText(
    "PROMOÇÃO ESPECIAL",
    70,
    260
  );


  /*
    Produto
  */

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "bold 86px Inter, Arial";


  const productLines =
    splitText(
      data.product.toUpperCase(),
      800,
      ctx
    );


  let y =
    370;


  productLines.forEach(line => {

    ctx.fillText(
      line,
      70,
      y
    );

    y += 95;

  });


  /*
    Descrição
  */

  ctx.fillStyle =
    "#d1d1d6";

  ctx.font =
    "28px Inter, Arial";


  const descriptionLines =
    splitText(
      data.description,
      760,
      ctx
    );


  y += 25;


  descriptionLines.forEach(line => {

    ctx.fillText(
      line,
      70,
      y
    );

    y += 42;

  });


  /*
    Preço
  */

  ctx.fillStyle =
    "#ffffff";

  ctx.fillRect(
    70,
    830,
    260,
    90
  );


  ctx.fillStyle =
    "#09090b";

  ctx.font =
    "bold 38px Inter, Arial";

  ctx.fillText(
    data.price,
    95,
    887
  );


  /*
    Oferta
  */

  ctx.fillStyle =
    "#ddd4ff";

  ctx.font =
    "bold 25px Inter, Arial";

  ctx.fillText(
    data.offer,
    700,
    880
  );


  return canvas;

}


/* ==========================================
   QUEBRAR TEXTO
========================================== */

function splitText(text, maxWidth, ctx) {

  const words =
    text.split(" ");

  const lines = [];

  let line = "";


  words.forEach(word => {

    const testLine =
      line + word + " ";

    const metrics =
      ctx.measureText(testLine);

    if (
      metrics.width > maxWidth &&
      line !== ""
    ) {

      lines.push(line.trim());

      line =
        word + " ";

    } else {

      line =
        testLine;

    }

  });


  if (line.trim()) {

    lines.push(
      line.trim()
    );

  }


  return lines;

}


/* ==========================================
   HASHTAG
========================================== */

function createHashtag(text) {

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

}


/* ==========================================
   SEGURANÇA BÁSICA
========================================== */

function escapeHTML(text) {

  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* ==========================================
   TOAST
========================================== */

function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add("show");


  setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}
