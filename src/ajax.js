function ajax(url, method = 'GET') {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                alert('User\'s name is ' + xhr.responseText);
                resolve(xhr.response);
            }
            else {
                alert('Request failed.  Returned status of ' + xhr.status);
                reject('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();
    });

}

export { ajax };