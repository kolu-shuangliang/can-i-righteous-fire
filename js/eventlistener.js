var vars = {
    life: 0,
    es: 0,
    baseRes: 75,
    barbarism: 0,
    rotp: false,
    purity: 0,
    aura: 0,
    regen: 0,
    vitality: 0
};


// Get all inputs that gets values from user
var inputList = document.getElementsByClassName( 'cirf-input' );

for( var x = 0; x < inputList.length; x++ ){
    inputList[ x ].addEventListener( 'change', function( event ){
        var name = this.getAttribute( 'name' );
        
        // Checks for rise of the phoenix checkbox
        if( name.localeCompare( 'rotp' ) == 0 ){
            vars[ name ] = this.checked;
        }
        // Checks for barbarism passive checkbox
        else if( name.localeCompare( 'barbarism' ) == 0 ){
            if( this.checked )
                vars.barbarism = 1;
            else
                vars.barbarism = 0;
        }
        // Everything else
        else{
            vars[ name ] = Number( this.value );
        }
        
        calculateResult();
    }, false );
}


function calculateResult(){
    console.log( vars );
}