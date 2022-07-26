  var baseURL = "https://localhost"
  
  $(document).ready(function() {

    var signer, network, account, parcelID;
     
    async function connectWallet(buttonClicked){
      var provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      // Prompt user for account connections
      try{
        signer = provider.getSigner();
        network = await provider.getNetwork()
        console.log(network.name + " " + network.chainId) 
      }catch(e){
        console.log(e);
      }finally{

      }

      if(network && network.name && ! buttonClicked){
        try{
          account = await signer.getAddress();
          localAccount = account;
          console.log("Account:", account);
        }catch(e){

        }finally{
          console.log(account);
          if(account){
            $("#connection-status").text("Connected to " + network.chainId);
            $.ajax({url: "/getuserparcels?useraddress=" + account, success: function(result){
              console.log(result);
              userParcels = result.userParcels;
              
              for(var m=0; m < userParcels.length; m++){
                userParcels.push(userParcels[m].parcelID);
              }
            
              for (var userParcelsCounter = 0; puserParcelsParcelsCounter < userParcels.length; userParcelsCounter++){
                userParcelsColorMap.set(userParcels[puserParcelsParcelsCounter].toString(), "white");
              }    
            }});
          }else{

          }
        }
      }else{
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        account = await signer.getAddress();
        localAccount = account;
        console.log("Account:", account);
        network = await provider.getNetwork()
        console.log(network.name + " " + network.chainId) 
        $("#connection-status").text("Connected to chain ID " + network.chainId + " with account " + account);
        $("#connect-wallet").text("Re-connect");
        $("#para-dropdown-parcels").css("display", "block");
        $("#divSelect").empty();
        $("#sign-publish").removeAttr("disabled");


        $.ajax({url: "https://localhost/getuserparcels?useraddress=" + account, success: function(result){
            console.log(result.userParcels.length);
            userParcels = result.userParcels;

            var divSelectContent = '<select id="choices-multiple-remove-button" style="display:none;" placeholder="Select your parcel(s)" multiple></select> </div>'
            $("#divSelect").append(divSelectContent);
            for(var m=0; m < result.userParcels.length; m++){
                if(userParcels[m] && userParcels[m].parcelID && userParcels[m].owner) {
                    console.log(userParcels[m])
                    console.log(userParcels[m].parcelID)
                    $('#choices-multiple-remove-button').append('<option value="858">858</option>')
                }
              }

              var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
                removeItemButton: true,
                maxItemCount:5,
                searchResultLimit:5,
                renderChoiceLimit:5
              }); 

        }})
      }


    }

    async function processSignandPublish(){
        console.log("in processSignandPublish");
        parcelID = $("#choices-multiple-remove-button").val();  

        //console.log(signature);
        if(parcelID==""){
            $.notify("Please select parcel ID");
        }else{
            var signature = await signer.signMessage("Publishing to parcel #" + parcelID);
            
        }
        //Connect to expressjs route
        var data = {}
        $.ajax( {
          url: '/publishscene',
          type: 'POST',
          data: JSON.stringify(data),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: async function(result){
            console.log(result);
            $("#publishupdate").html(`Deployed mapp on <a href="${baseURL}/metaverse/${result.details.humanReadableID}/" target="_blank">URL</a>`)
          }
        })
        
    }

    //connectWallet();

    $("#connect-wallet").click(function(){
      connectWallet(true);
    })

    $("#sign-publish").click(function(){
      processSignandPublish();
    })
  
  });