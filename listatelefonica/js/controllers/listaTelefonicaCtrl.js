angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http, contatosResource, operadorasResource){
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];

    var carregarContatos = function(){
        contatosResource.getContatos().success(function (data, status){
           $scope.contatos = data;
        }).error(function(data, status){
            $scope.message = "Aconteceu um problema ao buscar: "  + data;

        });
    };
    var carregarOperadoras = function(){
        operadorasResource.getOperadoras().success(function (data, status){
           $scope.operadoras = data;
        });
    };

    $scope.adicionarContato = function(contato){
        contato.data = new Date();
        contatosResource.saveContato(contato).success(function (data){
            console.log(data)
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });                    
    };
    $scope.apagarContato = function(contatos){
        $scope.contatos  = contatos.filter(function(contato){
           if(!contato.selecionado) return contato;
        });
    };

    $scope.isContatoSelecionado = function(contatos){
        return contatos.some(function(contato){
           return contato.selecionado;
        });
    };

    $scope.ordernarPor = function(campo){
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };       
    
    carregarContatos();
    carregarOperadoras();
});