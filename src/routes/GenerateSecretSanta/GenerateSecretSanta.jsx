import React from "react";
// import { auth } from "../../firebase/Firebase";

export default function GenerateSecretSanta(props) {

    // ! Cette fonction ne sert qu'a tester l'algo de la fonction attribution

    // const attribution_test = () => {
    //     var nbTry = 100000; // eviter de dépasser les 100K
    //     var fail = 0;

    //     const checkAutoGift = (result) => {
    //         for (var i = 0; i !== result.length; i++) {
    //             if (result[i].gifted === result[i].gifter)
    //             return -1;
    //         }
    //         return 1;
    //     }

    //     for (var i = 0; i !== nbTry; i++) {
    //         const result = attribution();
    //         if (checkAutoGift(result) === -1) {
    //             fail++;
    //             console.log(result);
    //         }
    //     }

    //     console.log("algo fail " +  fail + " times for " + nbTry + " tests");
    // }



    const attribution = () => {
        const gifter = ['test 1', 'test 2']; // mettre le tableau participants
        const gifted = [...gifter];
        const assossiationArray = [] // tableau d'objet gifter, gifted
        const size = gifter.length;

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        for (var i = 0; i < size - 2; i++) {
            var gifterIndex = 0;
            var giftedIndex = 0;

            while (gifter[gifterIndex] === gifted[giftedIndex]) {
                gifterIndex = getRandomInt(size - i);
                giftedIndex = getRandomInt(size - i);
            }
            assossiationArray.push({ gifter: gifter[gifterIndex], gifted: gifted[giftedIndex] });
            gifter.splice(gifterIndex, 1);
            gifted.splice(giftedIndex, 1);
        }
        if (gifter[0] === gifted[0] || gifter[1] === gifted[1]) {
            assossiationArray.push({ gifter: gifter[0], gifted: gifted[1] });
            assossiationArray.push({ gifter: gifter[1], gifted: gifted[0] });
        } else {
            assossiationArray.push({ gifter: gifter[0], gifted: gifted[0] });
            assossiationArray.push({ gifter: gifter[1], gifted: gifted[1] });
        }
        console.table("assossiation", assossiationArray);
        // return assossiationArray;
    }

    return (
        <div>
            <button onClick={attribution}>Generate</button>
        </div>
    )
}