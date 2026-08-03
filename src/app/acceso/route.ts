import { NextResponse, type NextRequest } from "next/server";
import { clienteDeRuta, rutaDeRetornoSegura } from "@/lib/acceso";

export const dynamic = "force-dynamic";

function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Formulario de identificación previo a cualquier propuesta de /p/.
 * Se sirve como documento HTML propio, fuera del layout del sitio, para que
 * herede la estética de los portales de cliente y no la del sitio público.
 */
export async function GET(request: NextRequest) {
  const retorno = rutaDeRetornoSegura(request.nextUrl.searchParams.get("r"));
  const cliente = retorno ? clienteDeRuta(retorno) : "Onza";
  const clienteHtml = escapar(cliente);

  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Acceso al documento · Onza</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
<style>
:root{--bg:#0C0C0C;--bg1:#141414;--border:#2A2A2A;--white:#fff;--off:#E8E8E8;--light:#C8C8C8;--med:#8A8A8A;--dim:#555;--red:#FF3B30;--gold:#D4AF37;--serif:"Playfair Display",Georgia,serif;--sans:"Inter",sans-serif}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--off);font-family:var(--sans);font-weight:300;min-height:100vh;display:flex;flex-direction:column}
body::before{content:"";position:fixed;inset:0;pointer-events:none;background:radial-gradient(circle at 15% 5%,rgba(212,175,55,.10),transparent 40%),radial-gradient(circle at 85% 95%,rgba(255,59,48,.10),transparent 40%)}
header{padding:26px 28px;max-width:960px;margin:0 auto;width:100%}
header .onza{font-weight:300;letter-spacing:8px;font-size:17px;color:var(--off)}
main{position:relative;flex:1;display:flex;align-items:center;justify-content:center;padding:24px 28px 56px}
.caja{width:100%;max-width:520px}
.eyebrow{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:18px}
h1{font-family:var(--serif);font-weight:400;font-size:clamp(30px,5vw,46px);line-height:1.08;color:var(--white);letter-spacing:-.01em}
h1 em{color:var(--gold);font-style:italic}
.intro{margin-top:16px;color:var(--light);font-size:15px;line-height:1.65}
form{margin-top:34px;background:var(--bg1);border:.5px solid var(--border);border-radius:12px;padding:28px 26px}
.campo{margin-bottom:18px}
label{display:block;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:var(--med);margin-bottom:8px}
input{width:100%;background:#0F0F0F;border:.5px solid var(--border);border-radius:8px;padding:13px 14px;color:var(--white);font-family:var(--sans);font-weight:300;font-size:15px;transition:border-color .3s}
input:focus{outline:none;border-color:rgba(212,175,55,.55)}
input::placeholder{color:#4A4A4A}
button{width:100%;margin-top:8px;background:var(--gold);color:#0C0C0C;border:none;border-radius:8px;padding:15px 18px;font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;transition:opacity .3s}
button:hover{opacity:.86}
button[disabled]{opacity:.45;cursor:default}
.error{display:none;margin-top:14px;color:var(--red);font-size:13px;line-height:1.5}
.nota{margin-top:20px;font-size:11.5px;color:var(--dim);line-height:1.7}
footer{border-top:.5px solid var(--border);padding:22px 28px;max-width:960px;margin:0 auto;width:100%;display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;font-size:10.5px;letter-spacing:1.5px;text-transform:uppercase;color:var(--med)}
footer .onza{font-weight:300;letter-spacing:7px;font-size:14px;color:var(--off)}
</style>
</head>
<body>
<header><span class="onza">ONZA</span></header>

<main>
  <div class="caja">
    <div class="eyebrow">Documento confidencial · ${clienteHtml}</div>
    <h1>Antes de abrirlo,<br><em>¿con quién hablamos?</em></h1>
    <p class="intro">Este material se preparó para ${clienteHtml}. Dejamos registro de quién lo consulta para poder acompañar la revisión y responder dudas a la persona correcta.</p>

    <form id="form" novalidate>
      <div class="campo">
        <label for="nombre">Nombre y apellido</label>
        <input id="nombre" name="nombre" type="text" autocomplete="name" placeholder="Ana Martínez" required>
      </div>
      <div class="campo">
        <label for="correo">Correo corporativo</label>
        <input id="correo" name="correo" type="email" autocomplete="email" placeholder="ana@empresa.com" required>
      </div>
      <div class="campo">
        <label for="empresa">Empresa</label>
        <input id="empresa" name="empresa" type="text" autocomplete="organization" placeholder="${clienteHtml}" required>
      </div>
      <div class="campo">
        <label for="cargo">Cargo</label>
        <input id="cargo" name="cargo" type="text" autocomplete="organization-title" placeholder="Gerente de Operaciones" required>
      </div>
      <button id="enviar" type="submit">Abrir el documento</button>
      <p class="error" id="error"></p>
    </form>

    <p class="nota">Tus datos quedan solo en nuestro registro interno de seguimiento. No se comparten con terceros ni se usan para envíos masivos.</p>
  </div>
</main>

<footer>
  <div>by <span class="onza">ONZA</span></div>
  <div>Onza · Arquitectura de soluciones IA</div>
</footer>

<script>
(function () {
  var retorno = ${JSON.stringify(retorno ?? "/")};
  var form = document.getElementById("form");
  var boton = document.getElementById("enviar");
  var error = document.getElementById("error");

  function fallar(mensaje) {
    error.textContent = mensaje;
    error.style.display = "block";
    boton.disabled = false;
    boton.textContent = "Abrir el documento";
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    error.style.display = "none";

    var datos = {
      nombre: form.nombre.value.trim(),
      correo: form.correo.value.trim(),
      empresa: form.empresa.value.trim(),
      cargo: form.cargo.value.trim(),
      r: retorno
    };

    if (!datos.nombre || !datos.correo || !datos.empresa || !datos.cargo) {
      return fallar("Faltan datos. Los cuatro campos son necesarios para continuar.");
    }
    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(datos.correo)) {
      return fallar("Revisa el correo: no parece una dirección válida.");
    }

    boton.disabled = true;
    boton.textContent = "Abriendo...";

    fetch("/api/acceso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    })
      .then(function (respuesta) {
        return respuesta.json().then(function (cuerpo) {
          if (!respuesta.ok) throw new Error(cuerpo.error || "No pudimos abrir el documento.");
          return cuerpo;
        });
      })
      .then(function (cuerpo) {
        window.location.replace(cuerpo.r || retorno);
      })
      .catch(function (e) {
        fallar(e.message || "No pudimos abrir el documento. Intenta de nuevo.");
      });
  });
})();
</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
