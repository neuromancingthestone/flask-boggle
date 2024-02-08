$(".add-guess").on("submit", this.formHandler);

async function formHandler(e) {
    e.preventDefault();
    const $guess = $("#guess");
    const $resp = $(".resp");    

    console.log(`guess is -${$guess.val()}-`);

    if($guess.val() == "" ){
        $resp.text("GUESS CANNOT BE BLANK. GUESS AGAIN!");
        return;
    }

    const response = await axios.get("/verify",
    {
        params: {
            word: $guess.val()
        }
    });

    console.log(response);
    resp = response.data.result;
    if(resp == "ok") {
        $resp.text(`-${$guess.val().toUpperCase()}- FOUND! GOOD GUESS!`);
        score += $guess.val().length();
    }
    else if(resp == "not-on-board") {
        $resp.text(`-${$guess.val().toUpperCase()}- NOT ON BOARD. TRY AGAIN!`);
    } 
    else if(resp == "not-word") {
        $resp.text(`-${$guess.val().toUpperCase()}- NOT A VALID WORD. GUESS A REAL WORD!`);
    }

    return;
}