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
        
        // Checks for rise of the phoenix checkbox.
        if( name.localeCompare( 'rotp' ) == 0 ){
            if( this.checked )
                vars.rotp = 8;
            else
                vars.rotp = 0;
        }
        // Checks for barbarism passive checkbox.
        else if( name.localeCompare( 'barbarism' ) == 0 ){
            if( this.checked )
                vars.barbarism = 1;
            else
                vars.barbarism = 0;
        }
        // Everything else.
        else{
            vars[ name ] = Number( this.value );
        }
        
        calculateResult();
    }, false );
}


function calculateResult(){
    // Calculate total resistance and display it on html element.
    // Last value is max resist given by purity multiplied by aura effective multiplier.
    var resistance = vars.baseRes + vars.barbarism + vars.rotp + vars.purity + ( Math.floor( vars.purity * ( vars.aura / 100 ) ) );
    document.getElementById( 'resistance' ).value = resistance;
    
    // TODO CALCS
    // lifeDamage
    var lifeDamage = vars.life * 0.9;
    document.getElementById( 'lifeDamage' ).value = lifeDamage;
    
    // TODO CALCS
    // esDamage
    var esDamage = vars.es * 0.7;
    document.getElementById( 'esDamage' ).value = esDamage;
    
    // TODO CALCS
    // lifeDamageReduced
    var lifeDamageReduced = lifeDamage * ( ( 100 - resistance ) / 100 );
    document.getElementById( 'lifeDamageReduced' ).value = lifeDamageReduced;
    
    // TODO CALCS
    // esDamageReduced
    var esDamageReduced = esDamage * ( ( 100 - resistance ) / 100 );
    document.getElementById( 'esDamageReduced' ).value = esDamageReduced;
    
    // TODO CALCS
    // totalDamage
    var totalDamage = esDamageReduced + lifeDamageReduced;
    document.getElementById( 'totalDamage' ).value = totalDamage;
    
    // TODO CALCS
    // lifeRegenRequired
    if( vars.life != 0 ){
        var lifeRegenRequired = totalDamage / vars.life * 100;
        document.getElementById( 'lifeRegenRequired' ).value = lifeRegenRequired;
    }
    
    // TODO CALCS
    // esRegenRequired
    if( vars.es != 0 ){
        var esRegenRequired = totalDamage / vars.es * 100;
        document.getElementById( 'esRegenRequired' ).value = esRegenRequired;
    }
    // TODO CALCS
    // result
    // Floor to 2 decimal places. Which is any / 100 is outside
    var totalRegen = vars.regen + vars.vitality + ( Math.floor( vars.vitality * vars.aura ) / 100 );
    
    if( totalRegen >= lifeRegenRequired){
        var resultElement = document.getElementById( 'result' );
        resultElement.innerHTML =  'Life [ ' + ( totalRegen - lifeRegenRequired ) + ' ] YES!';
        resultElement.style.backgroundColor = 'green';   
    }
    else if( totalRegen >= esRegenRequired ){
        var resultElement = document.getElementById( 'result' );
        resultElement.innerHTML = 'ES [ ' + ( totalRegen - esRegenRequired ) + ' ] YES!';
        resultElement.style.backgroundColor = 'green';   
    }
    else{
        var resultElement = document.getElementById( 'result' );
        resultElement.innerHTML = 'NOP!';
        resultElement.style.backgroundColor = 'red';   
    }
}