var templateUser = `<div class="row">
                        <div class="col-md-8">
                            <div class="col-md-4">
                                <h3>**NOMEDEPTO**</h3>
                                <h3>**UNIDADE**</h3>
                                <h3>**NOME**</h3>
                                    Email: **EMAIL**
                                    RACF:  **RACF**
                           <hr>
                           </div>
                        </div>
                    </div>`;
function carregaDadosDepto(){
    var parametro = window.location.search;
    console.log("URL = "+parametro);

    var numDepto = parametro.substr(4);

    console.log("Numero do departamento = "+numDepto);

    // a partir daqui posso fazer um fetch no endpoint de departamento e
    // preencher um conjunto de linhas com todos os usuários daquele depto
    fetch("http://localhost:8080/departamentos/"+numDepto)
      .then(res => res.json())
      .then(res => preenche(res))
}

function preenche(res){
    console.log(res);    
    var linha = "";
    var dept = res.nome;
    var uni = res.unidade;
    for (i=0; i<res.listaUsuarios.length; i++){
        var user = res.listaUsuarios[i];
        linha = linha + templateUser.replace("**NOME**",user.nome)
                                    .replace("**EMAIL**",user.email)
                                    .replace("**RACF**", user.racf)
                                    .replace("**NOMEDEPTO**",dept)
                                    .replace("**UNIDADE**",uni)
    }
    document.getElementById("conteudo").innerHTML = linha;
}