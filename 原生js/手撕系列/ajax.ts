function ajax(meth: string, url: string) {
    let xhr = new XMLHttpRequest();
    xhr.open(meth, url)
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
            return xhr.responseText

        } else if (xhr.status >= 400) {
            console.log('error:', xhr.responseText);
        }
    }
    xhr.send(null)
}