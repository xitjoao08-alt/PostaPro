/* ==================================================
   POSTAPRO V2
   Gerador de posts + legendas + WhatsApp
================================================== */


/* ================= ELEMENTOS ================= */

const businessInput =
  document.getElementById("business");

const productInput =
  document.getElementById("product");

const priceInput =
  document.getElementById("price");

const offerInput =
  document.getElementById("offer");

const descriptionInput =
  document.getElementById("description");

const styleInput =
  document.getElementById("style");

const generateButton =
  document.getElementById("generateButton");

const generatedPost =
  document.getElementById("generatedPost");

const captionOutput =
  document.getElementById("captionOutput");

const whatsappOutput =
  document.getElementById("whatsappOutput");

const copyTextButton =
  document.getElementById("copyTextButton");

const copyWhatsappButton =
  document.getElementById("copyWhatsappButton");

const copyCaptionButton =
  document.getElementById("copyCaptionButton");

const downloadButton =
  document.getElementById("downloadButton");

const toast =
  document.getElementById("toast");


/* ================= ESTADO ================= */

let currentCaption = "";
let currentWhatsapp = "";
let currentPostData = null;


/* ==================================================
   GERAR
================================================== */

generateButton.addEventListener(
  "click",
  generatePost
);


function generatePost() {

  const business =
    businessInput.value.trim() ||
    "Minha Empresa";

  const product =
    productInput.value.trim() ||
    "Produto Especial";

  const price =
    priceInput.value.trim() ||
    "R$ 29,90";

  const offer =
    offerInput.value.trim() ||
    "Oferta especial";

  const description =
    descriptionInput.value.trim() ||
    "Uma experiência especial esperando por você.";

  const style =
    styleInput.value;


  generateButton.classList.add(
    "loading"
  );

  generateButton.textContent =
    "✨ Criando seu post...";


  setTimeout(() => {

    currentPostData = {
      business,
      product,
      price,
      offer,
      description,
      style
    };


    renderPost(
      currentPostData
    );

    generateCaption(
      currentPostData
    );

    generateWhatsapp(
      currentPostData
    );


    generateButton.classList.remove(
      "loading"
    );

    generateButton.textContent =
      "✨ Gerar novamente";


    downloadButton.disabled =
      false;

    copyCaptionButton.disabled =
      false;

  }, 650);

}


/* ==================================================
   RENDER POST
================================================== */

function renderPost(data) {

  const background =
    getBackground(
      data.style
    );


  generatedPost.innerHTML = `

    <div
      class="generated-design"
      style="background:${background}"
    >

      <div class="generated-brand">
        ${escapeHTML(data.business)}
      </div>


      <div class="generated-main">

        <small>
          OFERTA ESPECIAL
        </small>

        <h3>
          ${escapeHTML(
            data.product
          )}
        </h3>

        <p>
          ${escapeHTML(
            data.description
          )}
        </p>

      </div>


      <div class="generated-bottom">

        <div class="generated-price">
          ${escapeHTML(
            data.price
          )}
        </div>

        <div class="generated-offer">
          ${escapeHTML(
            data.offer
          )}
        </div>

      </div>

    </div>

  `;

}


/* ==================================================
   ESTILOS
================================================== */

function getBackground(style) {

  switch (style) {

    case "premium":

      return `
        radial-gradient(
          circle at 85% 80%,
          #6c3bff 0,
          transparent 32%
        ),
        linear-gradient(
          145deg,
          #29242d,
          #08080a 70%
        )
      `;


    case "vibrante":

      return `
        radial-gradient(
          circle at 80% 80%,
          #9b65ff 0,
          transparent 38%
        ),
        linear-gradient(
          145deg,
          #39127a,
          #100718
        )
      `;


    case "minimalista":

      return `
        linear-gradient(
          145deg,
          #29292d,
          #101014
        )
      `;


    default:

      return `
        radial-gradient(
          circle at 80% 80%,
          #6c3bff 0,
          transparent 33%
        ),
        linear-gradient(
          145deg,
          #25252b,
          #09090b 70%
        )
      `;

  }

}


/* ==================================================
   LEGENDA
================================================== */

function generateCaption(data) {

  currentCaption =
`🔥 ${data.product} em destaque!

${data.description}

💰 ${data.price}
🎁 ${data.offer}

📲 Chame a gente e aproveite!

#${makeHashtag(data.business)}
#promocao #oferta #negocio`;


  captionOutput.textContent =
    currentCaption;

}


/* ==================================================
   WHATSAPP
================================================== */

function generateWhatsapp(data) {

  currentWhatsapp =
`🔥 OFERTA ESPECIAL!

Olá! Temos uma novidade para você:

🍔 ${data.product}

💰 ${data.price}
🎁 ${data.offer}

${data.description}

Quer aproveitar?

📲 Fale com a gente agora!`;


  whatsappOutput.textContent =
    currentWhatsapp;

}


/* ==================================================
   COPIAR LEGENDA
================================================== */

