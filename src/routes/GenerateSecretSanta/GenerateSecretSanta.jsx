import React, { useRef, useState } from "react";
import PopUp from "../../components/PopUp/PopUp";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
// import { auth } from "../../firebase/Firebase";

export default function GenerateSecretSanta(props) {

    const [people, setPeople] = useState([{ name: "killian", email: "killianb31@gmail.com" }]);
    const [openPopUp, setOpenPopUp] = useState(false);
    const nameRef = useRef(null);
    const emailRef = useRef(null);

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
        const gifter = [...people];
        const gifted = [...people];
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

const addToArray = () => {
    const buff = [...people];
    buff.push({name: nameRef.current.value, email: emailRef.current.value});
    setPeople(buff);
}

const removeFromArray = (index) => {
    const buff = people.slice(0, index).concat(people.slice(index + 1));
    setPeople(buff);
}

    return (
        <div>
            <button onClick={attribution}>Generate</button>
            {people.map((element, index) => (
                <div key={index}>
                    <h1>Participant n°{index + 1}</h1>
                    <h2>{element.name}</h2>
                    <h3>{element.email}</h3>
                    <Button onClick={() => removeFromArray(index)}>-</Button>
                </div>
            ))}
            <div onClick={() => setOpenPopUp(true)}>
                <h2>Add people</h2>
            </div>
            {openPopUp &&
                <PopUp onClose={() => setOpenPopUp(false)}>
                    <p>Name</p>
                    <Input placeholder="Thomas" type="text" inputRef={nameRef} required />
                    <p>Email</p>
                    <Input placeholder="Thomas@gmail.com" type="text" inputRef={emailRef} required />
                    <Button onClick={addToArray}>
                        Ajouter
                    </Button>
                </PopUp>
            }
            <p>Resultat en console</p>
        </div>
    )
}