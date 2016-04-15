/*

Example of scanned barcode:
176100\\tm\\t\\tTinus\\t\\tTest\\tHage Weer 11 \\t\\t\\t1111 AA\\tPlaats\\tHBO Master - Economisch / Business\\ttest@memory.nl\\tYP\\tDe Nationale Carri&@232;rebeurs\\t06/1990\\t1980-05-30\\n

Replacing all tabs by newlines will give us:
    00: 76100                                    // Some kind of ID
    01: m                                        // Gender
    02:                                          // ???
    03: Tinus                                    // First name
    04:                                          // "tussenvoegsel"
    05: Test                                     // Surname
    06: Hage Weer 11                             // Street + nr
    07:                                          // ???
    08:                                          // ???
    09: 1111 AA                                  // Zipcode
    10: Plaats                                   // City
    11: HBO Master - Economisch / Business       // Study - Specialization
    12: test@memory.nl                           // e-mail address
    13: YP                                       // ???
    14: De Nationale Carri&@232;rebeurs          // Current event
    15: 06/1990                                  // ??? (Some date? Or borked phone nr?)
    16: 1980-05-30                               // Birthdate


More, for science...
42\\tm\\t\\tBob\\tter\\tHacker\\tLalalalaan 42\\t\\t\\t1337 AZ\\tHackerville\\tL33tz0r sCh00L\\tme@bobthacker.nl\\tYP\\tDe Nationale Carri&@232;rebeurs\\t06/1990\\t1901-01-01\\n

 */

var BEURS_ID = "De Nationale Carri&@232;rebeurs";

var PERSON_ID = 0;
var PERSON_GENDER = 1;
var PERSON_FIRSTNAME = 3;
var PERSON_PREFIX = 4;
var PERSON_SURNAME = 5;
var PERSON_ADDRESS = 6;
var PERSON_ZIPCODE = 9;
var PERSON_CITY = 10;
var PERSON_STUDY = 11;
var PERSON_EMAIL = 12;
var PERSON_BIRTHDATE = 16;

var g_aCurrentPerson = [];

function isBarcodeComplete(p_sText)
{
    // The barcode is not complete until it ends in \\n:
    return p_sText.endsWith("\\n");
} // function

function checkBarCode(p_sText)
{
    if (!isBarcodeComplete(p_sText)) return false;

    if (p_sText.includes(BEURS_ID)) {
        aParts = p_sText.replace("\\\\n", "").split("\\\\t");
        if (aParts.length == 17) {

            // store this barcode!
            // TODO: check if there's a previous record present
            localStorage.setItem("person-" + aParts[PERSON_ID], JSON.stringify(aParts));

            g_aCurrentPerson = aParts;

            return true;
        } // if
    } // if

    return false;
} // function