copyTextButton.addEventListener(
  "click",
  () => {

    if (!currentCaption) {

      showToast(
        "Gere um post primeiro."
      );

      return;
    }

    copyText(
      currentCaption
    );

  }
);


copyCaptionButton.addEventListener(
  "click",
  () => {

    if (!currentCaption) {
      return;
    }

    copyText(
      currentCaption
    );

  }
);


/* ==================================================
   COPIAR WHATSAPP
================================================== */

copyWhatsappButton.addEventListener(
  "click",
  () => {

    if (!currentWhatsapp) {

      showToast(
        "Gere um post primeiro."
      );

      return;
    }

    copyText(
      currentWhatsapp
    );

  }
);


/* ==================================================
   CLIPBOARD
================================================== */

async function copyText(text) {

  try {

    await navigator.clipboard.writeText(
      text
    );

    showToast(
      "Copiado com sucesso!"
    );

  } catch (error) {

    showToast(
      "Não foi possível copiar."
    );

  }

}


/* ==================================================
   DOWNLOAD
================================================== */

downloadButton.addEventListener(
  "click",
  async () => {

    if (!currentPostData) {

      showToast(
        "Gere um post primeiro."
      );

      return;
    }


    try {

      const canvas =
        createCanvas(
          currentPostData
        );


      const link =
        document.createElement("a");


      link.download =
        "post-postapro.png";


      link.href =
        canvas.toDataURL(
          "image/png"
        );


      link.click();


      showToast(
        "Arte baixada!"
      );

    } catch (error) {

      console.error(error);

      showToast(
        "Não foi possível baixar."
      );

    }

  }
);


/* ==================================================
   CANVAS
================================================== */

function createCanvas(data) {

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    1080;

  canvas.height =
    1080;


  const ctx =
    canvas.getContext(
      "2d"
    );


  /* Fundo */

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
    "#08080a"
  );


  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    1080,
    1080
  );


  /* Glow */

  const glow =
    ctx.createRadialGradient(
      850,
      850,
      20,
      850,
      850,
      430
    );


  glow.addColorStop(
    0,
    "rgba(108,59,255,.8)"
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


  /* Marca */

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "900 32px Inter, Arial";

  ctx.fillText(
    data.business,
    70,
    90
  );


  /* Label */

  ctx.fillStyle =
    "#c8baff";

  ctx.font =
    "900 20px Inter, Arial";

  ctx.fillText(
    "OFERTA ESPECIAL",
    70,
    255
  );


  /* Produto */

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "900 82px Inter, Arial";


  const productLines =
    splitText(
      data.product.toUpperCase(),
      820,
      ctx
    );


  let y =
    370;


  productLines.forEach(
    line => {

      ctx.fillText(
        line,
        70,
        y
      );

      y += 95;

    }
  );


  /* Descrição */

  ctx.fillStyle =
    "#d2d2d7";

  ctx.font =
    "28px Inter, Arial";


  const descriptionLines =
    splitText(
      data.description,
      750,
      ctx
    );


  y += 20;


  descriptionLines.forEach(
    line => {

      ctx.fillText(
        line,
        70,
        y
      );

      y += 42;

    }
  );


  /* Preço */

  ctx.fillStyle =
    "#ffffff";

  ctx.fillRect(
    70,
    830,
    260,
    90
  );


  ctx.fillStyle =
    "#08080a";

  ctx.font =
    "900 37px Inter, Arial";

  ctx.fillText(
    data.price,
    95,
    887
  );


  /* Oferta */

  ctx.fillStyle =
    "#ded5ff";

  ctx.font =
    "900 25px Inter, Arial";


  const offer =
    data.offer.length > 25
      ? data.offer.substring(
          0,
          25
        ) + "..."
      : data.offer;


  ctx.fillText(
    offer,
    700,
    880
  );


  return canvas;

}


/* ==================================================
   QUEBRA DE TEXTO
================================================== */

function splitText(
  text,
  maxWidth,
  ctx
) {

  const words =
    text.split(" ");

  const lines = [];

  let line = "";


  words.forEach(
    word => {

      const test =
        line + word + " ";

      const width =
        ctx.measureText(
          test
        ).width;


      if (
        width > maxWidth &&
        line !== ""
      ) {

        lines.push(
          line.trim()
        );

        line =
          word + " ";

      } else {

        line =
          test;

      }

    }
  );


  if (line.trim()) {

    lines.push(
      line.trim()
    );

  }


  return lines;

}


/* ==================================================
   HASHTAG
================================================== */

function makeHashtag(text) {

  return text
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-zA-Z0-9]/g,
      ""
    )
    .toLowerCase();

}


/* ==================================================
   SEGURANÇA
================================================== */

function escapeHTML(text) {

  return String(text)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* ==================================================
   TOAST
================================================== */

function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );


  setTimeout(
    () => {

      toast.classList.remove(
        "show"
      );

    },
    2200
  );

}
