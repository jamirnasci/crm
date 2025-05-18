const params = new URLSearchParams(window.location.search);

const err = params.get('err');

if(err){
    alert(err)
}
