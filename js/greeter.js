
function start_authentication(username)
{
    selected_user = username;
    reset();
    lightdm.cancel_authentication();
    show_message("");
    lightdm.start_authentication(username);
}


function provide_secret()
{
    entry = document.getElementById('password_entry_' + selected_user);
    lightdm.provide_secret(entry.value);
}

function show_message(text)
{
    tabla = document.getElementById('message_table_' + selected_user);
    etiqueta = document.getElementById('message_label_' + selected_user);
    etiqueta.innerHTML = text;
    if (text.length > 0)
        tabla.style.visibility = "visible";
    else
        tabla.style.visibility = "hidden";
}

function reset()
{
    usuarios = document.getElementsByClassName('fila_usuario');
    for (ii=0; ii < usuarios.length; ii++)
    {
        fila = usuarios[ii];
        fila.style.opacity = 1;
    }

    pass_usuarios = document.getElementsByClassName('password_table');
    for (ii=0; ii < pass_usuarios.length; ii++)
    {
        fila = pass_usuarios[ii];
        fila.style.visibility = "hidden";
    }

    password_prompt = false;
}

/**
 * Si falla la carga de la imagen del usuario, cargo una imagen default
 * que se ha dejado en la raíz del tema. Es una medida desesperada debido a un
 * bug en lightdm-webkit-greeter
*/
function imgNotFound(source) {
    source.src = "Cake-icon.png";
    source.onerror = "";
    return true;
}


/**
 * Lightdm Callbacks
 */

function show_prompt(text)
{
    password_prompt = true;

    usuarios = document.getElementsByClassName('fila_usuario');
    for (ii=0; ii < usuarios.length; ii++)
    {
        fila = usuarios[ii];
        fila.style.opacity = 0.25;
    }

    tabla = document.getElementById('password_table_' + selected_user);
    tabla.style.visibility = "visible";

    entry = document.getElementById('password_entry_' + selected_user);
    entry.value = '';
    entry.focus;
}

function authentication_complete()
{
    if (lightdm.is_authenticated)
        lightdm.login(lightdm.authentication_user, lightdm.default_session);
    else
        show_message("Authentication Failed");

    reset();
}
