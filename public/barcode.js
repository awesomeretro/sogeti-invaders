/*

Example of scanned barcode:
76100\\tm\\t\\tTinus\\t\\tTest\\tHage Weer 11 \\t\\t\\t1111 AA\\tPlaats\\tHBO Master - Economisch / Business\\ttest@memory.nl\\tYP\\tDe Nationale Carri&@232;rebeurs\\t06/1990\\t1980-05-30\\n

Replacing all tabs by newlines will give us:
    01: 76100                                    // Some kind of ID
    02: m                                        // Gender
    03:                                          // ???
    04: Tinus                                    // First name
    05:                                          // "tussenvoegsel"
    06: Test                                     // Surname
    07: Hage Weer 11                             // Street + nr
    08:                                          // ???
    09:                                          // ???
    10: 1111 AA                                  // Zipcode
    11: Plaats                                   // City
    12: HBO Master - Economisch / Business       // Study - Specialization
    13: test@memory.nl                           // e-mail address
    14: YP                                       // ???
    15: De Nationale Carri&@232;rebeurs          // Current event
    16: 06/1990                                  // ??? (Some date? Or borked phone nr?)
    17: 1980-05-30                               // Birthdate

 */




function CheckBarCode(p_sText)
{
    return (p_sText.length > 0);
} // function