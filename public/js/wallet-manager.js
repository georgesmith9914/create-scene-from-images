
$(document).ready(function(){
    $(".connect-wallet-btn").click(function(){
        console.log("create-asset-connect-wallet-btn clicked");
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            getAccount();
            $(this).html("Connected");
        }else{
            alert("Please install Metamask.");
        }
    })
})

async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    accountHere = account;
    console.log(account);
}